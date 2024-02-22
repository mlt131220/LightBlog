import React, {Suspense, useEffect} from 'react';
import {BackTopStyled, LayoutStyled, FooterStyled, ContainerStyled} from '@/styled/layout/layout';
import Header from '@/layout/Header';
import {useRoutes} from 'react-router-dom';
import routes from '@/router';
import NProgress from '@/components/NProgress';

const Layouts: React.FC = () => {
    /* 路由 */
    const element = useRoutes(routes);

    let initTop = 0;
    useEffect(() => {
        const rootDom: HTMLDivElement = document.getElementById("root") as HTMLDivElement;
        const layoutHeaderDom: HTMLDivElement = document.getElementById("layoutHeader") as HTMLDivElement;

        function scrollEvent() {
            if (document.documentElement.clientWidth > 768) return;
            // 判断滚动方向
            let scrollTop = rootDom.scrollTop;
            let scroll = scrollTop - initTop;
            initTop = scrollTop;
            let dir: string;
            dir = scroll <= 0 ? "up" : "down";
            if (dir === "up") {
                //向上滚动
                layoutHeaderDom.style.top = "0";

                // 小于等于768像素 （手机）
                if (scrollTop > 100) {
                    layoutHeaderDom.style.backgroundColor = "#fff";

                    layoutHeaderDom.style.color = "#000";
                    (document.querySelector(".logo") as HTMLSpanElement).style.color = "#000"
                } else {
                    layoutHeaderDom.style.backgroundColor = "transparent";
                    layoutHeaderDom.style.color = "#fff";
                }
            } else {
                // 向下滚动
                if (scrollTop > 50) {
                    // 判断滚动距离大于50px
                    layoutHeaderDom.style.top = "-100%";
                }
            }
        }

        rootDom.addEventListener("scroll", scrollEvent)

        return () => {
            window.removeEventListener("scroll", scrollEvent)
        }
    })

    return (
        <>
            <BackTopStyled target={() => document.getElementById("root") as HTMLElement}/>
            <LayoutStyled id="layout">
                <Header></Header>
                <ContainerStyled>
                    <Suspense fallback={<NProgress/>}>{element}</Suspense>
                </ContainerStyled>
                <FooterStyled id="footer">
                    <p>Light blog ©2023 Created by <a href="https://github.com/mlt131220" className="c-#000">二三</a></p>
                    <p><a href="https://beian.miit.gov.cn/" target="_blank">{import.meta.env.VITE_GLOB_ICP}</a></p>
                    <p>
                        <div style={{width:"300px",margin:"0 auto"}}>
                            <a target="_blank" href={`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${import.meta.env.VITE_GLOB_POLICE_ICP}`} style={{display:"inline-block",textDecoration:"none",height:"20px",lineHeight:"20px"}}>
                                <img src="/static/img/备案图标.png" style={{float:"left"}} alt="备案"/>
                                <p style={{float:"left",height:"20px",lineHeight:"20px",margin:"0px 0px 0px 5px", color:"#939393"}}>滇公网安备 {import.meta.env.VITE_GLOB_POLICE_ICP}号</p></a>
                        </div>
                    </p>
                </FooterStyled>
            </LayoutStyled>
        </>
    );
};

export default Layouts;
