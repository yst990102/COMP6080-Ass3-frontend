import React from 'react';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// styled components
import {
  ThumbnailContainer, // thumbnail container
  Thumbnail, // thumbnail
  PreviousButton, // previous button
  NextButton, // next button
  ShiftLeftCenter, // thumbnail shift left to hide
  ShiftLeftRight, // thumbnail shift left to display
  ShiftRightCenter, // thumbnail shift right to hide
  ShiftRightLeft, // thumbnail shift right to display
} from './style-components/Thumbnail';

function ThumbnailCarousel ({ cover, addition }) {
  const thumnails = [cover, ...addition]; // thumbnail list
  const [index, setIndex] = React.useState(0); // current display thumbanil index
  const [shiftLeft, setShiftLeft] = React.useState(false); // shift direction
  const [shift, setShift] = React.useState(false); // start shifting

  const length = thumnails.length; // number of thumbnails

  // render component
  return (
    <ThumbnailContainer>
      {/* previous button to show previous thumbnail */}
      {
        thumnails.length > 1 &&
        <PreviousButton
          aria-label="previous photo of this listing"
          onClick={() => {
            if (index > 0) {
              setIndex(index - 1);
            } else {
              setIndex(length - 1);
            }
            setShift(true);
            setShiftLeft(false);
          }}
        >
          <NavigateBeforeIcon fontSize="large"/>
        </PreviousButton>
      }
      {/* cover thumbnail after loading and before shifting */}
      {
        !shift &&
        <Thumbnail
          src={cover}
          alt="photo of this listing"
        />
      }
      {/* thumbnail shift left */}
      {
        shift && shiftLeft &&
        <>
          <ShiftLeftCenter
            key={index === 0 ? length - 1 : index - 1}
            src={index === 0 ? thumnails[length - 1] : thumnails[index - 1]}
            alt="photo of this listing"
          />
          <ShiftLeftRight
            key={index}
            src={thumnails[index]}
            alt="photo of this listing"
          />
        </>
      }
      {/* thumbnail shift right */}
      {
        shift && !shiftLeft &&
        <>
          <ShiftRightCenter
            key={index === length - 1 ? 0 : index + 1}
            src={index === length - 1 ? thumnails[0] : thumnails[index + 1]}
            alt="photo of this listing"
          />
          <ShiftRightLeft
            key={index}
            src={thumnails[index]}
            alt="photo of this listing"
          />
        </>
      }
      {/* next button to show next thumbnail */}
      {
        thumnails.length > 1 &&
        <NextButton
          aria-label="previous photo of this listing"
          onClick={() => {
            if (index < length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
            setShift(true);
            setShiftLeft(true);
          }}
        >
          <NavigateNextIcon fontSize="large"/>
        </NextButton>
      }
    </ThumbnailContainer>
  )
}

ThumbnailCarousel.propTypes = {
  cover: PropTypes.string,
  addition: PropTypes.array,
}

export default ThumbnailCarousel;
