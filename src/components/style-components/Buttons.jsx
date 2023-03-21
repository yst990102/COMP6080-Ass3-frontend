import styled from 'styled-components';

// menu button style
export const MenuButton = styled.button`
    position: absolute;
    background-color: white;
    
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 20px;

    right: 5%;
    top: 50%;
    margin-top: -20px;
    cursor: pointer;

    cursor: pointer;
    &:hover {
        background-color: #A9A9A9;
    }

    &:active {
        background-color: white;
    }
`;

// sidebar button style
export const SideBarButton = styled.button`
    display: flex;
    align-items: center;
    background: inherit;
    height: 100%;
    width: 100%;

    border: none;
    font-size: 1.2em;
    padding-left: 1em;
    cursor: pointer;
    background: white;

    &:hover {
        background-color: #F5F5F5;
    }
`
