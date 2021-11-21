import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import I18n from './language'
import { useI18n } from 'vue-i18n';

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

import Bus from './utils/Bus'

const app = createApp(App);
const t = (s:string) => {
    const { t } = useI18n();
    return t(s);
};
app.provide("t", t);

//注册事件发布订阅类实例
const $bus = Bus.getInstance();
app.provide("$bus",$bus);

app.use(router).use(I18n);
app.mount('#app');
