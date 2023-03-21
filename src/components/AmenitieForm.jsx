import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// styled components
import {
  CreateListContainer, // container for create listing
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  PreStepButton, // previosu button
  NextStepButton, // next button
  UpdateButton, // update button
  CheckboxContainer, // checkbox container
  CheckboxTermContainer, // checkbox information container
  CheckboxTerm, // checkbox main information container
  CheckboxTermExplain // checkbox explaination container
} from './style-components/CreateListingComponent';

// input new amenitie for the listing
function AmenitieForm ({ amenitie, path, setAmenitie, update }) {
  const { id } = useParams(); // listing id
  const navigate = useNavigate(); // url history

  // record whether an option is selected
  const check = (value) => {
    if (amenitie.indexOf(value) !== -1) {
      return true;
    }
    return false;
  };

  // store check
  const addCheck = (value) => {
    const index = amenitie.indexOf(value);
    if (index === -1) {
      setAmenitie([...amenitie, value])
    } else {
      const temp = [...amenitie];
      temp.splice(index, 1);
      setAmenitie(temp);
    }
  }

  return (
    <CreateListContainer>
      <Detail>
        <Step>
          Step 5
        </Step>
        {/* requested information */}
        <RequestInfo>
          What amenities are provided?
        </RequestInfo>

        {/* options for amenitie */}
        <CheckboxContainer>
          <FormGroup>
            {/* daily necessities */}
            <FormControlLabel
              control={
                <Checkbox
                  name="daily"
                  checked={check('Daily necessities')}
                />
              }
              label={
                <CheckboxTermContainer>
                  <CheckboxTerm>Daily necessities</CheckboxTerm>
                  <CheckboxTermExplain>sheet, pillow, towel, tissue, etc</CheckboxTermExplain>
                </CheckboxTermContainer>
              }
              onChange={() => addCheck('Daily necessities')}
            />

            {/* cooking supplies */}
            <FormControlLabel
              control={
                <Checkbox
                  name="cooking"
                  checked={check('Cooking supplies')}
                />
              }
              label={
                <CheckboxTermContainer>
                  <CheckboxTerm>Cooking supplies</CheckboxTerm>
                  <CheckboxTermExplain>cutter, pot, condiments, etc</CheckboxTermExplain>
                </CheckboxTermContainer>
              }
              onChange={() => addCheck('Cooking supplies')}
            />

            {/* working area */}
            <FormControlLabel
              control={
                <Checkbox
                  name="workingArea"
                  checked={check('Working area')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Working area</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Working area')}
            />

            {/* wifi */}
            <FormControlLabel
              control={
                <Checkbox
                  name="wifi"
                  checked={check('Wifi')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Wifi</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Wifi')}
            />

            {/* television */}
            <FormControlLabel
              control={
                <Checkbox
                  name="tv"
                  checked={check('Television')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Television</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Television')}
            />

            {/* air conditioner */}
            <FormControlLabel
              control={
                <Checkbox
                  name="airConditioner"
                  checked={check('Air-conditioner')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Air-conditioner</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Air-conditioner')}
            />

            {/* coat hanger */}
            <FormControlLabel
              control={
                <Checkbox
                  name="coatHanger"
                  checked={check('Coat hanger')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Coat hanger</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Coat hanger')}
            />

            {/* clothes dryer */}
            <FormControlLabel
              control={
                <Checkbox
                  name="clothDryer"
                  checked={check('Clothes dryer')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Clothes dryer</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Clothes dryer')}
            />

            {/* heating */}
            <FormControlLabel
              control={
                <Checkbox
                  name="heating"
                  checked={check('Heating')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Heating</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Heating')}
            />

            {/* hair dryer */}
            <FormControlLabel
              control={
                <Checkbox
                  name="hairDryer"
                  checked={check('Hair dryer')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Hair dryer</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Hair dryer')}
            />

            {/* shampoo */}
            <FormControlLabel
              control={
                <Checkbox
                  name="shampoo"
                  checked={check('Shampoo')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Shampoo</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Shampoo')}
            />

            {/* fitness facility */}
            <FormControlLabel
              control={
                <Checkbox
                  name="fitness"
                  checked={check('Fitness facility')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Fitness facility</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Fitness facility')}
            />

            {/* parking */}
            <FormControlLabel
              control={
                <Checkbox
                  name="parking"
                  checked={check('Parking')}
                />
              }
              label={
                <>
                  <CheckboxTerm>Parking</CheckboxTerm>
                </>
              }
              onChange={() => addCheck('Parking')}
            />
          </FormGroup>
        </CheckboxContainer>
      </Detail>
      <CreateListContainerFooter>
        {/* get previous form */}
        <PreStepButton
          name="prev"
          onClick={() => {
            const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
            navigate({
              pathname,
              search: '?propertyinfo'
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
            const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
            navigate({
              pathname,
              search: '?thumbnail'
            });
          }}>
          Next
          <NavigateNextIcon />
        </NextStepButton>
      </CreateListContainerFooter>
    </CreateListContainer>
  )
}

AmenitieForm.propTypes = {
  path: PropTypes.string,
  amenitie: PropTypes.array,
  setAmenitie: PropTypes.func,
  update: PropTypes.func
}

export default AmenitieForm;
