import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HouseIcon from '@mui/icons-material/House';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import ChairIcon from '@mui/icons-material/Chair';

import Warn from './Warn'; // warn component

// styled components
import {
  RadioContainer, // input radio container
  Explain // explain container
} from './style-components/Container';

import {
  CreateListContainer, // create listing container style
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  PreStepButton, // previosu button
  NextStepButton, // next button
  UpdateButton // update button
} from './style-components/CreateListingComponent';

import {
  RadioLabel, // radio label
  SelectedRadioLabel, // selected radio label
  DetailRadioLabel, // deatil raido label
  SelectedDetailRadioLabel, // selected deatil raido label
  RadioTitle // radio title
} from './style-components/Form';

// input new type for the listing
function TypeForm ({ type, setType, path, update }) {
  const { id } = useParams(); // listing id
  const [canUpdate, setCanUpdate] = React.useState(false);
  const [propertyType, setPropertyType] = React.useState(type.propertyType || '');
  const [leaseType, setLeaseType] = React.useState(type.leaseType || '');
  const navigate = useNavigate();

  const [hasSetPropertyType, setHasSetPropertyType] = React.useState(propertyType !== '');
  const [hasSetLeaseType, setHasSetLeaseType] = React.useState(leaseType !== '');
  const [warn, setWarn] = React.useState(false);

  React.useEffect(() => {
    if (canUpdate) {
      update();
    }
  }, [canUpdate]);

  return (
    <>
      <CreateListContainer>
        <Detail>
          {/* warn when not all information are input */}
          {
            warn &&
            <Warn
              warnmsg="Please select property type"
            />
          }
          <Step>
            Step 3
          </Step>

          {/* requested information */}
          <RequestInfo>
            What kind of property are you looking to rent?
          </RequestInfo>
          <Explain>Property Type</Explain>

          {/* radio selection of property type */}
          <RadioContainer>
            {/* property type of flat */}
            {
              (
                propertyType === 'Flat' &&
                <SelectedRadioLabel>Flat</SelectedRadioLabel>
              ) || (
                propertyType !== 'Flat' &&
                <RadioLabel
                  name='flat'
                  htmlFor='Flat'
                  onClick={() => {
                    setPropertyType('Flat');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  Flat
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="Flat" id="Flat" hidden />

            {/* property type of house */}
            {
              (
                propertyType === 'House' &&
                <SelectedRadioLabel>House</SelectedRadioLabel>
              ) || (
                propertyType !== 'House' &&
                <RadioLabel
                  name='house'
                  htmlFor='House'
                  onClick={() => {
                    setPropertyType('House');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  House
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="House" id="House" hidden />

            {/* property type of villa */}
            {
              (
                propertyType === 'Villa' &&
                <SelectedRadioLabel>Villa</SelectedRadioLabel>
              ) || (
                propertyType !== 'Villa' &&
                <RadioLabel
                  name='villa'
                  htmlFor='Villa'
                  onClick={() => {
                    setPropertyType('Villa');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  Villa
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="Villa" id="Villa" hidden />

            {/* property type of loft */}
            {
              (
                propertyType === 'Loft' &&
                <SelectedRadioLabel>Loft</SelectedRadioLabel>
              ) || (
                propertyType !== 'Loft' &&
                <RadioLabel
                  name='loft'
                  htmlFor='Loft'
                  onClick={() => {
                    setPropertyType('Loft');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  Loft
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="Loft" id="Loft" hidden />

            {/* property type of batch */}
            {
              (
                propertyType === 'Batch' &&
                <SelectedRadioLabel>Batch</SelectedRadioLabel>
              ) || (
                propertyType !== 'Batch' &&
                <RadioLabel
                  name='batch'
                  htmlFor='Batch'
                  onClick={() => {
                    setPropertyType('Batch');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  Batch
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="Batch" id="Batch" hidden />

            {/* property type of cabin */}
            {
              (
                propertyType === 'Cabin' &&
                <SelectedRadioLabel>Cabin</SelectedRadioLabel>
              ) || (
                propertyType !== 'Cabin' &&
                <RadioLabel
                  name='cabin'
                  htmlFor='Cabin'
                  onClick={() => {
                    setPropertyType('Cabin');
                    setHasSetPropertyType(true);
                    setWarn(false);
                  }}
                >
                  Cabin
                </RadioLabel>
              )
            }
            <input type="radio" name="propertyType" value="Cabin" id="Cabin" hidden />
          </RadioContainer>

          <Explain>Lease type</Explain>
          <RadioContainer>
            {/* lease type of entire */}
            {
              (
                leaseType === 'entire' &&
                <SelectedDetailRadioLabel>
                  <HouseIcon />
                  <RadioTitle>Entire property</RadioTitle>
                  <div>
                    Entire property, no need to share with others.
                  </div>
                </SelectedDetailRadioLabel>
              ) || (
                leaseType !== 'entire' &&
                <DetailRadioLabel
                  name='entire'
                  htmlFor='entire'
                  onClick={() => {
                    setLeaseType('entire');
                    setHasSetLeaseType(true);
                    setWarn(false);
                  }}
                >
                  <HouseIcon />
                  <RadioTitle>Entire property</RadioTitle>
                  <div>
                    Entire property, no need to share with others.
                  </div>
                </DetailRadioLabel>
              )
            }
            <input type="radio" name="leaseType" value="entire" id="entire" hidden />

            {/* lease type of independent */}
            {
              (
                leaseType === 'independent' &&
                <SelectedDetailRadioLabel>
                  <SensorDoorIcon />
                  <RadioTitle>Independent room</RadioTitle>
                  <div>
                    Independent room, share facilities and public room with others.
                  </div>
                </SelectedDetailRadioLabel>
              ) || (
                leaseType !== 'independent' &&
                <DetailRadioLabel
                  name='independent'
                  htmlFor='independent'
                  onClick={() => {
                    setLeaseType('independent');
                    setHasSetLeaseType(true);
                    setWarn(false);
                  }}
                >
                  <SensorDoorIcon />
                  <RadioTitle>Independent room</RadioTitle>
                  <div>
                    Independent room, share facilities and public room with others.
                  </div>
                </DetailRadioLabel>
              )
            }
            <input type="radio" name="leaseType" value="entire" id="entire" hidden />

            {/* lease type of share */}
            {
              (
                leaseType === 'share' &&
                <SelectedDetailRadioLabel>
                  <ChairIcon />
                  <RadioTitle>Share room</RadioTitle>
                  <div>
                    Room that share with others.
                  </div>
                </SelectedDetailRadioLabel>
              ) || (
                leaseType !== 'share' &&
                <DetailRadioLabel
                  name='share'
                  htmlFor='share'
                  onClick={() => {
                    setLeaseType('share');
                    setHasSetLeaseType(true);
                    setWarn(false);
                  }}
                >
                  <ChairIcon />
                  <RadioTitle>Share property</RadioTitle>
                  <div>
                    Room that share with others.
                  </div>
                </DetailRadioLabel>
              )
            }
            <input type="radio" name="leaseType" value="entire" id="entire" hidden />
          </RadioContainer>
        </Detail>
        <CreateListContainerFooter>
          {/* get previous form */}
          <PreStepButton
            name="prev"
            onClick={() => {
              const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?address'
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
                setType({
                  propertyType,
                  leaseType
                });
                setCanUpdate(true);
              }}
            >
              Update
            </UpdateButton>
          }
          {/* get next form */}
          <NextStepButton
            name="next"
            onClick={() => {
              if (hasSetPropertyType && hasSetLeaseType) {
                const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
                navigate({
                  pathname,
                  search: '?propertyinfo'
                });

                // store property information
                setType({
                  propertyType,
                  leaseType
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

TypeForm.propTypes = {
  path: PropTypes.string,
  type: PropTypes.object,
  setType: PropTypes.func,
  update: PropTypes.func
}

export default TypeForm;
