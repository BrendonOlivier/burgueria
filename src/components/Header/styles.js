import styled from 'styled-components'

export const Container = styled.div`
    height: 72px;
    background-color: #1F1F1F;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
`

export const ContainerLeft = styled.div`
    display:flex;
    gap: 30px;
    align-items: center;
    
`

export const PageLink = styled.a`
    cursor: pointer;
    color: ${props => props.isActive ? '#9758A6' : '#ffffff'};
    text-decoration: none;
    font-size: 18px;
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
    line-height: 20px;
`

export const ContainerRight = styled.div`
     display:flex;
    gap: 20px;
    align-items: center;
`
export const Line = styled.div`
    height: 40px;
    border: 1px solid #625E5E;
`

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    p{
        font-size: 15px;
        font-weight: 400;
        line-height: 12px;
        color: #ffffff;
    }
`

export const PageLinkExit = styled.a`
    font-weight: 700;
    font-size: 15px;
    line-height: 12px;
    cursor: pointer;
    color: #9E1C00;
`
