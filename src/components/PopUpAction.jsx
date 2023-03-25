import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { Wrap } from './style-components/SideBar'; // background wrap
import {
  PopUpContainer, // popup container
  CloseButtonContainer, // close button
  Question // popup question
} from './style-components/PopUp';

import {
  ActionButtonContainer, // action button container
  UserActionButton // action button
} from './style-components/Booking';

// popup action to a specific booking
function PopUpAction ({ id, setMsg, setSuccess, setPopUp }) {
  // send action to server
  const action = async (measure) => {
    const token = localStorage.getItem('token');
    const body = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    const response = await fetch(`https://comp6080-ass3-backend.onrender.com/bookings/${measure}/${id}`, body);

    if (response.status === 200) {
      // action successfull complete
      setMsg(`Successful ${measure}`);
      setSuccess(true);
      setPopUp(false);
    }
  }

  return (
    <>
      <Wrap onClick={() => setPopUp(false)} />
      <PopUpContainer
        type="booking"
        id={`action${id}`}
        role="form"
      >
        {/* close button */}
        <CloseButtonContainer onClick={() => setPopUp(false)}>
          <HighlightOffSharpIcon fontSize="large"/>
        </CloseButtonContainer>
        <Question>
          Do you want to accept this booking?
        </Question>
        {/* accept this booking */}
        <ActionButtonContainer>
          <UserActionButton
            onClick={() => action('accept')}
            background="accept"
          >
            Accept
          </UserActionButton>

          {/* decline this booking */}
          <UserActionButton
            onClick={() => action('decline')}
            background="decline"
          >
            Decline
          </UserActionButton>
        </ActionButtonContainer>
      </PopUpContainer>
    </>

  )
}

PopUpAction.propTypes = {
  id: PropTypes.number,
  setMsg: PropTypes.func,
  setSuccess: PropTypes.func,
  setPopUp: PropTypes.func
}

export default PopUpAction;
