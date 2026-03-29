import styled from 'styled-components';

export const SearchFieldContainerStyled = styled.div`
    margin: 20px 0 0 280px;

    @media (max-width: 768px) {
      margin: 20px 0 0 210px;
    }

    @media (max-width: 480px) {
      margin: 20px auto 0 auto;
      display: flex;
      justify-content: center;
    }
`

export const SearchFieldWrapperStyled = styled.div`
  display: flex;
  height: 45px;
  align-items: center;
  justify-content: space-around;
  background-color: #1A1A1A;
  width: 350px;
  border-radius: 50px;
  margin: 0 20px;

  > input[type='text']{
    width: 240px;
    height: 30px;
    background-color: #1A1A1A;
    color: white;
    font-family: 'Poppins', sans-serif;
    border: none;
  }

  > input[type='text']::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: white;
  }

  > input[type='text']:focus{
    outline: none;
  }

  > span{
    color:white;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    width: 320px;

    > input[type='text'] {
      width: 220px;
    }

    > span {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    width: calc(100% - 40px);
    height: 40px;

    > input[type='text'] {
      width: calc(100% - 60px);
      height: 25px;
      font-size: 14px;
    }

    > input[type='text']::placeholder {
      font-size: 11px;
    }

    > span {
      font-size: 16px;
    }
  }
`