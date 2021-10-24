<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, zhCN, GlobalThemeOverrides, NLoadingBarProvider, useLoadingBar } from "naive-ui";
import { ref, watch, provide } from 'vue';
import { Theme, Locale } from "./config/global";

const theme = ref(Theme === 'default' ? null : darkTheme);
let theme_common = ref(JSON.parse(window.localStorage.getItem(`theme_${Theme}_common`) || `{}`));
let theme_str = ref(Theme);

//监听 用户修改 主题配置
watch(theme_common.value, () => {
    const currentTheme = theme.value === null ? 'default' : 'darkTheme';
    window.localStorage.setItem(`theme_${currentTheme}_common`, JSON.stringify(theme_common.value));
    //修改过主题配置则设置为true
    window.localStorage.setItem(`theme_${currentTheme}_common_change`, "true");
})

const SET_THEME = (data: string) => {
    theme_str.value = data;
    theme.value = data === 'darkTheme' ? darkTheme : null;
    localStorage.setItem("theme", data);

    //修改主题的同时将 用户对主题的配置 修改为对应项(需要重新设置监听,使用for循环遍历赋值则不需要重新监听)
    theme_common.value = JSON.parse(window.localStorage.getItem(`theme_${data}_common`) || `{}`);
    //监听 用户修改 主题配置
    watch(theme_common.value, () => {
        window.localStorage.setItem(`theme_${data}_common`, JSON.stringify(theme_common.value));
        //修改过主题配置则设置为true
        window.localStorage.setItem(`theme_${data}_common_change`, "true");
    })
    themeOverrides.common = theme_common.value;
}

provide("theme", theme_str);
provide('set_theme', SET_THEME);
provide("theme_common", theme_common);

//设置ui的语言
let locale = Locale == 'zh-CN' ? ref(zhCN) : ref(null);
const SET_NAIVE_UI_LOCALE = (lang: string) => {
    locale.value = lang == 'zh-CN' ? zhCN : null;
}
provide("SET_NAIVE_UI_LOCALE", SET_NAIVE_UI_LOCALE);

/**
   * @type import('naive-ui').GlobalThemeOverrides
   */
let themeOverrides: GlobalThemeOverrides = {
    common: theme_common.value
}
</script>

<template>
    <!-- 调整 naive-ui 的字重配置 -->
    <n-config-provider :theme="theme" :locale="locale" :theme-overrides="themeOverrides">
        <n-loading-bar-provider>
            <router-view></router-view>
        </n-loading-bar-provider>

        <n-global-style />
    </n-config-provider>
</template>

<style lang="scss" scoped>
.n-config-provider {
    width: 100%;
    height: 100%;
}
</style>
