import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';

import Warn from './Warn' // warn component

// styled components
import {
  CreateListContainer, // container for create listing
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  Input, // input field
  PreStepButton, // previosu button
  NextStepButton, // next button
  InputContainer, // input container
  Unit, // unit container
} from './style-components/CreateListingComponent';

// input new price for the listing
function PriceForm ({ price, path, setPrice, submit, update }) {
  const { id } = useParams();
  const [warn, setWarn] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CreateListContainer>
        <Detail>
          {/* warn when no price input */}
          {
            warn &&
            <Warn
              warnmsg="Please set a proper price for this listing"
            />
          }
          <Step>
            Step 7
          </Step>

          {/* requested information */}
          <RequestInfo>
            Set Price (per night)
          </RequestInfo>

          {/* input field for price */}
          <InputContainer>
            <Unit>$</Unit>
            <Input
              name="price"
              warn={warn}
              type="number"
              placeholder="Price"
              value={price !== 0 ? price : ''}
              onChange={e => {
                const num = parseInt(e.target.value);
                if (!isNaN(num)) {
                  setPrice(num);
                  setWarn(false);
                } else {
                  setPrice(0)
                }
              }}
            />
          </InputContainer>
        </Detail>
        <CreateListContainerFooter>
          {/* get previous form */}
          <PreStepButton
            name="prev"
            onClick={() => {
              const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?thumbnail'
              });
            }}
          >
            <NavigateBeforeIcon />
            Prev
          </PreStepButton>
          {/* submit button when in creating mode */}
          {
            path === 'create' &&
            <NextStepButton
              name="submit"
              onClick={() => {
                if (price > 0) {
                  submit();
                } else {
                  setWarn(true);
                }
              }}
            >
              Submit
              <ArrowUpwardTwoToneIcon />
            </NextStepButton>
          }
          {/* update button for edit mode */}
          {
            path === 'edit' &&
            <NextStepButton
              name="update"
              onClick={() => update()}
            >
              Update
            </NextStepButton>
          }
        </CreateListContainerFooter>
      </CreateListContainer>
    </>
  )
}

PriceForm.propTypes = {
  path: PropTypes.string,
  price: PropTypes.number,
  setPrice: PropTypes.func,
  submit: PropTypes.func,
  update: PropTypes.func
}

export default PriceForm;
