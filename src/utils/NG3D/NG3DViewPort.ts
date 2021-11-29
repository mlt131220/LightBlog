/**
 * @Date 2021-11-15
 * @Author 二三
 * @Description 三维场景可视区域操作窗口
 */
import * as THREE from 'three'
import NG3DApp from './NG3DApp';
import NG3DScene from './NG3DScene';

export default class NG3DViewPort {
    public container; //三维视图区域
    public NG3DApp:NG3DApp;
    public $bus;// 消息分发系统
    public renderer;
    public camera;// 场景中的相机
    public scene;// 场景中的三维场景对象
    public objects = [];// 场景中存储的，需要用于交互的所有对象
    public NG3D_scene; //场景实例化
    /**
     * @param {*} container 三维显示区域
     * @param {*} NG3DApp 三维主类
     */
    constructor(container: HTMLElement, NG3DApp: NG3DApp) {
        this.container = container;
        this.NG3DApp = NG3DApp;
        this.$bus = NG3DApp.$bus;
        this.renderer = NG3DApp.renderer;
        container.appendChild(this.renderer.domElement);

        this.camera = NG3DApp.camera;
        this.scene = NG3DApp.scene;

        /* 实例化组件 */
        this.NG3D_scene= new NG3DScene(NG3DApp);  

        // 窗口大小改变响应(初始化页面的时候需要调用一次)
        this.$bus.add("windowResize", () => {
            // 更新相机
            this.updateAspectRatio();
            // 视口大小改变
            this.renderer.setSize(container.offsetWidth, container.offsetHeight);
            this.render()
        })

        // 开启动画
        this.animate();
    }

    updateAspectRatio() {
        this.NG3DApp.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
        this.NG3DApp.camera.updateProjectionMatrix()
    }

    // 动画
    animate() {
        // 动画循环,通过bind改变this指向
        requestAnimationFrame(this.animate.bind(this))
        // 动画
        const mixer = this.NG3DApp.mixer;
        // 动画状态时正在被使用时才实时更新
        // if (mixer.stats.actions.inUse > 0) {
        //     mixer.update((time - this.prevTime) / 1000)
        //     this.render()
        // }
        this.render();
    }

    // 渲染
    render() {
        console.log("render")
        // 更新场景矩阵
        this.scene.updateMatrixWorld()
        // 渲染场景
        this.renderer.render(this.scene, this.camera)
        if (this.camera === this.NG3DApp.camera) {
            //更新辅助场景矩阵
            // sceneHelpers.updateMatrixWorld()
            // renderer.render(sceneHelpers, camera)
            // tipsLayer.updateMatrixWorld()
            // renderer.render(tipsLayer, camera)
        }
    }
}