<script lang="ts" setup>
import { inject, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n'
import { NPopover, NButton, NIcon, NSelect, NForm, NFormItem, NTooltip } from 'naive-ui';
import { Cogs } from '@vicons/fa';
import GlobalConfig from '../../config/global';

const theme: string | undefined = inject("theme");
const SET_THEME: any = inject("set_theme");

/**
 * 修改语言
 * @param lang
 */
const { locale } = useI18n();
const SET_LOCALE = (lang: string): void => {
    window.localStorage.setItem('locale', lang);
    locale.value = lang;
}

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
                <n-tooltip trigger="hover" placement="top-start">
                    <template #trigger>
                        <n-select
                            v-model:value="GlobalConfig.locale"
                            @update:value="SET_LOCALE"
                            :options="[{ label: '中文', value: 'zh-CN' }, { label: 'English', value: 'en-US' }]"
                        />
                    </template>
                    {{ t("layout.footer['Changing the language will refresh the page']") }}
                </n-tooltip>
            </n-form-item>
        </n-form>
    </n-popover>
</template>

<style lang="scss" scoped>
</style>
