import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PortraitIcon from '@mui/icons-material/Portrait';

// styled components
import { SideBarButton } from './style-components/Buttons' // sidebar button
import {
  Wrap, // background wrap
  SideBar, // side bar
  SideBarContainer, // sidebar container
  SideBarContent // sidebar content
} from './style-components/SideBar'

// sidebar before login
function LogoutSideBar ({ showSideBar }) {
  const navigate = useNavigate(); // url history
  const location = useLocation(); // url path
  return (
    <>
      <SideBarContainer>
        <Wrap onClick={() => showSideBar(false)} />
        <SideBar>
          {/* login button */}
          <SideBarContent>
            <SideBarButton
              name="login"
              onClick={() => {
                navigate({
                  pathname: '/login',
                }, {
                  state: {
                    pathname: location.pathname,
                    search: location.search
                  }
                })
              }}
            >
              <LoginIcon/>
              Login
            </SideBarButton>
          </SideBarContent>

          {/* register button */}
          <SideBarContent>
            <SideBarButton
              name="register"
              onClick={() => {
                navigate({
                  pathname: '/register',
                }, {
                  state: {
                    pathname: location.pathname,
                    search: location.search
                  }
                })
              }}
            >
              <PortraitIcon/>
              Register
            </SideBarButton>
          </SideBarContent>
        </SideBar>
      </SideBarContainer>
    </>
  )
}

LogoutSideBar.propTypes = {
  showSideBar: PropTypes.func
}

export default LogoutSideBar;
