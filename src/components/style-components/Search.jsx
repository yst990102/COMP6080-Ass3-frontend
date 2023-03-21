import styled from 'styled-components';

// search container style
export const SearchField = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #DCDCDC;
`;

// search bar for name/city search style
export const MainSearch = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 600px) {
        padding: 0 10%;
    }
`;

// conditional search container style
export const AuxiliarySearch = styled.div`
    border-top: 1px solid #DCDCDC;
    margin-top: 10px;
    padding: 10px 10%;

    @media (min-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
    }
`;

// search filed container style
export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    height: 40px;
    padding:2px;
    max-width: 300px;
    background-color: white;
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
`;

// search filed style
export const ListingSearch = styled.input`
    margin: 0;
    border: none;
    outline: none;
    height: 100%;
    width: 80%;
    font-size: 20px;
`;

// search button style
export const SearchButton = styled.button`
    background-color: #00BFFF;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin: 0 20px;
    &:hover {
        background-color: #1DAAD9;
    }
    
    &:active {
        background-color: #00BFFF;
    }
`;

// clear input button style
export const ClearButton = styled.button`
    display: flex;
    align-items: center;
    justify-contents: center;
    padding: 0;
    margin-right: 5px;
    overflow: hidden;

    width: 20px;
    height: 20px;
    background-color: #C0C0C0;
    color: white;
    border-radius: 10px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: grey;
    }

    &:active {
        background-color: #C0C0C0;
    }
`;

// condition search container style
export const SearchFilterContainer = styled.div`
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    margin-bottom: 10px;

    @media (min-width: 600px) {
        width: 500px;
    }
`;

// input field style
export const Input = styled.input`
    width: 70%;
    outline: none;
    border: none;
`;

// clear condition button style
export const ClearFilterButton = styled.button`
    margin-left: 10px;
    cursor: pointer;
`;

// sort by rate button style
export const SortButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #FF765E;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
        background-color: #F66045;
    }

    &:active {
        background-color: #FF765E;
    }
`;

// input field container style
export const InputContainer = styled.div`
    display: inline-flex;
    height: 20px;
    width: 55px;
    align-items: center;
    justify-content: center;
    border: 1px solid #989898;
    border-radius: 5px;
    background-color: white;
`;
