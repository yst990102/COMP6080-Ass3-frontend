import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';

// styled components
import { SideBarButton } from './style-components/Buttons' // sidebar button
import {
  Wrap, // background wrap
  SideBar, // side bar
  SideBarContainer, // sidebar container
  SideBarContent // sidebar content
} from './style-components/SideBar'
import PopUpMessage from './PopUpMessage';

// sidebar after login
function LoginSideBar ({ token, setToken, showSideBar }) {
  const [success, setSuccess] = React.useState(false); // success flag
  const navigate = useNavigate(); // url history
  const location = useLocation(); // url location

  // send logout request
  const logout = async () => {
    // request body
    const body = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch('http://google.hongkong.styuan990102.top:5005/user/auth/logout', body);

    if (response.status === 200) {
      // clear user information
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      setSuccess(true);
    }
  }

  return (
    <>
      {
        !success &&
        <SideBarContainer>
          <Wrap onClick={() => showSideBar(false)} />
          <SideBar>
            {/* create listing button */}
            <SideBarContent>
              <SideBarButton
                name="createListing"
                onClick={() => {
                  navigate({
                    pathname: '/mylistings/create',
                    search: 'title'
                  })
                }}
              >
                <AddBoxIcon />
                Create Listing
              </SideBarButton>
            </SideBarContent>

            {/* logout button */}
            <SideBarContent>
              <SideBarButton
                name="logout"
                onClick={() => logout()}
              >
                <LogoutIcon />
                Logout
              </SideBarButton>
            </SideBarContent>
          </SideBar>
        </SideBarContainer>
      }
      {/* logout notification */}
      {
        success &&
        <PopUpMessage
          msg="Successful Logout"
          setSuccess={() => {
            // hide sidebar
            if (location.pathname === '/') {
              showSideBar(false);
            }
            // return to home page
            setSuccess(false);
            navigate('/');
            setToken('');
          }}
        />
      }
    </>
  )
}

LoginSideBar.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
  showSideBar: PropTypes.func
}

export default LoginSideBar;
