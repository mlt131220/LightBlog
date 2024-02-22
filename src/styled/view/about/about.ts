import styled from 'styled-components';
import {footerHeight} from "@/styled/cssVariable";

export const AboutStyled = styled.div`
  width: 62vw;
  background: linear-gradient(322deg, #77a1d3, #79cbca, #e684ae);
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(42, 89, 165, .1), 0 5px 15px rgba(71, 159, 188, .07);
  padding: 1.5rem 2rem;
  margin-bottom: -${footerHeight};

  .photo {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-avatar {
      width: 5vw;
      height: 5vw;
      border: 0.2rem solid #e684ae;
      transition: transform 0.8s;
      cursor: pointer;

      img {
        transition: transform 0.8s;
      }

      &:hover {
        transform: rotate(360deg);

        img {
          transform: scale(1.2);
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
        font-size: 0.8rem;
      }
    }
  }

  .content {
    p {
      margin-bottom: 0.8em !important;
    }

    .text {
      text-indent: 2em;
      color: rgba(0, 0, 0, 0.85);
      font-size: 0.8rem;

      .anticon {
        display: unset !important;
      }
    }

    .title {
      margin-left: 2em;
      width: 100%;
      outline: 0;
      border-radius: 3px;
      padding: 0 0 0 1rem;
      box-sizing: border-box;
      position: relative;

      &::before {
        content: '';
        background-color: #e0e0e0;
        width: 4px;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
      }
    }

    .title-text {
      text-indent: 6em;
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.7rem;
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 80vw;
    left: 10vw;

    .photo {
      .ant-avatar {
        width: 7vw;
        height: 7vw;
      }

      h2 {
        top: calc(8vw + 0.5rem);
        font-size: 1.8rem;
      }

      p {
        top: calc(8vw + 2.8rem);
        font-size: 1rem;
      }
    }

    .content {
      .text {
        font-size: 1.1rem;
      }

      .title {
        font-size: 1.1rem;
      }

      .title-text {
        font-size: 0.9rem;
      }
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px) {
    width: 100vw;
    left: 0;
    //bottom: 28vh;
    margin-bottom: calc(-${footerHeight} - 5vh);

    .photo {
      .ant-avatar {
        width: 20vw;
        height: 20vw;
        border: 0.5rem solid #e684ae;
      }

      h2 {
        top: 21vw;
        font-size: 4.8rem;
      }

      p {
        top: 21vw;
        font-size: 3.5rem;
      }
    }

    .content {
      .text {
        font-size: 3.2rem;
      }

      .title {
        padding: 0 0 0 3rem;
        font-size: 3rem;
      }

      .title-text {
        font-size: 2.4rem;
      }
    }
  }
`
