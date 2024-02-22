import styled from 'styled-components';
import {footerHeight} from "@/styled/cssVariable";

export const ContainerStyled = styled.div`
  margin-bottom: -${footerHeight};

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px){
    width: 80vw;
    left: 10vw;
    
    .articleParent{
      width: 50vw;
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    //margin-bottom: calc(-${footerHeight} - 12vh);
    
    width: 90vw;
    left: 5vw;
    //bottom:27vh;
    
    .articleParent{
      width: 90vw;
    }
  }
`
