import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

function PasswordButton ({ onClick, ariaLabel, icon }) {
  // render component
  return (
    // show/hide password button
    <IconButton
      onClick={() => onClick()}
      aria-label={ariaLabel}
    >
      {/* button icon */}
      {icon}
    </IconButton>
  );
}

PasswordButton.propTypes = {
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  icon: PropTypes.object
}

export default PasswordButton;
