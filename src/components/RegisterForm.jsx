import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import InputField from './InputField'; // input field for email/password
import Warn from './Warn'; // warning component
import PopUpMessage from './PopUpMessage'; // notification component

// import styled components
import {
  BodyContainer, // login body
  HeaderContainer, // header of login
  LoginRegisterContainer, // container of login box
  LoginRegisterButtonContainer, // button container
  LoginRegisterSwitchMsgContainer // switch button container
} from './style-components/Container';

let timeoutId = null;

function RegisterForm () {
  const [name, setName] = React.useState(''); // user name
  const [email, setEmail] = React.useState(''); // user email
  const [password, setPassword] = React.useState(''); // user password
  const [confirm, setConfirm] = React.useState(''); // user confirm password

  // whether name is valid
  const [validName, setValidName] = React.useState(false);
  // whether email is valid
  const [validEmail, setValidEmail] = React.useState(false);
  // whether password is valid
  const [validPassword, setValidPassword] = React.useState(false);
  // whether confirm password is valid
  const [validConfirm, setValidConfirm] = React.useState(false);
  const [warn, setWarn] = React.useState(false); // warn flag
  const [success, setSuccess] = React.useState(false); // register success flag
  const navigate = useNavigate(); // url history
  const previousPath = useLocation().state.pathname;
  const previousSearch = useLocation().state.search;

  // send register request to server
  const register = async () => {
    // requested body
    const body = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    };

    const response = await fetch('https://comp6080-ass3-backend.up.railway.app/user/auth/register', body);

    if (response.status === 200) {
      // get user login information
      const data = await response.json();

      // successfull register
      // store token and email
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);

      // pop up success message
      setSuccess(true);

      // auto jump to previous page if user not remove success message
      const autoJump = setTimeout(navigate, 1000, {
        pathname: previousPath,
        search: previousSearch
      });
      localStorage.setItem('timeout', autoJump);
    } else {
      // fail to register
      // pop up warning message
      setSuccess(false);
      setWarn(true);
    }
  }

  // check user input information
  const checkInput = () => {
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let pass = true;

    // check email format
    if (!email.match(pattern)) {
      setValidEmail(false);
      setWarn(true);
      pass = false;
    }

    // check password
    if (name === '') {
      setValidName(false);
      setWarn(true);
      pass = false;
    }

    // check password format
    if (password.length < 8 || password.length > 12) {
      setValidPassword(false);
      setWarn(true);
      pass = false;
    }

    // check whether two password are the same
    if (password !== confirm) {
      setValidConfirm(false);
      setWarn(true);
      pass = false;
    }

    return pass;
  }

  const setPasswordNotSame = () => {
    setWarn(true);
    setValidConfirm(false);
  }

  React.useEffect(() => {
    if (password !== '' && confirm !== '') {
      if (password !== confirm) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(setPasswordNotSame, 500);
      } else if (password === confirm) {
        clearTimeout(timeoutId);
        setWarn(false);
        setValidConfirm(true);
      }
    }
  }, [password, confirm])

  // render component
  return (
    <LoginRegisterContainer>
      {/* header */}
      <HeaderContainer onClick={() => { navigate('/') }}>
        Register
      </HeaderContainer>
      <BodyContainer>
        {/* warning message */}
        {
          warn && !validEmail && validPassword && validName &&
          <Warn
            warnmsg="Invalid email"
          />
        }
        {
          warn && !validPassword && validEmail && validName &&
          <Warn
            warnmsg="The length of password must between 8 and 12 characters"
          />
        }
        {
          warn && !validConfirm && validEmail && validName && validPassword &&
          <Warn
            warnmsg="Two input passwords are not the same"
          />
        }
        {
          warn && !validEmail && !validPassword && validName && !validConfirm &&
          <Warn
            warnmsg="Please input both valid email and password"
          />
        }
        {
          warn && validEmail && validPassword && validPassword && !validName &&
          <Warn
            warnmsg="Please input a username"
          />
        }
        {
          warn && !validEmail && !validPassword && !validName && !validConfirm &&
          <Warn
            warnmsg="Please input all information"
          />
        }
        {
          warn && !success && validPassword && validName && validConfirm &&
          <Warn
            warnmsg="User already exist"
          />
        }
        {/* input field for name */}
        <InputField
          inputtype="text"
          title="Name"
          value={ name }
          setState={ setName }
          setWarn={setWarn}
          warn={warn && !validName}
          hasInput={setValidName}
        />

        {/* input field for email */}
        <InputField
          inputtype="text"
          title="Email"
          value={ email }
          setState={ setEmail }
          setWarn={setWarn}
          warn={warn && !validEmail}
          hasInput={setValidEmail}
        />

        {/* input field for password */}
        <InputField
          inputtype="password"
          title="Password"
          value={password}
          setState={setPassword}
          setWarn={setWarn}
          warn={warn && !validPassword}
          hasInput={setValidPassword}
        />

        {/* input field for confirm password */}
        <InputField
          name="confirm"
          inputtype="password"
          title="Confirm Password"
          value={confirm}
          setState={setConfirm}
          setWarn={setWarn}
          warn={warn && !validConfirm}
          hasInput={setValidConfirm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (checkInput()) {
                register();
              } else {
                setWarn(true);
              }
            }
          }}
        />

        {/* register button */}
        <LoginRegisterButtonContainer>
          <Button
            name="register"
            fullWidth
            variant="contained"
            onClick={() => {
              if (checkInput()) {
                register();
              } else {
                setWarn(true);
              }
            }}
          >
            Register
          </Button>
        </LoginRegisterButtonContainer>

        {/* login reminder */}
        <LoginRegisterSwitchMsgContainer>
          Already got an account?
        </LoginRegisterSwitchMsgContainer>

        {/* button jump to login page */}
        <LoginRegisterButtonContainer>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              navigate({
                pathname: '/login',
              }, {
                state: {
                  pathname: previousPath,
                  search: previousSearch
                }
              })
            }}
          >
            Sign In
          </Button>
        </LoginRegisterButtonContainer>
      </BodyContainer>

      {/* successfull login message */}
      {
        success &&
        <PopUpMessage
          name="success"
          ariaLive="polite"
          msg="Successful register. Click to jump to home page"
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

export default RegisterForm;
