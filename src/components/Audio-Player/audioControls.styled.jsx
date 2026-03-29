import styled from "styled-components";

export const AudioControlsContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 240px;

    @media (max-width: 768px) {
      margin-right: 100px;
    }

    @media (max-width: 480px) {
      margin-right: 0;
      width: 100%;
      order: 3;
    }
`

export const AudioControlsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -10px;

  > span{
    margin: 0 5px 0 5px;
    font-size: 45px;

    &.previous-icon,
    &.next-icon{
      font-size: 40px;
    }

    > svg {
      cursor:pointer;
    }
  }

  @media (max-width: 480px) {
    > span {
      margin: 0 3px;
      font-size: 35px;

      &.previous-icon,
      &.next-icon {
        font-size: 30px;
      }
    }
  }
`

export const SongSliderContainerStyled = styled.div`

  display: flex;
  align-items: center;
  gap:5px;

  > p{
    font-weight: 300;
    font-size: 12px;
    letter-spacing: 0.5px;
    margin: 0;
  }

  @media (max-width: 480px) {
    > p {
      font-size: 10px;
    }
  }
`

export const ProgressBarContainerStyled = styled.div`
  width: 450px;
  height: 4px;
  background-color: aliceblue;
  border-radius: 10px;
  cursor:pointer;

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
  }
`

export const ProgressBarStyled = styled.div`
  background-color: #f83821;
  height: 100%;
  width: 0%;
  border-radius: 10px;
  transition: width 0.1s ease-in-out;
`

export const VolumeControlContainerStyled = styled.div`
  display: flex;
  align-items: center;

  > span{
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export const VolumeControlBarStyled = styled.div`
  height: 4px;
  width: 100px;
  background-color: aliceblue;
  border-radius: 5px;
  margin: 0 4px 0 4px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 70px;
  }
`

export const VolumeChangeStyled = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background-color: #f83821;
  transition: width 0.1s ease-in-out;
`