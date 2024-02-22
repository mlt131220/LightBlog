import styled from 'styled-components';
import { Card } from 'antd';

export const Article = styled(Card)`
  width: 100%;
  height: 12rem;
  overflow: hidden;
  border: 0 !important;
  border-radius: 0.3rem !important;
  transition: all .3s ease-in-out !important;
  margin-bottom: 1.5rem !important;
  box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
  
  .ant-card-body{
    padding: 0 !important;
    overflow: hidden;
    display: grid;
    grid-template-columns:0 1fr 1.5fr 0;
    position: relative;
  }
  
  .img{
    width: 20vw;
    overflow: hidden;
    
    img{
      width: 20vw;
      min-height: 12rem;
      transition: all .3s ease-in-out !important;
    }
  }
  
  &>div{
    h3{
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-wrap: break-word;
      color: #101012;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.2;
      max-height:2.5rem
    }
    
    p{
      color: #888;
      font-size: 0.6rem;
      margin: 0.4rem 0 !important;
    }
    
    .desc{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      font-size: 0.7rem;
      font-weight: 500;
      text-indent: 2em;
      color: #57606f;
      margin-bottom: 0.8rem;
      font-family: 'MiSans Regular', 'MicroSoft Yahei', serif;
      height:3.5rem;
    }
    
    .button{
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
  }
  
  &:hover{
    transform: scale(1.05);

    .img img{
      transform: scale(1.2);
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px){
    height: 14rem;

    .img{
      width: 22vw;

      img{
        width: 22vw;
        min-height: 14rem;
      }
    }
    
    &>div{
      h3{
        font-size: 1.2rem;
        max-height:3rem
      }
      
      .desc{
        font-size: 1rem;
      }
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    height: 110px;
    border-radius: 1.2rem !important;
    margin-bottom: 3rem !important;
    width: 90vw;
    
    .img{
      width: 40vw;

      img{
        width: 40vw;
        min-height: 110px;
      }
    }

    &>div{
      h3{
        font-size: 14px;
        max-height:36px;
        line-height: 1.4;
      }

      .desc{
        display: none;
      }

      .button{
        font-size: 12px;
        padding: 0 10px;
        height: 28px;
      }
    }
  }
`
