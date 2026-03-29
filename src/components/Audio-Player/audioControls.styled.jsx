import styled from "styled-components";

export const AudioControlsContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 350px;
    gap: 8px;

    @media (max-width: 768px) {
      min-width: 300px;
    }

    @media (max-width: 480px) {
      min-width: unset;
      width: 100%;
      order: 2;
      gap: 10px;
    }
`

export const AudioControlsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  > span{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

    &.previous-icon,
    &.next-icon{
      font-size: 35px;
    }

    > svg {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 768px) {
    gap: 10px;

    > span {
      font-size: 36px;

      &.previous-icon,
      &.next-icon {
        font-size: 32px;
      }
    }
  }

  @media (max-width: 480px) {
    gap: 10px;

    > span {
      font-size: 32px;

      &.previous-icon,
      &.next-icon {
        font-size: 28px;
      }
    }
  }
`

export const SongSliderContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;

  > p{
    font-weight: 300;
    font-size: 12px;
    letter-spacing: 0.5px;
    margin: 0;
    min-width: 38px;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 6px;

    > p {
      font-size: 11px;
      min-width: 35px;
    }
  }

  @media (max-width: 480px) {
    gap: 6px;

    > p {
      font-size: 10px;
      min-width: 30px;
    }
  }
`

export const ProgressBarContainerStyled = styled.div`
  width: 500px;
  height: 4px;
  background-color: aliceblue;
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 1;

  @media (max-width: 1024px) {
    width: 400px;
  }

  @media (max-width: 768px) {
    width: 300px;
  }

  @media (max-width: 600px) {
    width: 250px;
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
  gap: 8px;
  flex-shrink: 0;
  margin-top: 0;

  > span{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s;
    margin: 0;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    gap: 6px;

    > span {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    order: 3;
    width: auto;
    gap: 6px;

    > span {
      font-size: 18px;
    }
  }
`

export const VolumeControlBarStyled = styled.div`
  height: 4px;
  width: 100px;
  background-color: aliceblue;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    width: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
  }
`

export const VolumeChangeStyled = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background-color: #f83821;
  transition: width 0.1s ease-in-out;
`