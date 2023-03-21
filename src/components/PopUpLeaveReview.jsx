import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Rating from '@mui/material/Rating';

// import styled components
import { Wrap } from './style-components/SideBar' // background wrap
import { PublishButton } from './style-components/Listing'; // publish button
import {
  PopUpContainer, // popup container
  CloseButtonContainer // close button
} from './style-components/PopUp';

import {
  CommentContainer, // comment container
  RatingContainer, // rating container
  SendContainer // send button container
} from './style-components/Container'

// popup for user to leave reivew to a specific listing
function PopUpLeaveReview ({ listingId, bookingId, setPopUpLeaveReview, setMessage, setPopUpMessage }) {
  const token = localStorage.getItem('token'); // user token
  const [rate, setRate] = React.useState(0); // rate
  const [comment, setComment] = React.useState(''); // comment

  // check rating and comment has been input
  const check = () => {
    let pass = true;

    if (comment === '' && rate === 0) {
    // both rating and comment are empty
      setMessage('Require fill in comment and rating')
      setPopUpMessage(true);
      pass = false;
    } else if (comment === '') {
      // comment is empty
      setMessage('Require fil in comment')
      setPopUpMessage(true);
      pass = false;
    } else if (rate === 0) {
      // rate is empty
      setMessage('Require fill in rating (at least one star)')
      setPopUpMessage(true);
      pass = false;
    }

    return pass;
  }

  // send review request to server
  const sendReview = async () => {
    if (check()) {
      // request body
      const body = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          review: {
            rate,
            comment,
            date: Date.now()
          }
        })
      }

      const response = await fetch(`http://google.hongkong.styuan990102.top:5005/listings/${listingId}/review/${bookingId}`, body)

      if (response.status === 200) {
        // successfull send review
        setMessage('Successfull comment');
        setPopUpLeaveReview(false);
        setPopUpMessage(true);
      } else {
        // fail to comment to current listing
        setMessage('Fail to comment, please try later')
      }
    }
  }

  return (
    <>
      <Wrap onClick={() => setPopUpLeaveReview(false)} />
      <PopUpContainer id={`leave${listingId}`} role="form">
        {/* close button */}
        <CloseButtonContainer onClick={() => setPopUpLeaveReview(false)}>
          <HighlightOffSharpIcon fontSize="large"/>
        </CloseButtonContainer>
        <h3>Review</h3>

        {/* leave comment */}
        <CommentContainer
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        >
        </CommentContainer>

        {/* leave rating */}
        <RatingContainer>
          Rating:&nbsp;
          <Rating
            name="rate-for-this-booking"
            value={rate}
            size="large"
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </RatingContainer>

        {/* publish review */}
        <SendContainer>
          <PublishButton
            onClick={() => sendReview()}
          >
            Send
          </PublishButton>
        </SendContainer>
      </PopUpContainer>
    </>

  )
}

PopUpLeaveReview.propTypes = {
  listingId: PropTypes.string,
  bookingId: PropTypes.number,
  setMessage: PropTypes.func,
  setPopUpLeaveReview: PropTypes.func,
  setPopUpMessage: PropTypes.func,
}

export default PopUpLeaveReview;
