import styled from 'styled-components';
import {footerHeight} from "@/styled/cssVariable";

export const TimelineContainerStyled = styled.div`
  margin-bottom: -${footerHeight};

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    width: 80vw;
    left: 10vw;
    font-size: 1rem;

    & > div:first-child {
      width: 50vw;
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    position: absolute;
    width: 90vw;
    height:76vh;
    left: 5vw;
    top:10vh;

    & > div:first-child {
      width: 90vw;
      height: 100%;
    }
  }
`

export const TimelineCardStyled = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(42, 89, 165, 0.1), 0 5px 15px rgba(71, 159, 188, 0.07);
  padding: 1rem 1rem 1.5rem 1rem;

  .timeline {
    max-height: 65vh;
    overflow-y: auto;
    padding: 1rem;

    .con {
      flex-direction: column;

      p {
        cursor: pointer;
      }
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px) {
    .timeline {
      padding: 1rem 1rem 1rem 2rem;

      .con {
        p {
          font-size: 14px;
        }
      }
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    height: 100%;
    
    h2{
      font-size: 3.8rem;
      padding: 9px 0;
    }

    .timeline {
      max-height: 68vh;
    }
  }
`;
