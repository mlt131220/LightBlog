import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import I18n from './language'
import { useI18n } from 'vue-i18n';

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App);
const t = (s:string) => {
    const { t } = useI18n();
    return t(s);
};
app.provide("t", t);

app.use(router).use(I18n);

app.mount('#app');
