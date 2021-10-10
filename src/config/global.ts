import * as ThemeType from "../type/theme"

//主题
const theme: string = window.localStorage.getItem("theme") || 'default';
//主题设置项
const theme_var:ThemeType.ThemeVar = {
    "default":{
        fontWeight:"400", //字体粗细
        borderRadius:"3px", //圆角边框
        fontSize:"14px",//字体大小
        lineHeight:"1.6",//行高
        baseColor:'#FFF',//基本颜色
        // primaryColor:"#18a058",//主色彩
        // primaryColorHover:"#36ad6a",//主色彩Hover 
        // primaryColorPressed:"#0c7a43",//主色彩Pressed
        textColor1:"rgb(31, 34, 37)",//标题颜色
        textColor2:"rgb(51, 54, 57)",//文本颜色
        textColor3: 'rgb(158, 164, 170)',//标签颜色
        placeholderColor:"rgba(194, 194, 194, 1)",//placeholder颜色
        borderColor:"rgb(224, 224, 230)",//边框颜色
        scrollbarColor:"rgba(0, 0, 0, 0.25)",//滚动条颜色
        scrollbarColorHover:"rgba(0, 0, 0, 0.4)",//滚动条Hover颜色
        scrollbarWidth:"5px",//滚动条宽度
        scrollbarHeight: '5px',//滚动条高度
        scrollbarBorderRadius: '5px',//滚动条圆角边框
        cardColor:"#fff",//卡片颜色
        popoverColor:"#fff",//弹出层颜色
        bodyColor:"#fff",//主体颜色
    },
    "darkTheme":{
        fontWeight:"400",
        borderRadius:"3px",
        fontSize:"14px",
        lineHeight:"1.6",
        baseColor:'#000',
        textColor1:"rgba(255, 255, 255, 0.9)",
        textColor2:"rgba(255, 255, 255, 0.82)",
        textColor3: 'rgba(255, 255, 255, 0.52)',
        placeholderColor:"rgba(255, 255, 255, 0.38)",
        borderColor:"rgba(255, 255, 255, 0.24)",
        scrollbarColor:"rgba(255, 255, 255, 0.2)",
        scrollbarColorHover:"rgba(255, 255, 255, 0.3)",
        scrollbarWidth:"5px",
        scrollbarHeight: '5px',
        scrollbarBorderRadius: '5px',
        cardColor:"rgb(24, 24, 28)",
        popoverColor:"rgb(72, 72, 78)",
        bodyColor:"rgb(16, 16, 20)"
    }
};
const theme_common:ThemeType.CommonTheme = theme_var[theme];
//语言
const locale: string = window.localStorage.getItem("locale") || 'zh-CN';

export type globalConfig = {
    theme:string,
    locale:string,
    theme_var:ThemeType.ThemeVar,
    theme_common:ThemeType.CommonTheme
}

export default {
    theme,
    locale,
    theme_var:theme_var[theme],
    theme_common
}