import styled from 'styled-components';
import {headerHeight} from '@/styled/cssVariable';

export const MenuContainer = styled.div`
  transition: all 0.3s;
  height: calc(${headerHeight} - 0.5rem);
  line-height: calc(${headerHeight} - 0.5rem);
  width: 100%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: space-between;
  color: #666;
  padding: 0 2.5rem;

  .logo {
    transition: all 0.4s;
    font-family: 'xskt', serif;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .menu {
    transition: all 0.5s;
    display: flex;
    position: relative;
    bottom: calc(${headerHeight} - 0.5rem);

    &-item {
      transition: all 0.2s;
      margin-right: 1rem;
      cursor: pointer;
      font-size: 0.8rem;
      border-bottom: 0 solid #ff7f50;
      color: #666;

      &:hover {
        color: #ff7f50;
        border-bottom: 3px solid #ff7f50;
      }

      &:active {
        font-size: 0.7rem;
      }
    }

    .active {
      color: #ff7f50;
      border-bottom: 3px solid #ff7f50;
    }
  }

  .other {
    transition: all 0.1s;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    left: 3.5rem;

    &:hover {
      font-size: 1.05rem;
    }

    &:active {
      font-size: 0.95rem;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 1);

    .logo {
      color: rgba(0, 0, 0, 1);
    }

    .menu {
      bottom: 0;
    }

    .other {
      left: 0;
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const PhoneMenuContainer = styled.div`
  height: ${headerHeight};
  line-height: ${headerHeight};
  padding: 0 3rem;
  display: none;
  position: relative;

  .logo {
    transition: all 0.4s;
    font-family: 'xskt', serif;
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .other {
    display: inline-block;
    font-size: 5rem;
    position: absolute;
    right: 3rem;
    height: ${headerHeight};
    line-height: ${headerHeight};
    transition: transform .2s ease-in-out;

    .anticon {
      margin-left: 3rem;
    }

    .anticon:active {
      transform: scale(0.9);
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    display: block;

    .logo{
      color: unset;
    }
  }
`

//手机下的博主信息
export const BloggerStyled = styled.div`
  width: 100%;
  height: 35vh;
  position: relative;
  display: flex;
  justify-content: center;
  background: linear-gradient(322deg, #77a1d3, #79cbca, #e684ae);
  padding: 4rem 2rem;

  .ant-avatar {
    width: 17vw;
    height: 17vw;
    border: 0.6rem solid #e684ae;
    transition: transform 0.8s;
    cursor: pointer;
    position: absolute;
    top: 4rem;

    img {
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
    top: calc(17vw + 4rem);
    display: block;
    font-family: dfdk, 'MiSans Regular', serif;
    font-size: 6.5rem;
  }

  p {
    position: absolute;
    top: calc(17vw + 14rem);
    color: #57606f;
    font-size: 3.6rem;
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 4rem;
    width: 70%;
    font-size: 3.5rem;

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #57606f;
      cursor: pointer;
      transition: transform .2s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(.95);
      }
    }
  }`

//手机下的菜单列表
export const MenuListStyled = styled.div`
  padding: 3vh 6vw;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  position: relative;

  .menu-item {
    transition: all 0.2s;
    cursor: pointer;
    font-size: 4rem;
    color: #666;
    padding: 2rem 0;

    &:hover {
      color: #ff7f50;
    }

    &:active {
      font-size: 3.8rem;
    }
  }

  .active {
    color: #ff7f50;
  }
`
