<script lang="ts" setup>
import { inject } from 'vue';
import { useI18n } from 'vue-i18n'
import { NH3, NPopover, NButton, NIcon, NForm, NFormItem, NInput, NSlider, NColorPicker, NScrollbar,NRadioGroup,NRadio,NSpace } from 'naive-ui';
import { Cogs } from '@vicons/fa';
import { Locale, ThemeVar } from '../../config/global';

const t: any = inject("t");
const theme: any = inject("theme");
const SET_THEME: any = inject("set_theme");
//主题设置form的Model
const themeSetting: any = inject("theme_common");

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

//主题配置项 清除修改 按钮是否可点击
const clearModificationBoolean = (): boolean => {
    return window.localStorage.getItem(`theme_${theme.value}_common_change`) === 'true';
}

//主题配置项 清除修改按钮点击事件:当前主题配置项恢复为默认值
const restoreDefaultsAll = () => {
    for (let key in themeSetting.value) {
        themeSetting.value[key] = ThemeVar[theme.value][key];
    }
}

//主题配置项的恢复默认按钮是否可以点击
const isDisabled = (attr: string): boolean => {
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
                    <n-radio-group v-model:value="theme" name="theme" @update:value="SET_THEME">
                        <n-space>
                            <n-radio value="default">{{ t('layout.footer.Light') }}</n-radio>
                            <n-radio value="darkTheme">{{ t('layout.footer.Dark') }}</n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item :label="t('layout.footer.Language')">
                    <n-radio-group v-model:value="Locale" name="locale" @update:value="SET_LOCALE">
                        <n-space>
                            <n-radio value="zh-CN">中文</n-radio>
                            <n-radio value="en-US">English</n-radio>
                        </n-space>
                    </n-radio-group>
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
                    <n-slider
                        :value="parseInt(themeSetting.fontSize)"
                        :step="1"
                        :min="12"
                        :max="25"
                        :format-tooltip="value => `${value}px`"
                        @update:value="(value) => { themeSetting.fontSize = `${value}px` }"
                    />
                </n-form-item>
                <n-form-item :label="t('layout.footer.borderRadius')">
                    <n-slider
                        :value="parseInt(themeSetting.borderRadius)"
                        :step="1"
                        :min="0"
                        :max="20"
                        :format-tooltip="value => `${value}px`"
                        @update:value="(value) => { themeSetting.borderRadius = `${value}px` }"
                    />
                </n-form-item>
                <n-form-item :label="t('layout.footer.fontWeight')">
                    <n-slider
                        :value="parseInt(themeSetting.fontWeight)"
                        :step="100"
                        :min="100"
                        :max="900"
                        @update:value="(value) => { themeSetting.fontWeight = `${value}` }"
                    />
                </n-form-item>
                <n-form-item :label="t('layout.footer.lineHeight')">
                    <n-slider
                        :value="parseFloat(themeSetting.lineHeight)"
                        :step="0.1"
                        :min="1"
                        :max="3"
                        @update:value="(value) => { themeSetting.lineHeight = `${value}` }"
                    />
                </n-form-item>
                <n-form-item :label="t('layout.footer.bodyColor')">
                    <n-color-picker v-model:value="themeSetting.bodyColor">
                        <template #action>
                            <n-button
                                size="small"
                                :disabled="isDisabled('bodyColor')"
                                @click="restoreDefaults('bodyColor')"
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
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
                            >{{t("layout.footer['Restore default']")}}</n-button>
                        </template>
                    </n-color-picker>
                </n-form-item>
                <n-form-item :label="t('layout.footer.scrollbarWidth')">
                    <n-slider
                        :value="parseInt(themeSetting.scrollbarWidth)"
                        :step="1"
                        :min="1"
                        :max="17"
                        :format-tooltip="value => `${value}px`"
                        @update:value="(value) => { themeSetting.scrollbarWidth = `${value}px` }"
                    />
                </n-form-item>
                <!-- 滚动条高度，作用于横向滚动条 -->
                <!-- <n-form-item :label="t('layout.footer.scrollbarHeight')">
                    <n-slider
                        :value="parseInt(themeSetting.scrollbarHeight)"
                        :step="1"
                        :min="1"
                        :max="17"
                        :format-tooltip="value => `${value}px`"
                        @update:value="(value) => { themeSetting.scrollbarHeight = `${value}px` }"
                    />
                </n-form-item> -->
                <n-form-item :label="t('layout.footer.scrollbarBorderRadius')">
                    <n-slider
                        :value="parseInt(themeSetting.scrollbarBorderRadius)"
                        :step="1"
                        :min="0"
                        :max="Math.ceil(parseInt(themeSetting.scrollbarWidth) / 2)"
                        :format-tooltip="value => `${value}px`"
                        @update:value="(value) => { themeSetting.scrollbarBorderRadius = `${value}px` }"
                    />
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
