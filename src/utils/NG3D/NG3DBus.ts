import { inject } from 'vue';

const NG3DBus = ():any => {
    const $bus: any = inject("$bus");

    // 窗口改变大小监听
    $bus.bus("windowResize");

    // 三维场景清空监听
    $bus.bus("editorClear");
    $bus.bus("editorCleared");

    // 场景图改变监听
    $bus.bus("sceneGraphChanged");

    // 相机改变监听
    $bus.bus("cameraChanged");

    return $bus;
}

export default NG3DBus;