import {Alert} from 'antd';
import styled from 'styled-components';
import {footerHeight, topImgHeight, articleContainerWidth} from '@/styled/cssVariable';

export const BoxStyled = styled.div`
  min-height: calc(100vh - ${topImgHeight} - ${footerHeight} - 1rem);
  width: ${articleContainerWidth};
  margin-left: calc(50vw - ${articleContainerWidth} / 2);
  margin-top: 1rem;
  background: #fff;
  overflow: hidden;

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 60vw;
    margin-left: 20vw;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    width: 90vw;
    margin-left: 5vw;
    margin-top:10px;
  }
`;

export const DetailContainer = styled.div`
  margin-top: 1rem;
  color: rgb(122, 122, 122);
  line-height: 1.4;
  transition: all 0.4s;
  font-family: 'MiSans Regular', 'Source Han Serif SC', 'MicroSoft Yahei', serif;
  font-size: 0.8rem;
  text-shadow: 0 0 1px rgb(0 0 0 / 10%);

  pre[class*='language-'] {
    position: relative;
    border-radius: 0.3rem;

    code {
      max-height: 80vh;
      padding: 2.5rem 1rem 1rem;
    }

    code::before {
      content: attr(language);
      color: #fff;
      height: 2rem;
      line-height: 2rem;
      background: #111;
      font-size: 0.8rem;
      position: absolute;
      margin-top: -2.5rem;
      left: 0;
      width: 100%;
      font-family: Ubuntu, sans-serif;
      font-weight: 700;
      padding: 0 4rem;
      text-indent: 0.75rem;
      text-align: center;
      float: left;
      z-index: 1;
      pointer-events: none;
    }

    .copy-code {
      position: absolute;
      top: 0.3rem;
      right: 0.75rem;
      z-index: 2;
      color: #fff;
      cursor: pointer;
      overflow: visible;
      font-weight: 700;
      font-size: 0.9rem;
      transition: all 0.08s;
    }

    .copy-code:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .copy-code:active {
      font-size: 0.8rem;
    }
  }

  pre[class*='language-']::before {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    width: 0.6rem;
    height: 0.6rem;
    overflow: visible;
    font-weight: 700;
    font-size: 0.8rem;
    line-height: 0.6rem;
    white-space: nowrap;
    text-indent: 3.75rem;
    background-color: #fc625d;
    border-radius: 0.8rem;
    box-shadow: 1rem 0 #fdbc40, 2rem 0 #35cd4b;
    content: '';
    z-index: 2;
  }

  blockquote {
    width: 100%;
    outline: 0;
    border-radius: 3px;
    padding: 0.4rem 0 0.4rem 1rem;
    box-sizing: border-box;
    position: relative;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;

    p:last-child {
      margin-bottom: 0 !important;
    }
  }

  blockquote::before {
    content: '';
    background-color: #e0e0e0;
    width: 4px;
    border-radius: 2px;
    position: absolute;
    left: 2px;
    top: 6px;
    height: calc(100% - 12px);
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    margin-top: 18px;
    font-size: 14px;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    blockquote{
      padding: 5px 0 5px 15px;
    }
  }
`;

export const AlertStyled = styled(Alert)`
  width: 98%;
  margin-left: 1%;
  font-family: fhst, 'MicroSoft Yahei', serif;
  font-weight: 600;
`;

export const CopyrightStyled = styled.div`
  background: #f2f6fc;
  border-radius: 0.2rem;
  font-size: 0.7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1em 1em;
  border: 0;
  box-shadow: 0 0 0 transparent;
  color: #909399;
  font-family: 'MiSans Regular', 'MicroSoft Yahei', serif;
  font-weight: 600;

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    margin-top: 18px;
    margin-bottom: 18px;
    border-radius: 4px;
    font-size: 13px;
  }
`;
