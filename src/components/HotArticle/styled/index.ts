import styled from 'styled-components';

export const Hot = styled.div`
  width: 62vw;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 15px 35px rgba(42,89,165,.1),0 5px 15px rgba(71,159,188,.07);
  padding: 0 1rem 1.5rem 1rem;

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px){
    width: 80vw;
    left:10vw;
    font-size: 1rem;
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    width: 90vw;
    left:5vw;
    //bottom:30vh;
    font-size: 3rem;
    padding: 0 2vw;
    
    .cardParent{
      flex-direction: column;
    }
  }
`

export const HotCard = styled.div`
  width: 19vw;
  height: 12vw;
  overflow: hidden;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;
  padding: 1.2rem 1rem;
  box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);

  .title {
    color: #fff;
    z-index: 2;
    position: relative;
    top: 1rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    padding: 0 0.3rem;
    font-family: 'MiSans Regular', serif;
    text-shadow: 0.1rem 0.1rem 0.3rem #000;
    height: 2.6rem;
    //超出显示...
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .desc {
    color: rgba(255, 255, 255, .8);
    z-index: 2;
    position: relative;
    top: 1rem;
    font-size: 0.7rem;
    text-indent: 2em;
    //超出省略
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-shadow: 0.1rem 0.1rem 0.2rem #000;
  }
  
  .button{
    z-index: 2;
    position: absolute;
    bottom:0.8rem;
    right: 1rem;
  }

  img {
    width: 100%;
    min-height: 12vw;
    transition: all .4s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }

  // 小于等于1280像素 （720p及以下电脑）
  @media screen and (max-width: 1280px){
    width: 25vw;
    height: 14vw;

    .title{
      font-size: 1.1rem;
      height: 3rem;
    }
    
    .desc{
      font-size: 0.9rem;
    }
  }

  // 小于等于768像素 （手机）
  @media screen and (max-width: 768px){
    width: 86vw;
    height: 145px;
    margin-bottom: 3rem;
    border-radius: 1.5rem;

    .title{
      font-size: 3.8rem;
      height: 9rem;
      text-shadow: 0.5rem 0.5rem 1.2rem #000;
    }

    .desc{
      font-size: 3rem;
      text-shadow: 0.5rem 0.5rem 1rem #000;
    }

    .button{
      bottom:2rem;
      right: 3rem;
    }

    img {
      min-height: 145px;
    }
  }
`
