import styled from 'styled-components';
import bgPng from './bg.png';

const WallpaperBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 800px) {
    height: fit-content;
  }

  ::after {
    content: '';
    background: url(${bgPng});
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background: #1e3061 url(${bgPng}) bottom center no-repeat;
    background-size: cover;
  }
`;

export default WallpaperBox;
