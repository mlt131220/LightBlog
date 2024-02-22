import React, {useContext} from "react";
import TopImage from "@/components/TopImage";
import {AboutStyled} from "@/styled/view/about/about";
import {IconFontCtx} from "@/App";
import {Avatar, Divider} from "antd";

const About: React.FC = () => {
    const IconFont = useContext(IconFontCtx);

    return (
        <div id="about">
            <TopImage/>

            <AboutStyled className="relative left-19vw bottom-20vh">
                <div className="photo">
                    <Avatar src="/static/img/photo.jpg"/>
                    <h2>{import.meta.env.VITE_GLOB_MASTER}</h2>
                    <p>情深不寿，慧极必伤</p>
                </div>

                <div className="content">
                    <Divider orientation="left">个人简介</Divider>
                    {/*<p className="text">/!*2019年7月*!/毕业于 西南林业大学 大数据与智能工程学院 计算机科学与技术 专业。</p>*/}
                    {/*<p className="text">2018年11月入职某小型企业作为前端开发工程师开始正式的开发工作。</p>*/}
                    <p className="text">一个只会按时下班的前端新人。</p>

                    {/*求职、联系我*/}
                    <p className="title">求职</p>
                    <p className="title-text">随遇而安。</p>

                    <p className="title">联系我</p>
                    <p className="title-text">企鹅：1427199805</p>
                    <p className="title-text">邮箱：mlt131220@163.com</p>

                    <Divider orientation="left" className="!mt-7">博客简介</Divider>
                    <p className="text">重构于2023/02/27。</p>

                    <p className="title">前端</p>
                    <p className="title-text">Dependencies: React 18.2.0 | Antd 4.24.1</p>
                    <p className="title-text">DevDependencies: TypeScript 4.6.4 | Vite 3.1.0 | UnoCSS 0.48.4</p>

                    <p className="title">后端：</p>
                    <p className="title-text">Go: 1.18.4</p>
                    <p className="title-text">Beego: 2.0.1</p>
                    <p className="title-text">MySQL: 8.0.25</p>

                    <Divider orientation="left" className="!mt-7">关于版权</Divider>
                    <p className="text">
                        本博客原创文章采用
                        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                            《署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)国际许可协议》
                        </a>
                        ，转载请注明出处。
                    </p>
                    <p className="text">本站所有转载的文章，都会在文章中注明原文出处，若因此对原作者造成侵权，烦请原作者告知，我会立刻删除相关内容。</p>

                    <p className="text">本站中的部分图片源于网络，侵删。</p>

                    <Divider orientation="left" className="!mt-7">碎碎念</Divider>
                    <p className="text">
                        <IconFont type="ng-16gl-quoteLeft"/>&nbsp;你所见即是我。<IconFont type="ng-16gl-quoteRight"/>
                    </p>
                </div>
            </AboutStyled>
        </div>
    )
}

export default About;
