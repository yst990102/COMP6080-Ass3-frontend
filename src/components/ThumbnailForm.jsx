import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Warn from './Warn'; // warn component
import ThumnailUpload from './ThumnailUpload' // thumbnail upload component

// styled components
// upload thumbnail container
import { UploadThumbnailContainer } from './style-components/Container'
import {
  CreateListContainer, // container for create listing
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  PreStepButton, // previosu button
  NextStepButton, // next button
  UpdateButton // update button
} from './style-components/CreateListingComponent';

// input new thumbnails for the listing
function ThumbnailForm ({ thumbnails, path, setThumbnails, update }) {
  const { id } = useParams(); // listing id
  const [warn, setWarn] = React.useState(false); // warn flag
  const navigate = useNavigate(); // url history

  return (
    <CreateListContainer>
      <Detail>
        {/* warn when not thumbnail is given */}
        {
          warn &&
          <Warn
            warnmsg="Please upload a photo for cover"
          />
        }
        <Step>
          Step 6
        </Step>

        {/* requested information */}
        <RequestInfo>
          Add photos
        </RequestInfo>
        <UploadThumbnailContainer>
          {/* upload for cover */}
          <ThumnailUpload
            type="cover"
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            setWarn={setWarn}
          />
          {/* upload for supplementary */}
          <ThumnailUpload
            type="addition"
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            setWarn={setWarn}
          />
        </UploadThumbnailContainer>
      </Detail>
      <CreateListContainerFooter>
        {/* get previous form */}
        <PreStepButton
          name="prev"
          onClick={() => {
            const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
            navigate({
              pathname,
              search: '?amenities'
            });
          }}
        >
          <NavigateBeforeIcon />
          Prev
        </PreStepButton>
        {/* update button for edit mode */}
        {
          path === 'edit' &&
          <UpdateButton name="update" onClick={() => update()}>
            Update
          </UpdateButton>
        }
        {/* get next form */}
        <NextStepButton
          name="next"
          onClick={() => {
            if (thumbnails.cover === '') {
              setWarn(true);
            } else {
              const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?price'
              });
            }
          }}>
          Next
          <NavigateNextIcon />
        </NextStepButton>
      </CreateListContainerFooter>
    </CreateListContainer>
  )
}

ThumbnailForm.propTypes = {
  path: PropTypes.string,
  thumbnails: PropTypes.object,
  setThumbnails: PropTypes.func,
  update: PropTypes.func
}

export default ThumbnailForm;
