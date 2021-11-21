<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, zhCN, GlobalThemeOverrides, NLoadingBarProvider, useLoadingBar } from "naive-ui";
import { ref, watchEffect, provide } from 'vue';
import { Theme, Locale,ThemeVar } from "./config/global";

const theme = ref(Theme);
let theme_common = ref(JSON.parse(window.localStorage.getItem(`theme_${Theme}_common`) || `{}`));

//监听 用户修改 主题配置
watchEffect(() => {
    console.log("App.vue -> watchEffect")
    window.localStorage.setItem(`theme_${theme.value}_common`, JSON.stringify(theme_common.value));
    //修改过主题配置则设置为true
    let bool = false;
    for (let key in theme_common.value) {
        if(theme_common.value[key] != ThemeVar[theme.value][key]){
            bool = true;
        }
    }
    window.localStorage.setItem(`theme_${theme.value}_common_change`, `${bool}`);
})

//切换主题
const SET_THEME = (data: string) => {
    theme.value = data;
    localStorage.setItem("theme", data);

    //修改主题的同时将 用户对主题的配置 修改为对应项
    theme_common.value = JSON.parse(window.localStorage.getItem(`theme_${data}_common`) || `{}`);
    themeOverrides.common = theme_common.value;
}

//设置ui的语言
let locale = Locale == 'zh-CN' ? ref(zhCN) : ref(null);
const SET_NAIVE_UI_LOCALE = (lang: string) => {
    locale.value = lang == 'zh-CN' ? zhCN : null;
}

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
let themeOverrides: GlobalThemeOverrides = {
    common: theme_common.value
}

/* provide */
provide("theme", theme);
provide('set_theme', SET_THEME);
provide("theme_common", theme_common);
provide("SET_NAIVE_UI_LOCALE", SET_NAIVE_UI_LOCALE);
</script>

<template>
    <!-- 调整 naive-ui 的字重配置 -->
    <n-config-provider :theme="theme === 'default' ? null : darkTheme" :locale="locale" :theme-overrides="themeOverrides">
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
