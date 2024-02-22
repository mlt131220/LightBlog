import React, {useState} from 'react';
import {ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
//主题
import dark from 'antd/dist/antd.dark.css';
import light from 'antd/dist/antd.css';
import Layouts from "./layout/Layouts";

import {createFromIconfontCN} from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_GLOB_ICON_URL,
});
export const IconFontCtx = React.createContext(IconFont);

const addSkin = (content: string) => {
    let head = document.getElementsByTagName("head")[0];
    const getStyle = head.getElementsByTagName('style');
    // 查找style是否存在，存在的话需要删除dom
    if (getStyle.length > 0) {
        for (let i = 0, l = getStyle.length; i < l; i++) {
            if (!getStyle[i]) continue;

            if (getStyle[i].getAttribute('data-type') === 'theme') {
                getStyle[i].remove();
            }
        }
    }
    // 最后加入对应的主题和加载less的js文件
    let styleDom = document.createElement("style");
    styleDom.dataset.type = "theme";
    styleDom.innerHTML = content;
    head.appendChild(styleDom);
}

function App() {
    /* 主题相关 */
    const [theme, setTheme] = useState(window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'light');
    addSkin(theme === "light" ? light : dark)
    const changeTheme = (theme: string) => {
        setTheme(theme);
        window.localStorage.setItem('theme', theme);
        addSkin(theme === "light" ? light : dark)
    }

    return (
        <ConfigProvider locale={zhCN}>
            <IconFontCtx.Provider value={IconFont}>
                <Layouts></Layouts>
            </IconFontCtx.Provider>
        </ConfigProvider>
    )
}

export default App
