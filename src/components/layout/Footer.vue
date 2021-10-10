<script lang="ts" setup>
import { ref,inject } from 'vue';
import { useI18n } from 'vue-i18n'
import { NH3, NPopover, NButton, NIcon, NSelect, NForm, NFormItem, NInput,NColorPicker } from 'naive-ui';
import { Cogs } from '@vicons/fa';
import GlobalConfig from '../../config/global';

const theme: string | undefined = inject("theme");
const SET_THEME: any = inject("set_theme");

/**
 * 修改语言
 * @param lang
 */
const { locale } = useI18n();
let SET_NAIVE_UI_LOCALE: any = inject("SET_NAIVE_UI_LOCALE");
const SET_LOCALE = (lang: string): void => {
    window.localStorage.setItem('locale', lang);
    locale.value = lang;
    SET_NAIVE_UI_LOCALE(lang);
}

//主题设置form的Model
const themeSetting = ref(GlobalConfig.theme_common);
//主题设置修改前的数据
const themeHistory = ref(GlobalConfig.theme_var);

const t: any = inject("t");
</script>

<template>
    <div class="desc">LightBlog · Version 0.0.1 · Made by 二三</div>
    <n-popover trigger="click" placement="top-end" class="layout-footer-n-popover">
        <template #trigger>
            <n-button circle>
                <template #icon>
                    <n-icon>
                        <Cogs />
                    </n-icon>
                </template>
            </n-button>
        </template>
        <template #header>
            <n-h3>基本设置</n-h3>
            <n-form
                label-placement="left"
                :label-width="100"
                size="small"
                :style="{
                    minWidth: '300px'
                }"
            >
                <n-form-item :label="t('layout.footer.Theme')">
                    <n-select
                        v-model:value="theme"
                        @update:value="SET_THEME"
                        :options="[{ label: t('layout.footer.Light'), value: 'default' }, { label: t('layout.footer.Dark'), value: 'darkTheme' }]"
                    />
                </n-form-item>
                <n-form-item :label="t('layout.footer.Language')">
                    <n-select
                        v-model:value="GlobalConfig.locale"
                        @update:value="SET_LOCALE"
                        :options="[{ label: '中文', value: 'zh-CN' }, { label: 'English', value: 'en-US' }]"
                    />
                </n-form-item>
            </n-form>
        </template>
        <n-h3>主题设置</n-h3>
        <n-form
            :model="themeSetting"
            label-placement="left"
            :label-width="100"
            size="small"
            :style="{
                minWidth: '300px'
            }"
        >
            <n-form-item :label="t('layout.footer.fontSize')">
                <n-input :placeholder="themeSetting.fontSize" v-model:value="themeSetting.fontSize"  />
            </n-form-item>
            <n-form-item :label="t('layout.footer.popoverColor')">
                <n-color-picker v-model:value="themeSetting.popoverColor" />
            </n-form-item>
        </n-form>
    </n-popover>
</template>

<style lang="scss" scoped>
</style>
