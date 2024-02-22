import styled from 'styled-components';
import {SideComponentWidth} from '@/styled/cssVariable';

export const SideStyled = styled.div`
  width: ${SideComponentWidth};

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: calc(${SideComponentWidth} + 9vw);
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const BloggerStyled = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;

  .mask {
    background: linear-gradient(322deg, #77a1d3, #79cbca, #e684ae);
    border-radius: .8rem;
    top: 2vw;
    width: 100%;
    height: calc(100% - 2vw);
    position: absolute;
  }

  .ant-avatar {
    width: 6vw;
    height: 6vw;
    position: absolute;
    top: 0;
    border: 0.2rem solid #e684ae;
    transition: transform 0.8s;
    cursor: pointer;

    img {
      width: 110%;
      height: 110%;
      position: relative;
      left: -5%;
      top: -5%;
      transition: transform 0.8s;
    }

    &:hover {
      transform: rotate(360deg);

      img {
        transform: scale(1.2);
      }
    }
  }

  h2 {
    position: absolute;
    top: calc(6vw + 0.5rem);
    font-family: dfdk, 'MiSans Regular', serif;
    font-size: 1.5rem;
  }

  p {
    position: absolute;
    top: calc(6vw + 2.8rem);
    color: #57606f;
    // background: linear-gradient(322deg,#e684ae,#77a1d3);
    // -webkit-background-clip: text;
    // color: transparent;
    font-size: 0.8rem;
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 1rem;
    width: 60%;

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #57606f;
      cursor: pointer;
      transition: transform .2s ease-in-out;

      span {
        font-size: 0.8rem !important;
      }

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(.95);
      }
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    height: 24rem;

    .mask {
      top: 4vw;
    }

    .ant-avatar {
      width: 8vw;
      height: 8vw;
    }

    h2 {
      top: 8vw;
      font-size: 2rem;
    }

    p {
      top: calc(8vw + 2.8rem);
      font-size: 1rem;
    }

    .statistics{
      bottom: 0;
      
      &-item {
        span{
          font-size: 1rem !important;
        }
      }
    }
  }
`

export const TagsStyled = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  margin-top: 1rem;
  padding: 1rem 2rem;
  position: relative;
  box-shadow: 0 15px 35px rgb(42 89 165 / 10%), 0 5px 15px rgb(71 159 188 / 7%);
  width: 100%;
  color: #333;

  .tag {
    border-radius: 0.2rem;
    padding-left: 0.3rem;

    &-num {
      color: #d989ac;
      font-weight: 600;
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    margin-top: 3rem;
    
    h3{
      font-size: 1.3rem;
    }
  }
`
