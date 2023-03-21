import styled, { css } from 'styled-components';

// default title style
const defaultTitle = css`
    margin-top: 0;
    font-weight: normal;
`

// warning container
export const Warning = styled.div`
    margin: 20px auto;
    padding: 20px;
    width: 50%;
    border: 2px solid red;
    background-color: #FFFACD;
    font-size: 20px;
`

// create listing container style
export const CreateListContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

// title container style
export const Title = styled.h1`
    padding: 0 calc((100% - 400px) / 2 + 20px);
    font-weight: normal;
    font-size: 1.5em;
`;

// request detail container style
export const Detail = styled.div`
    padding: 0 calc((100% - 400px) / 2 + 20px);
    height: calc(100% - 80px);
    overflow: auto;
`;

// page footer style
export const CreateListContainerFooter = styled.div`
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-top: 1px solid lightgray;
    background-color: white;
    z-index: 1;
`;

// step container style
export const Step = styled.div`
    margin-top: 1em;
    margin-bottom: 0;
`;

// request information container style
export const RequestInfo = styled.h3`
    ${defaultTitle}
    font-size: 20px;
    margin-bottom: 30px;
`;

// input field style
export const Input = styled.input`
    width: 80%;
    height: 100%;
    font-size: 1.5em;
    border: none;
    outline: none;
    background-color: transparent;
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
`;

// default footer button style
const defaultFooterButton = css`
    box-sizing: content-box;
    position: absolute;
    height: 40px;
    min-width: 65px;
    top: 50%;
    margin-top: -20px;
    padding: 0 10px;

    background-color: #50C878;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-contents: center;

    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: #3CB371;
    }

    &:active {
        background-color: #50C878;
    }
`;

// update button style
export const UpdateButton = styled.button`
    ${defaultFooterButton};
    justify-content: center;
    left: 50%;
    margin-left: -32.5px;
`;

// next button style
export const NextStepButton = styled.button`
    ${defaultFooterButton};
    right: 1em;
    justify-content: right;
    
    @media (min-width: 600px) {
        right: 10%;
    }
`;

// previous button style
export const PreStepButton = styled.button`
    ${defaultFooterButton};
    left: 1em;

    @media (min-width: 600px) {
        left: 10%;
    }
`;

// input container style
export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 10px;
    border-radius: 10px;
    border: ${(props) => props.warn ? '1px solid #8B0000' : '1px solid #c4c4c4'};
    background-color: ${(props) => props.warn ? '#FFDAB9' : 'inheirt'};
`

// unit container style
export const Unit = styled.div`
    font-size: 20px;
    height: 100%;
    margin-right: 10px;
`;

// bedroom information container style
export const BedroomInfoContainer = styled.ol`
    margin-top: 30px;
    margin-bottom: 70px;
    padding: 0;
    list-style: none;
`;

// entire container style
export const BedroomInfo = styled.li`
    box-sizing: border-box;
    position: relative;
    border-top: 1px solid lightgrey;
    padding: 20px 0;
    margin-bottom: -1px;
    min-height: 100px;

    &:last-child {
        border-bottom: 1px solid lightgrey;
    }
`;

// title container style
export const BedroomInfoTitleContainer = styled.div`
    position: relative;
`;

// title style
export const BedroomInfoTitle = styled.h3`
    ${defaultTitle}
    font-size: 20px;
`;

// inforamtion button style
export const BedInfoButton = styled.button`
    position: absolute;
    width: 60px;
    height: 40px;
    top: 50%;
    right: 10px;
    margin-top: -20px;
    background-color: white;
    border: 1px solid #DCDCDC;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        border: 2px solid #D3D3D3;
    }
`;

// information container style
export const BedInfoContainer = styled.ul`
    margin-top: 20px;
    padding: 0;
    list-style: none;
`;

// entire container style
export const BedInfo = styled.li`
    width: 100%;
`;

// checkbox container style
export const CheckboxContainer = styled.div`
    padding-bottom: 30px;
`;

// checkbox information container style
export const CheckboxTermContainer = styled.div`
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// checkbox main information container style
export const CheckboxTerm = styled.div`
    font-size: 18px;
`;

// checkbox explaination container style
export const CheckboxTermExplain = styled.div`
    margin: 0;
    font-size: 14px;
    color: grey;
`;

// entire container style
export const UploadThumbnail = styled.li`
    padding-bottom: 20px;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom: 20px;

    &:last-child {
        border-bottom: none;
    }
`;

// thumbnail container style
export const UploadThumnailTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
`;

// thumbnail class container style
export const ThumbnailClass = styled.h3`
    ${defaultTitle}
    font-size: 25px;
`;

// thumbnail class notification style
export const ThumbnailClassNotice = styled.div`
    font-size: 15px;
`;

// add thumbnail button style
export const AddButton = styled.button`
    font-size: 18px;
    text-decoration: underline;
    border: none;
    background-color: inherit;
    cursor: pointer;
`;

// display thumbnail style
export const UploadThumnailDisplay = styled.div`
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
`;

// thumbnail image style
export const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

// remove thumbnail button style
export const RemoveThumbnailButton = styled.button`
    position: absolute;
    right: 0;
    border: none;
    background-color: white;
    cursor: pointer;
`;
