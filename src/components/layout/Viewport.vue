<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import NG3DApp from '../../utils/NG3D/NG3DApp';
import Viewport from '../../utils/NG3D/NG3DViewPort';

const NG3D = new NG3DApp();
const viewport_dom = ref<HTMLElement | null>();

onMounted(() => {
    const sceneViewPort = new Viewport(
        viewport_dom.value,
        NG3D
    )

    //初始化页面比例
    const onWindowResize = () => {
        NG3D.onWindowResize();
    }
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize();
})

</script>

<template>
    <div id="NG3D" ref="viewport_dom"></div>
</template>

<style lang="scss" scoped>
#NG3D{
    width: 100%;
    height: 100%;
}
</style>