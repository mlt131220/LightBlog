import styled from 'styled-components';
import {topImgHeight, articleContainerWidth} from '@/styled/cssVariable';

export const TopImgStyled = styled.div`
  width: 100vw;
  height: ${topImgHeight};
  overflow: hidden;
  position: relative;

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    height:38vh;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    height:28vh;
  }
`;

export const ImgStyled = styled.img`
  width: 100vw;
`;

export const TitleStyled = styled.h1`
  position: absolute;
  top: 70%;
  width: ${articleContainerWidth};
  left: calc(50vw - ${articleContainerWidth} / 2);
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0.1rem 0.1rem 0.5rem #000;
  font-weight: 500;
  word-wrap: break-word;
  word-break: break-all;

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 60vw;
    left: 20vw;
    font-size: 24px;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    width: 90vw;
    left: 5vw;
    top: 80px;
    font-size: 20px;
  }
`;

export const TitleDetailStyled = styled.p`
  position: absolute;
  top: 80%;
  width: ${articleContainerWidth};
  left: calc(50vw - ${articleContainerWidth} / 2);
  color: #fff;
  font-size: 0.8rem;
  padding: 0.8rem 0 0;
  line-height: 2rem;
  text-shadow: 0.1rem 0.1rem 0.5rem #000;
  display: flex;
  flex-wrap: wrap;
  
  span{
    line-height: 1.2;
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 60vw;
    left: 20vw;
    font-size: 14px;
  }
  
  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    width: 90vw;
    left: 5vw;
    top: 145px;
    
    span{
      display: inline-block;
    }
  }
`;
