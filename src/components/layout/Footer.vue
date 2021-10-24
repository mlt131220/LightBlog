<script lang="ts" setup>
import { inject } from 'vue';
import { useI18n } from 'vue-i18n'
import { NH3, NPopover, NButton, NIcon, NSelect, NForm, NFormItem, NInput, NColorPicker, NScrollbar } from 'naive-ui';
import { Cogs } from '@vicons/fa';
import { Locale, ThemeVar } from '../../config/global';

const t: any = inject("t");
const theme: any = inject("theme");
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
const themeSetting: any = inject("theme_common");

//清除修改 按钮是否可点击
const clearModificationBoolean = ():boolean => {
    return window.localStorage.getItem(`theme_${theme.value}_common_change`) === 'true';
}

//清除修改:当前主题配置项恢复为默认值
const restoreDefaultsAll = () => {
    for (let key in themeSetting.value) {
        themeSetting.value[key] = ThemeVar[theme.value][key];
    }
    //主题配置恢复默认则设置为false
    window.localStorage.setItem(`theme_${theme.value}_common_change`, "false");
}

//恢复默认按钮是否可以点击
const isDisabled = (attr: string):boolean => {
    return themeSetting.value[attr] === ThemeVar[theme.value][attr];
}

//主题配置 color 恢复为默认值
const restoreDefaults = (attr: string) => {
    themeSetting.value[attr] = ThemeVar[theme.value][attr];
}
</script>

<template>
    <div class="desc">LightBlog · Version 0.0.1 · Made by 二三</div>
    <n-popover trigger="click" placement="top-end">
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
            <n-h3>{{ t(`layout.footer["Basic Settings"]`) }}</n-h3>
            <n-form
                label-placement="left"
                :label-width="100"
                size="small"
                :style="{
                    maxWidth: '300px',
                    paddingRight: '15px'
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
                        v-model:value="Locale"
                        @update:value="SET_LOCALE"
                        :options="[{ label: '中文', value: 'zh-CN' }, { label: 'English', value: 'en-US' }]"
                    />
                </n-form-item>
            </n-form>
        </template>

        <div class="theme_set_title">
            <n-h3>{{ theme === 'default' ? t('layout.footer.Light') : t('layout.footer.Dark') }}{{ Locale == 'zh-CN' ? "" : " " }}{{ t(`layout.footer["Theme Setting"]`) }}</n-h3>
            <n-popover trigger="hover" placement="top-end" v-if="clearModificationBoolean()">
                <template #trigger>
                    <n-button
                        size="small"
                        @click="restoreDefaultsAll"
                    >{{ t(`layout.footer["Clear modification"]`) }}</n-button>
                </template>
                {{ t(`layout.footer["Clear only modifications under the current theme"]`) }}
            </n-popover>
        </div>

        <n-scrollbar style="max-height: 20rem;">
            <n-form
                label-placement="left"
                :label-width="100"
                size="small"
                :style="{
                    maxWidth: '300px',
                    paddingRight: '15px'
                }"
            >
                <n-form-item :label="t('layout.footer.fontSize')">
                    <n-input v-model:value="themeSetting.fontSize" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.borderRadius')">
                    <n-input v-model:value="themeSetting.borderRadius" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.fontWeight')">
                    <n-input v-model:value="themeSetting.fontWeight" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.lineHeight')">
                    <n-input v-model:value="themeSetting.lineHeight" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.bodyColor')">
                    <n-color-picker v-model:value="themeSetting.bodyColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('bodyColor')"
                                @click="restoreDefaults('bodyColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.baseColor')">
                    <n-color-picker v-model:value="themeSetting.baseColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('baseColor')"
                                @click="restoreDefaults('baseColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.popoverColor')">
                    <n-color-picker v-model:value="themeSetting.popoverColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('popoverColor')"
                                @click="restoreDefaults('popoverColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.cardColor')">
                    <n-color-picker v-model:value="themeSetting.cardColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('cardColor')"
                                @click="restoreDefaults('cardColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.borderColor')">
                    <n-color-picker v-model:value="themeSetting.borderColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('borderColor')"
                                @click="restoreDefaults('borderColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.titleColor')">
                    <n-color-picker v-model:value="themeSetting.textColor1">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('textColor1')"
                                @click="restoreDefaults('textColor1')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.textColor')">
                    <n-color-picker v-model:value="themeSetting.textColor2">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('textColor2')"
                                @click="restoreDefaults('textColor2')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.tagColor')">
                    <n-color-picker v-model:value="themeSetting.textColor3">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('textColor3')"
                                @click="restoreDefaults('textColor3')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.placeholderColor')">
                    <n-color-picker v-model:value="themeSetting.placeholderColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('placeholderColor')"
                                @click="restoreDefaults('placeholderColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarColor')">
                    <n-color-picker v-model:value="themeSetting.scrollbarColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('scrollbarColor')"
                                @click="restoreDefaults('scrollbarColor')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarColorHover')">
                    <n-color-picker v-model:value="themeSetting.scrollbarColorHover">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('scrollbarColorHover')"
                                @click="restoreDefaults('scrollbarColorHover')"
                            >恢复默认</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarWidth')">
                    <n-input v-model:value="themeSetting.scrollbarWidth" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarHeight')">
                    <n-input v-model:value="themeSetting.scrollbarHeight" />
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarBorderRadius')">
                    <n-input v-model:value="themeSetting.scrollbarBorderRadius" />
                </n-form-item>
            </n-form>
        </n-scrollbar>
    </n-popover>
</template>

<style lang="scss" scoped>
.theme_set_title {
    display: flex;
    justify-content: space-between;
}
</style>
