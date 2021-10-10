<script setup lang="ts">
import { NConfigProvider, darkTheme, zhCN,GlobalThemeOverrides } from "naive-ui";
import { ref, provide } from 'vue';
import GlobalConfig from "./config/global";

const theme: any = GlobalConfig.theme === 'default' ? ref(null) : ref(darkTheme);
const SET_THEME = (data: string) => {
    theme.value = data === 'darkTheme' ? darkTheme : null;
    localStorage.setItem("theme", data);
}

const theme_common = GlobalConfig.theme_common;

provide("theme", GlobalConfig.theme);
provide('set_theme', SET_THEME);
provide("theme_common", theme_common);

//设置ui的语言
let locale = GlobalConfig.locale == 'zh-CN' ? ref(zhCN) : ref(null);
const SET_NAIVE_UI_LOCALE = (lang: string) => {
    locale.value = lang == 'zh-CN' ? zhCN : null;
}
provide("SET_NAIVE_UI_LOCALE", SET_NAIVE_UI_LOCALE);

/**
   * @type import('naive-ui').GlobalThemeOverrides
   */
const themeOverrides: GlobalThemeOverrides = {
    common: theme_common
}
</script>

<template>
    <!-- 调整 naive-ui 的字重配置 -->
    <n-config-provider :theme="theme" :locale="locale" :theme-overrides="themeOverrides">
        <router-view></router-view>
    </n-config-provider>
</template>

<style lang="scss" scoped>
.n-config-provider {
    width: 100%;
    height: 100%;
}
</style>
