import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PropTypes from 'prop-types';

// import styled components
import {
  WarnContainer, // warn container
  WarnIconContainer, // icon container
  WarnMessageContainer // message container
} from './style-components/Container';

function Warn ({ warnmsg }) {
  // render component
  return (
    <WarnContainer role="alert">
      <WarnIconContainer>
        <WarningAmberIcon />
      </WarnIconContainer>
      {/* warn message */}
      <WarnMessageContainer>{warnmsg}</WarnMessageContainer>
    </WarnContainer>
  )
}

Warn.propTypes = {
  warnmsg: PropTypes.string,
}

export default Warn;
