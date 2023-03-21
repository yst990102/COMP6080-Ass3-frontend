import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import PopUpMessage from './PopUpMessage';

// styled components
import {
  CoverThumbnailContainer, // cover thumbnail container
  AdditionThumnailContainer // addition thumbnail container
} from './style-components/Container';

import {
  UploadThumbnail, // entire container
  UploadThumnailTitle, // thumbnail container
  ThumbnailClass, // thumbnail class container
  ThumbnailClassNotice, // thumbnail class notification
  AddButton, // add thumbnail button
  UploadThumnailDisplay, // display thumbnail
  Thumbnail, // thumbnail image
  RemoveThumbnailButton // remove thumbnail button
} from './style-components/CreateListingComponent';

// upload thumbnail in frontend temporary
function ThumnailUpload ({ type, thumbnails, setThumbnails, setWarn }) {
  const [popUp, setPopUp] = React.useState(false);
  let inputRef = null;

  // upload image
  const upload = async (e) => {
    const img = e.target.files[0];
    try {
      const convertedImg = await fileToDataUrl(img);
      if (type === 'cover') {
        // store in cover thumbnail
        setThumbnails({
          cover: convertedImg,
          addition: thumbnails.addition
        });
      } else {
        // store in addition thumbnail
        setThumbnails({
          cover: thumbnails.cover,
          addition: [...thumbnails.addition, convertedImg]
        });
      }
      e.target.value = '';
    } catch (error) {
      setPopUp(true);
    }
  }

  // this function is obtained from comp6080 ass2 provided code
  const fileToDataUrl = (file) => {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }

    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }

  return (
    <>
      <UploadThumbnail>
        <UploadThumnailTitle>
          <ThumbnailClass>
            {/* display required thumbnail */}
            {type[0].toUpperCase() + type.slice(1)}
            {
              type === 'cover' &&
              <ThumbnailClassNotice>Upload one photo for cover</ThumbnailClassNotice>
            }
            {
              type === 'addition' &&
              <ThumbnailClassNotice>Upload any supplementary photo</ThumbnailClassNotice>
            }
          </ThumbnailClass>
          {/* upload thumbnail */}
          {
            (type === 'addition' || (type === 'cover' && thumbnails.cover === '')) &&
            <AddButton
              onClick={() => {
                inputRef.click();
                setWarn(false);
              }}
            >
              Add
            </AddButton>
          }
          {/* change thumbnail */}
          {
            type === 'cover' && thumbnails.cover !== '' &&
            <AddButton onClick={() => inputRef.click()}>
              Change
            </AddButton>
          }
          {/* hidden input field */}
          <input
            name={`${type}Add`}
            ref={(button) => { inputRef = button }}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => upload(e)}
          />
        </UploadThumnailTitle>
        <UploadThumnailDisplay>
          {/* display uploaded cover thumbnails */}
          {
            type === 'cover' && thumbnails.cover !== '' &&
            <CoverThumbnailContainer>
              <Thumbnail src={thumbnails.cover} alt={'photo of this property show in cover'} />
            </CoverThumbnailContainer>
          }
          {/* display uploaded addition thumbnails */}
          {
            type === 'addition' &&
            thumbnails.addition.map((item, index) => {
              // display each addition thumbnail with delete button
              return (
                <AdditionThumnailContainer key={index}>
                  <Thumbnail src={item} alt={`addition uploaded ${type} photo`} />
                  <RemoveThumbnailButton
                    onClick={() => {
                      const temp = [...thumbnails.addition];
                      temp.splice(index, 1);
                      setThumbnails({
                        cover: thumbnails.cover,
                        addition: temp
                      })
                    }}
                  >
                    <HighlightOffTwoToneIcon />
                  </RemoveThumbnailButton>
                </AdditionThumnailContainer>
              )
            })
          }
        </UploadThumnailDisplay>
      </UploadThumbnail>
      {/* warning when wrong type is uploaded */}
      {
        popUp &&
        <PopUpMessage
          msg="Invalid image type"
          setSuccess={setPopUp}
        />
      }
    </>
  )
}

ThumnailUpload.propTypes = {
  type: PropTypes.string,
  thumbnails: PropTypes.object,
  setThumbnails: PropTypes.func,
  setWarn: PropTypes.func,
}

export default ThumnailUpload;
