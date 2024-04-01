import styled from 'styled-components'
import BackgroundImage from '../../assets/BackgroundLogin.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url("${BackgroundImage}");
  display: flex;
  align-items: center;
  justify-content: center;
`
export const LoginImage = styled.img`
  height: 70%;
`
export const ContainerItens = styled.div`
  background: #373737;
  border-radius: 0 10px 10px 0;
  height: 70%;
  padding: 75px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 10px;
  }
`
export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  margin-top: 18px;
  margin-bottom: 5px;
`
export const Input = styled.input`
  height: 30px;
  width: 350px;
  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 5px;
  border: ${props => props.error ? ' 2px solid #cc1717' : 'none'}; // Se ocorrer um erro na validação vai por essa borda, se não houver vai ficar sem borda
  padding-left: 10px;
`

export const SignLink = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
export const ErrorMessage = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #cc1717;
    margin-top: 2px;
`
