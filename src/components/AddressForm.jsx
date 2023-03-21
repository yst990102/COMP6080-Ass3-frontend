import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputField from './InputField'; // input field component
import Warn from './Warn'; // warn component

// styled components
// select container
import { SelectContainer } from './style-components/Container';
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

// input new address for the listing
function AddressForm ({ address, path, setAddress, update }) {
  const { id } = useParams(); // listing id
  const [warn, setWarn] = React.useState(false); // warn flag
  // street of listing
  const [street, setStreet] = React.useState(address.street || '');
  // city of listing
  const [city, setCity] = React.useState(address.city || '');
  // state of listing
  const [state, setState] = React.useState(address.state || '');
  // postcode of listing
  const [postcode, setPostcode] = React.useState(address.postcode || '');
  // country of listing
  const [country, setCountry] = React.useState(address.country || 'Australia');
  const navigate = useNavigate(); // url history

  // street set flag
  const [hasSetStreet, setHasSetStreet] = React.useState(address.street && address.street !== '');
  // city set flag
  const [hasSetCity, setHasSetCity] = React.useState(address.city && address.city !== '');
  // state set flag
  const [hasSetState, setHasSetState] = React.useState(address.state && address.state !== '');
  // postcode set flag
  const [hasSetPostcode, setHasSetPostcode] = React.useState(address.postcode && address.postcode !== '');

  // check whether all information is filled
  const checkInput = () => {
    return hasSetStreet && hasSetCity && hasSetState && hasSetPostcode;
  }

  return (
    <>
      <CreateListContainer>
        <Detail>
          {/* warn when not all information are input */}
          {
            warn &&
            <Warn
              warnmsg="Please enter all information"
            />
          }
          <Step>
            Step 2
          </Step>

          {/* requested information */}
          <RequestInfo>
            Where is the property?
          </RequestInfo>
          {/* input field for street */}
          <InputField
            inputtype="text"
            title={'Street'}
            value={street}
            setState={setStreet}
            setWarn={setWarn}
            warn={warn && !hasSetStreet}
            hasInput={setHasSetStreet}
          />
          {/* input field for city */}
          <InputField
            inputtype="text"
            title={'City'}
            value={city}
            setState={setCity}
            setWarn={setWarn}
            warn={warn && !hasSetCity}
            hasInput={setHasSetCity}
          />
          {/* input field for state */}
          <InputField
            inputtype="text"
            title={'State'}
            value={state}
            setState={setState}
            setWarn={setWarn}
            warn={warn && !hasSetState}
            hasInput={setHasSetState}
          />
          {/* input field for postcode */}
          <InputField
            inputtype="text"
            title={'Postcode'}
            value={postcode}
            setState={setPostcode}
            setWarn={setWarn}
            warn={warn && !hasSetPostcode}
            hasInput={setHasSetPostcode}
          />
          {/* input field for country */}
          <SelectContainer>
            <FormControl fullWidth>
              <InputLabel fontSize="20px">Country</InputLabel>
              <Select
                labelId="countrySelectLabel"
                id="countrySelect"
                value={'Australia'}
                label="Country"
                autoWidth
                onChange={e => setCountry(e.target.value)}
              >
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="America">America</MenuItem>
                <MenuItem value="China">China</MenuItem>
              </Select>
            </FormControl>
          </SelectContainer>
        </Detail>
        <CreateListContainerFooter>
          {/* get previous form */}
          <PreStepButton
            name="prev"
            onClick={() => {
              const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?title'
              });
            }}
          >
            <NavigateBeforeIcon />
            Prev
          </PreStepButton>
          {/* update button for edit mode */}
          {
            path === 'edit' &&
            <UpdateButton
              name="update"
              onClick={() => {
                setAddress({
                  street,
                  city,
                  state,
                  postcode,
                  country
                });
                update();
              }}
            >
              Update
            </UpdateButton>
          }
          {/* get next form */}
          <NextStepButton
            name="next"
            onClick={() => {
              if (checkInput()) {
                const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
                navigate({
                  pathname,
                  search: '?type'
                });

                // store address information
                setAddress({
                  street,
                  city,
                  state,
                  postcode,
                  country
                });
              } else {
                setWarn(true);
              }
            }}>
            Next
            <NavigateNextIcon />
          </NextStepButton>
        </CreateListContainerFooter>
      </CreateListContainer>
    </>
  )
}

AddressForm.propTypes = {
  path: PropTypes.string,
  address: PropTypes.object,
  setAddress: PropTypes.func,
  update: PropTypes.func,
}

export default AddressForm;
