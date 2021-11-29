/**
 * @Date 2021-11-20
 * @Author 二三
 * @Description 三维场景相机视角控制类
 */
import * as THREE from 'three';

export default class NG3DSceneControls extends THREE.EventDispatcher {
    private enabled = true // 启用场景相机控制器，主要用于与UI交互时限制相机的移动
    public center = new THREE.Vector3() // 中心点
    private panSpeed = 0.002 // 移动平移速度
    private zoomSpeed = 0.1 // 缩放速度
    private rotationSpeed = 0.005 // 旋转速度
    private objectSphereR = 450;//定义一个控制球半径，限制相机可移动范围
    private vector = new THREE.Vector3() // 空的空间向量
    public delta = new THREE.Vector3() // 延迟阻尼向量
    public box = new THREE.Box3() // 立方体边界对象
    private STATE = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2
    }
    private state = this.STATE.NONE;
    private normalMatrix = new THREE.Matrix3() // 法线矩阵
    private pointer = new THREE.Vector2() // 二维点
    private pointerOld = new THREE.Vector2()
    private spherical = new THREE.Spherical() // 球形
    public sphere = new THREE.Sphere() // 球体

    private changeEvent = { type: 'change' };

    /* touch */
    private touches = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	private prevTouches = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	private prevDistance:number = 0;

    /**
     *
     * @param {*} camera 摄像机对象
     * @param {*} domElement 渲染区域dom
     */
    public camera:THREE.Camera;
    public domElement:HTMLElement;
    constructor(camera:THREE.Camera, domElement:HTMLElement) { 
        super();

        this.camera = camera;
        this.domElement = domElement;

        this.domElement.addEventListener( 'contextmenu', this.contextmenu, false );
        this.domElement.addEventListener( 'dblclick', this.onMouseUp, false );
        this.domElement.addEventListener( 'wheel', this.onMouseWheel, false );
        this.domElement.addEventListener( 'pointerdown', this.onPointerDown, false );
        this.domElement.addEventListener( 'touchstart', this.touchStart, false );
        this.domElement.addEventListener( 'touchmove', this.touchMove, false );
    }

    ChangeCenterToTarget(target: any) {
        this.box.setFromObject(target);

        if (!this.box.isEmpty()) {
            this.box.getCenter(this.center)
        } else {
            this.center.setFromMatrixPosition(target.matrixWorld)
        }
    }

    focus(target: any) {
        let distance;
        this.box.setFromObject(target);
        if (!this.box.isEmpty()) {
            this.box.getCenter(this.center)
            distance = this.box.getBoundingSphere(this.sphere).radius
        } else {
            this.center.setFromMatrixPosition(target.matrixWorld)
            distance = 0.1
        }

        this.delta.set(0, 0, 1)
        this.delta.applyQuaternion(this.camera.quaternion)
        this.delta.multiplyScalar(distance * 4)
        this.camera.position.copy(this.center).add(this.delta);

        this.dispatchEvent( this.changeEvent );
    }

    pan(){
        const distance = this.camera.position.distanceTo(this.center);
        this.delta.multiplyScalar( distance * this.panSpeed );
		this.delta.applyMatrix3( this.normalMatrix.getNormalMatrix( this.camera.matrix ) );

		this.camera.position.add( this.delta );
		this.center.add( this.delta );
        this.dispatchEvent( this.changeEvent );
    }

    zoom(){
        const distance = this.camera.position.distanceTo( this.center );

		this.delta.multiplyScalar( distance * this.zoomSpeed );

		if ( this.delta.length() > distance ) return;

		this.delta.applyMatrix3( this.normalMatrix.getNormalMatrix( this.camera.matrix ) );

		this.camera.position.add( this.delta );

        this.dispatchEvent( this.changeEvent );
    }

    rotate(){
        this.vector.copy( this.camera.position ).sub( this.center );

		this.spherical.setFromVector3( this.vector );

		this.spherical.theta += this.delta.x * this.rotationSpeed;
		this.spherical.phi += this.delta.y * this.rotationSpeed;

		this.spherical.makeSafe();

		this.vector.setFromSpherical( this.spherical );

		this.camera.position.copy( this.center ).add( this.vector );

		this.camera.lookAt( this.center );

        this.dispatchEvent( this.changeEvent );
    }

    onPointerDown(event:Event){
        if ( this.enabled === false ) return;

		switch ( event.pointerType ) {
			case 'mouse':
			case 'pen':
				this.onMouseDown( event );
				break;
			// TODO touch
		}

		this.domElement.ownerDocument.addEventListener( 'pointermove', this.onPointerMove, false );
		this.domElement.ownerDocument.addEventListener( 'pointerup', this.onPointerUp, false );
    }

    onPointerMove( event:Event ) {
		if ( this.enabled === false ) return;

		switch ( event.pointerType ) {
			case 'mouse':
			case 'pen':
				this.onMouseMove( event );
				break;

			// TODO touch
		}
	}

    onPointerUp( event:Event ) {
		switch ( event.pointerType ) {
			case 'mouse':
			case 'pen':
				this.onMouseUp();
				break;
			// TODO touch
		}
		this.domElement.ownerDocument.removeEventListener( 'pointermove', this.onPointerMove, false );
		this.domElement.ownerDocument.removeEventListener( 'pointerup', this.onPointerUp, false );
	}

    /* mouse */
    onMouseDown( event:Event ) {
		if ( event.button === 0 ) {
			this.state = this.STATE.ROTATE;
		} else if ( event.button === 1 ) {
			this.state = this.STATE.ZOOM;
		} else if ( event.button === 2 ) {
			this.state = this.STATE.PAN;
		}

		this.pointerOld.set( event.clientX, event.clientY );
	}

    onMouseMove( event:Event ) {
		this.pointer.set( event.clientX, event.clientY );
		var movementX = this.pointer.x - this.pointerOld.x;
		var movementY = this.pointer.y - this.pointerOld.y;
		if ( this.state === this.STATE.ROTATE ) {
            this.delta.set( -movementX, -movementY, 0 )
			this.rotate();
		} else if ( this.state === this.STATE.ZOOM ) {
            this.delta.set( 0, 0, movementY )
			this.zoom();
		} else if ( this.state === this.STATE.PAN ) {
            this.delta.set( -movementX, movementY, 0 )
			this.pan();
		}
		this.pointerOld.set( event.clientX, event.clientY );
	}

    onMouseUp() {
		this.state = this.STATE.NONE;
	}

    onMouseWheel( event:Event ) {
		if ( this.enabled === false ) return;
		event.preventDefault();
		// Normalize deltaY due to https://bugzilla.mozilla.org/show_bug.cgi?id=1392460
        this.delta.set( 0, 0, event.deltaY > 0 ? 1 : -1 )
		this.zoom();
	}

    contextmenu( event:Event ) {
		event.preventDefault();
	}

    dispose() {
		this.domElement.removeEventListener( 'contextmenu', this.contextmenu, false );
		this.domElement.removeEventListener( 'dblclick', this.onMouseUp, false );
		this.domElement.removeEventListener( 'wheel', this.onMouseWheel, false );
		this.domElement.removeEventListener( 'pointerdown', this.onPointerDown, false );
		this.domElement.removeEventListener( 'touchstart', this.touchStart, false );
		this.domElement.removeEventListener( 'touchmove', this.touchMove, false );
	}

    /* touch */
    touchStart( event:Event ) {
		if ( this.enabled === false ) return;
		switch ( event.touches.length ) {
			case 1:
				this.touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				this.touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				break;
			case 2:
				this.touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				this.touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				this.prevDistance = this.touches[ 0 ].distanceTo( this.touches[ 1 ] );
				break;
		}
		this.prevTouches[ 0 ].copy( this.touches[ 0 ] );
		this.prevTouches[ 1 ].copy( this.touches[ 1 ] );
	}

    touchMove( event:Event ) {
		if ( this.enabled === false ) return;
		event.preventDefault();
		event.stopPropagation();

		const getClosest = ( touch:THREE.Vector3, touches:Array<THREE.Vector3> ) => {
			let closest = touches[ 0 ];
			for ( let i in touches ) {
				if ( closest.distanceTo( touch ) > touches[ i ].distanceTo( touch ) ) closest = touches[ i ];
			}
			return closest;
		}

		switch ( event.touches.length ) {
			case 1:
				this.touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				this.touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
                this.delta = this.touches[ 0 ].sub( getClosest( this.touches[ 0 ], this.prevTouches ) ).multiplyScalar( - 1 )
				this.rotate();
				break;

			case 2:
				this.touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				this.touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 ).divideScalar( window.devicePixelRatio );
				let distance = this.touches[ 0 ].distanceTo( this.touches[ 1 ] );
                this.delta.set( 0, 0, this.prevDistance - distance )
				this.zoom();
				this.prevDistance = distance;

				let offset0 = this.touches[ 0 ].clone().sub( getClosest( this.touches[ 0 ], this.prevTouches ) );
				let offset1 = this.touches[ 1 ].clone().sub( getClosest( this.touches[ 1 ], this.prevTouches ) );
				offset0.x = - offset0.x;
				offset1.x = - offset1.x;
                this.delta = offset0.add(offset1);
				this.pan();
				break;
		}
		this.prevTouches[ 0 ].copy( this.touches[ 0 ] );
		this.prevTouches[ 1 ].copy( this.touches[ 1 ] );
	}

}

//NG3DSceneControls.prototype = Object.create( THREE.EventDispatcher.prototype );
//NG3DSceneControls.prototype.constructor = NG3DSceneControls;