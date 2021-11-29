/**
 * @Date 2021-11-13
 * @Author 二三
 * @Description 三维场景App入口，整个三维场景的上下文，所有UI与对象交互的桥梁
 * 看不明白？去看看这本书 http://www.yanhuangxueyuan.com/Three.js/
 */
import * as THREE from 'three';
import NG3DBus from './NG3DBus';
import NGIndexedDB from '../NGIndexedDB'

//type
import { Cameras, Geometries, Materials } from '../../type/NG3D.type';

/**
 * 三维场景App入口
 */
export default class NG3DApp {
    // 三维场景默认相机  param:视野角度 显示比例 最近切割距离 最远切割距离
    protected DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 2000);
    // 三维场景默认渲染器WebGl
    protected DEFAULT_RENDERER = new THREE.WebGLRenderer({
        //抗锯齿
        antialias: true
    })

    // 定义消息分发(广播事件)的系统
    public $bus = NG3DBus();

    // 存储类，封装了indexedDB的操作(提前预留，解决后端获取模型过多，优化性能)
    private indexDbClass = new NGIndexedDB('NG3DScenesDB', [{ table: 'scenes', keyPath: 'sceneID' }]);

    // 克隆相机
    public camera;
    // 设置默认渲染器
    public renderer = this.DEFAULT_RENDERER;

    // 创建场景
    public scene = new THREE.Scene();

    // 场景中所有的对象、几何体、材质、纹理、动画、相机
    public object = {}
    public geometries: Geometries = {}
    public materials: Materials = {}
    public textures = {}
    public animations = {}
    public cameras: Cameras = {}

    // 创建一个动画混合器（用于场景中特定对象的动画的播放器），所有的动画骨骼名称对应的mesh都会在整个场景中查找
    public mixer = new THREE.AnimationMixer(this.scene)

    public constructor() {
        /* 三维场景默认相机 配置 */
        this.DEFAULT_CAMERA.name = 'Camera'
        this.DEFAULT_CAMERA.position.set(0, 10, 0)
        this.DEFAULT_CAMERA.lookAt(new THREE.Vector3(0,0,0));

        this.camera = this.DEFAULT_CAMERA.clone();

        /* 三维场景默认渲染器 配置 */
        //设置颜色及其透明度
        this.DEFAULT_RENDERER.setClearColor(0x000000);
        //设置设备像素比，用于避免HiDPI设备上绘图模糊，这里主要是为了解决移动端的问题
        this.DEFAULT_RENDERER.setPixelRatio(window.devicePixelRatio);
        //重点，三维主场景scene 和 辅助相关对象sceneHelper场景能够并存就靠它
        this.DEFAULT_RENDERER.autoClear = false;

        /* 设置场景信息 */
        this.scene.name = 'Scene';
        this.scene.background = new THREE.Color( 0xdbdbdb );
		this.scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

        this.addCamera(this.camera);

        // 场景清除
        this.$bus.add("editorClear", () => {
            this.clear()
        })
    }

    // 窗口发生变化时，分发,这里主要触发renderer和camera的渲染比例变化
    onWindowResize() {
        this.$bus.dispatch("windowResize")
    }

    /**
     * @param {THREE.PerspectiveCamera} camera 相机
     * @description 添加相机
     */
    addCamera(camera: THREE.PerspectiveCamera) {
        if (camera.isCamera) {
            this.cameras[camera.uuid] = camera;
            this.$bus.dispatch("cameraAdded", camera)
        }
    }

    /**
     * @param {THREE.Object3D | THREE.PerspectiveCamera} camera 相机
     * @description 移除相机
     */
    removeCamera(camera: THREE.Object3D | THREE.PerspectiveCamera) {
        if (this.cameras[camera.uuid] !== undefined) {
            delete this.cameras[camera.uuid]
            this.$bus.dispatch("cameraRemoved", camera)
        }
    }

    /**
     * @param {THREE.Object3D} object 对象
     * @description 新建一个对象
     */
    addObject(object: THREE.Object3D) {
        // 遍历对象，存储所有的几何数据、材质数据
        object.traverse((child: any) => {
            if (child.geometry !== undefined) this.addGeometry(child.geometry)
            if (child.material !== undefined) this.addMaterial(child.material)
            this.addCamera(child) // 如果包含子相机，添加
        })
        // 对象添加到场景中
        this.scene.add(object)
        // 事件分发
        this.$bus.dispatch("objectAdded", object)
        this.$bus.dispatch("sceneGraphChanged")
    }

    /**
     * @param {THREE.Object3D} object 对象
     * @description 删除所有的对象
     */
    removeObject(object: THREE.Object3D) {
        // 没有父节点，就返回;避免删除 主camera or scene
        if (object.parent === null) return;

        // 遍历对象、移除所有的辅助
        object.traverse((child: any) => {
            this.removeCamera(child);

            if (child.type === 'Mesh') {
                // 清除资源
                child.geometry.dispose();
            }
        })
        // 移除该对象
        object.parent.remove(object)
        // 对象移除事件、场景图改变事件
        this.$bus.dispatch("objectRemoved", object)
        this.$bus.dispatch("sceneGraphChanged")
    }

    // 添加几何数据
    addGeometry(geometry: THREE.BufferGeometry) {
        this.geometries[geometry.uuid] = geometry;
    }

    // 添加材质
    addMaterial(material: THREE.Material) {
        this.materials[material.uuid] = material;
    }

    // 移除材质
    removeMaterial(material: THREE.Material) {
        delete this.materials[material.uuid]
    }

    /**
     * @description 清除场景的内容
     */
    clear() {
        /* let gl = this.renderer.domElement.getContext("webgl");
        gl && gl.getExtension("WEBGL_lose_context")?.loseContext(); */

        this.camera.copy(this.DEFAULT_CAMERA);
        this.scene.name = 'Scene';
        this.scene.userData = {};
        this.scene.fog = null;

        const objects = this.scene.children

        while (objects.length > 0) {
            this.removeObject(objects[0])
        }

        this.geometries = {}
        this.materials = {}
        this.textures = {}
        // 动画置空，停止所有的动画
        this.animations = {};
        this.mixer.stopAllAction();

        this.$bus.dispatch("editorCleared");
    }
}