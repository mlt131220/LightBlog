import styled from 'styled-components';
import {footerHeight} from "@/styled/cssVariable";

export const TagsStyled = styled.div`
  width: 62vw;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(42,89,165,.1),0 5px 15px rgba(71,159,188,.07);
  padding: 0 1rem 1.5rem 1rem;

  .active{
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
  }
  
  .ant-ribbon-wrapper{
    margin-bottom: 10px;
    margin-right: 12px;

    .ant-card{
      .ant-card-body{
        padding: 8px 30px !important;
      }
    }
  }
  
  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 80vw;
    left:10vw;
    font-size: 1rem;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    width: 90vw;
    left: 5vw;
    //bottom:28vh;
    padding: 0 2vw 1.5vh 2vw;

    h2{
      font-size: 3.8rem;
      padding: 1vh 0;
    }
  }
`

export const TagsResultStyled = styled.div`
  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 80vw;
    left:10vw;

    .articleParent{
      width: 50vw;
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    //margin-bottom: calc(-${footerHeight} - 12vh);
    width: 90vw;
    left: 5vw;
    //bottom:25vh;

    .articleParent{
      width: 90vw;
    }
  }
`

