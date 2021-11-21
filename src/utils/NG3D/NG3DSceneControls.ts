/**
 * @Date 2021-11-20
 * @Author 二三
 * @Description 三维场景相机视角控制类
 */
import * as THREE from 'three';

export default class NG3DSceneControls {
    private enabled = true // 启用场景相机控制器，主要用于与UI交互时限制相机的移动
    static center = new THREE.Vector3() // 中心点
    private panSpeed = 0.002 // 移动平移速度
    private zoomSpeed = 0.1 // 缩放速度
    private rotationSpeed = 0.005 // 旋转速度
    private objectSphereR = 450;//定义一个控制球半径，限制相机可移动范围
    private vector = new THREE.Vector3() // 空的空间向量
    static delta = new THREE.Vector3() // 延迟阻尼向量
    static box = new THREE.Box3() // 立方体边界对象
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
    static sphere = new THREE.Sphere() // 球体

    /**
     *
     * @param {*} camera 摄像机对象
     * @param {*} domElement 渲染区域dom
     */
    static camera:THREE.Camera;
    static domElement:HTMLElement;
    constructor(camera:THREE.Camera, domElement:HTMLElement) { 
        NG3DSceneControls.camera = camera;
        NG3DSceneControls.domElement = domElement;
    }

    static ChangeCenterToTarget(target: any) {
        NG3DSceneControls.box.setFromObject(target);

        if (!NG3DSceneControls.box.isEmpty()) {
            NG3DSceneControls.box.getCenter(NG3DSceneControls.center)
        } else {
            NG3DSceneControls.center.setFromMatrixPosition(target.matrixWorld)
        }
    }

    static focus(target: any) {
        let distance;
        NG3DSceneControls.box.setFromObject(target);
        if (!NG3DSceneControls.box.isEmpty()) {
            NG3DSceneControls.box.getCenter(NG3DSceneControls.center)
            distance = NG3DSceneControls.box.getBoundingSphere(NG3DSceneControls.sphere).radius
        } else {
            NG3DSceneControls.center.setFromMatrixPosition(target.matrixWorld)
            distance = 0.1
        }

        NG3DSceneControls.delta.set(0, 0, 1)
        NG3DSceneControls.delta.applyQuaternion(NG3DSceneControls.camera.quaternion)
        NG3DSceneControls.delta.multiplyScalar(distance * 4)
        NG3DSceneControls.camera.position.copy(NG3DSceneControls.center).add(NG3DSceneControls.delta);
    }
}