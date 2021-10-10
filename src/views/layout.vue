<script lang="ts" setup>
import {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter
} from "naive-ui";
import { ref } from 'vue'
import * as Layout from '../components/namespace/layout'

const siderWidth = ref(300);
</script>

<template>
    <div id="layout">
        <n-layout position="absolute">
            <n-layout-header bordered>
                <Layout.Header />
            </n-layout-header>
            <n-layout
                class="n-layout-center-layout"
                has-sider
                sider-placement="right"
                position="absolute"
            >
                <n-layout-content content-style="padding: 1.2rem;">
                    <Layout.Viewport />
                </n-layout-content>
                <n-layout-sider
                    collapse-mode="width"
                    :collapsed-width="0"
                    :width="siderWidth"
                    :native-scrollbar="true"
                    show-trigger="arrow-circle"
                    bordered
                >
                    <Layout.Sider />
                </n-layout-sider>
            </n-layout>
            <n-layout-footer bordered position="absolute">
                <Layout.Footer />
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<style lang="scss" scoped>
#layout {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: red;

    .n-layout {
        &-header{
            height: 3rem;
            line-height: 3rem;
            display: flex;
            padding: 0 1rem;
            align-items: center;
            border-bottom:0;
        }
        &-center-layout {
            top: 3rem;
            bottom: 3.2rem;
            width: 100%;
        }

        &-footer {
            height: 3.2rem;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
