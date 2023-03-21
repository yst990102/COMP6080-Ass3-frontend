import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Warn from './Warn' // warn component

// styled components
import {
  CreateListContainer, // container for create listing
  Title, // title container
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  Input, // input field
  InputContainer, // input container
  NextStepButton, // next button
  UpdateButton // update button
} from './style-components/CreateListingComponent';

// input new title for the listing
function TitleForm ({ title, path, submitSuccess, setTitle, setSubmitSuccess, update }) {
  const { id } = useParams(); // listing id
  // title too length flag
  const [tooLong, setTooLong] = React.useState(false);
  const [warn, setWarn] = React.useState(!submitSuccess); // warn flag
  const navigate = useNavigate(); // url history

  return (
    <>
      <CreateListContainer>
        <Title>
          Hi, <br />
          let&apos;s start your rental tour~
        </Title>
        <Detail>
          {/* warn for wrong format */}
          {
            warn && !tooLong && title === '' &&
            <Warn
              warnmsg="Please enter a title"
            />
          }
          {
            tooLong &&
            <Warn
              warnmsg="Title has more than 20 character"
            />
          }
          {/* warn title has been used for other listing */}
          {
            !submitSuccess &&
            <Warn
              warnmsg="Title already been used"
            />
          }
          <Step>
            Step 1
          </Step>

          {/* requested information */}
          <RequestInfo>
            Give a title for this listing
          </RequestInfo>
          <InputContainer
            warn={warn}
          >
            {/* input field for title */}
            <Input
              name="title"
              value={title}
              onChange={e => {
                if (e.target.value.length > 20) {
                  setTooLong(true);
                } else {
                  setTooLong(false);
                }
                setWarn(false);
                setTitle(e.target.value)
              }}
              placeholder="Title (in 20 character)"
            />
          </InputContainer>
        </Detail>
        <CreateListContainerFooter>
          {/* update button for edit mode */}
          {
            path === 'edit' &&
            <UpdateButton
              name="update"
              onClick={() => update()}
            >
              Update
            </UpdateButton>
          }
          {/* get next form */}
          <NextStepButton
            name="next"
            onClick={() => {
              if (title !== '' && title.length <= 20) {
                const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
                navigate({
                  pathname,
                  search: '?address'
                });
              } else {
                setWarn(true);
              }
            }}
          >
            Next
            <NavigateNextIcon />
          </NextStepButton>
        </CreateListContainerFooter>
      </CreateListContainer>
    </>
  )
}

TitleForm.propTypes = {
  title: PropTypes.string,
  submitSuccess: PropTypes.bool,
  path: PropTypes.string,
  setTitle: PropTypes.func,
  setSubmitSuccess: PropTypes.func,
  update: PropTypes.func
}

export default TitleForm;
