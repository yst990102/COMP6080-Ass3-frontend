import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// styled components
import {
  Header,
  HeadTitle,
  Nav,
  NavButton
} from '../components/style-components/Structure';
// menu button
import { MenuButton } from '../components/style-components/Buttons';

import LoginSideBar from '../components/LoginSideBar'; // sidebar when login
import LogoutSideBar from '../components/LogoutSideBar'; // sidebar when logout

// navgator
function HeaderNav ({ token, setToken }) {
  // pop up sidebar flag
  const [popUpSide, setPopUpSide] = React.useState(false);

  const navigate = useNavigate(); // url history
  const location = useLocation(); // url location
  const currentPage = location.pathname;

  return (
    <>
      {/* page header */}
      <Header>
        <HeadTitle>
          AirBrB
        </HeadTitle>
        <Nav>
          {/* Navigator button to home page */}
          <NavButton
            located={currentPage === '/'}
            onClick={() => {
              if (currentPage !== '/') {
                navigate('/');
              }
            }}
            aria-label="go to home page"
          >
            Home
          </NavButton>
          {/* Navigator button to my listing page */}
          <NavButton
            located={currentPage === '/mylistings'}
            onClick={() => {
              if (currentPage !== '/mylistings') {
                navigate('/mylistings');
              }
            }}
            aria-label="go to my listing page"
          >
            My Listings
          </NavButton>
        </Nav>
        {/* menu button */}
        <MenuButton
          name="menu"
          onClick={() => setPopUpSide(true)}
          aria-label="Toggle user menu"
          aria-expanded={popUpSide}
          aria-haspopup="menu"
        >
          <PersonOutlineIcon fontSize="medium" />
        </MenuButton>
        {/* sidebar when logout */}
        {
          popUpSide && token === '' &&
          <LogoutSideBar
            showSideBar={setPopUpSide}
          />
        }
        {/* sidebar when login */}
        {
          popUpSide && token !== '' &&
          <LoginSideBar
            token={token}
            setToken={setToken}
            showSideBar={setPopUpSide}
          />
        }
      </Header>
    </>
  )
}

HeaderNav.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
}

export default HeaderNav;
