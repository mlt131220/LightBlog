import styled from "styled-components";
import {footerHeight, headerHeight,topImgHeight} from "@/styled/cssVariable";
import { BackTop } from 'antd';

export const BackTopStyled = styled(BackTop)`
  right:50px !important;
  bottom:30px !important;

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    right:10px !important;
    bottom:10px !important;
  }
`

export const LayoutStyled = styled.div`
  width: 100%;
  transition: all 1s ease-out;
  color: #fff;
  overflow: hidden;
  min-height: 100vh;
`

export const HeaderStyled = styled.header`
  height: ${headerHeight};
  line-height: ${headerHeight};
  width: 100vw;
  position: fixed;
  top:0;
  z-index: 999;
  transition: all .6s ease-in-out;
`

export const FooterStyled = styled.footer`
  height: ${footerHeight};
  //line-height: calc(${footerHeight} / 3);
  line-height: calc(${footerHeight} / 3);
  text-align: center;
  padding: 0 2.5rem;
  width: 100%;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  
  p{
    margin-bottom: 0 !important;
  }
`

export const ContainerStyled = styled.div`
  width: 100%;
  min-height: calc(100vh - ${footerHeight});
`
