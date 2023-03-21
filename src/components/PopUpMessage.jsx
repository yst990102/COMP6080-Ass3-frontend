import React from 'react';
import PropTypes from 'prop-types';

// import styled components
import { Wrap } from './style-components/SideBar' // background wrap
import {
  PopUpMsgContainer, // message container
  PopUpCloseButton // close button
} from './style-components/PopUp'

function PopUpMessage ({ msg, ariaLive, setSuccess }) {
  // render component
  return (
    <>
      <Wrap onClick={() => setSuccess(false)} />
      <PopUpMsgContainer
        aria-live={ariaLive}
        id="popupMessage"
      >
        {/* message */}
        <div>
          {msg}
        </div>
        {/* close button */}
        <PopUpCloseButton
          aria-controls="popupMessage"
          name="close"
          onClick={() => setSuccess(false)}
        >
          Close
        </PopUpCloseButton>
      </PopUpMsgContainer>
    </>
  );
}

PopUpMessage.propTypes = {
  msg: PropTypes.string,
  ariaLive: PropTypes.string,
  setSuccess: PropTypes.func,
}

export default PopUpMessage;
