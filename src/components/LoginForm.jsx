import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import InputField from './InputField'; // input field for email/password
import Warn from './Warn'; // warning component
import PopUpMessage from './PopUpMessage'; // notification component

// import styled components
import {
  HeaderContainer, // header of login
  BodyContainer, // login body
  LoginRegisterContainer, // container of login box
  LoginRegisterButtonContainer, // button container
  LoginRegisterSwitchMsgContainer // switch button container
} from './style-components/Container';

function LoginForm () {
  const [email, setEmail] = React.useState(''); // user email
  const [password, setPassword] = React.useState(''); // user password
  const [validEmail, setValidEmail] = React.useState(false); // whether email is valid
  const [validPassword, setValidPassword] = React.useState(false); // whether password is valid
  const [warn, setWarn] = React.useState(false); // warning flag
  const [success, setSuccess] = React.useState(false); // login success flag
  const navigate = useNavigate(); // url history
  const previousPath = useLocation().state.pathname; // previosu pathname
  const previousSearch = useLocation().state.search; // previosu path search

  // send login request to server
  const login = async () => {
    // requested body
    const body = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    // send request
    const response = await fetch('https://comp6080-ass3-backend.up.railway.app/user/auth/login', body);

    if (response.status === 200) {
      // get user login information
      const data = await response.json();

      // successfull login
      // store token and email
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);

      // pop up success message
      setSuccess(true);

      // auto jump to home page if user not remove success message
      const autoJump = setTimeout(navigate, 1000, {
        pathname: previousPath,
        search: previousSearch
      });
      localStorage.setItem('timeout', autoJump);
    } else {
      // fail to login
      // pop up warning message
      setSuccess(false);
      setWarn(true);
    }
  }

  // check user input email and password
  const checkInput = () => {
    let pass = true;
    // email pattern
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    // check email format
    if (!email.match(pattern)) {
      setValidEmail(false);
      setWarn(true);
      pass = false;
    }

    // check password
    if (password === '') {
      setValidPassword(false);
      setWarn(true);
      pass = false;
    }

    return pass;
  }

  // render component
  return (
    <LoginRegisterContainer>
      {/* header */}
      <HeaderContainer onClick={() => { navigate('/') }}>
        Login
      </HeaderContainer>
      <BodyContainer>
        {/* warning message */}
        {
          warn && !validEmail && validPassword &&
          <Warn
            warnmsg="Invalid email"
          />
        }
        {
          warn && !validEmail && !validPassword &&
          <Warn
            warnmsg="Please input both valid email and password"
          />
        }
        {
          warn && validEmail && !validPassword &&
          <Warn
            warnmsg="Please input password"
          />
        }
        {
          warn && !success && validEmail && validPassword &&
          <Warn
            warnmsg="User does not exist or wrong password"
          />
        }
        {/* input field for email */}
        <InputField
          inputtype="text"
          title="Email"
          value={ email }
          setState={setEmail}
          warn={warn && !validEmail}
          setWarn={setWarn}
          hasInput={setValidEmail}
        />

        {/* input field for password */}
        <InputField
          inputtype="password"
          title="Password"
          value={ password }
          setState={setPassword}
          warn={warn && !validPassword}
          setWarn={setWarn}
          hasInput={setValidPassword}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (checkInput()) {
                login();
              } else {
                setWarn(true);
              }
            }
          }}
        />

        {/* login button */}
        <LoginRegisterButtonContainer>
          <Button
            name="login"
            type="submit"
            variant="contained"
            fullWidth
            onClick={() => {
              if (checkInput()) {
                login();
              } else {
                setWarn(true);
              }
            }}
          >
            Login
          </Button>
        </LoginRegisterButtonContainer>

        {/* register reminder */}
        <LoginRegisterSwitchMsgContainer>
          Does not have account yet?
        </LoginRegisterSwitchMsgContainer>

        {/* button jump to register page */}
        <LoginRegisterButtonContainer>
          <Button
            role=""
            variant="contained"
            fullWidth
            onClick={() => {
              navigate({
                pathname: '/register',
              }, {
                state: {
                  pathname: previousPath,
                  search: previousSearch
                }
              });
            }}
          >
            Sign Up
          </Button>
        </LoginRegisterButtonContainer>
      </BodyContainer>

      {/* successfull login message */}
      {
        success &&
        <PopUpMessage
          name="success"
          ariaLive="polite"
          msg={'Successfull login. Click to jump to home page'}
          setSuccess={() => {
            setSuccess(false);
            // jump to home page after click
            navigate({
              pathname: previousPath,
              search: previousSearch
            });
          }}
        />
      }
    </LoginRegisterContainer>
  );
}

export default LoginForm;
