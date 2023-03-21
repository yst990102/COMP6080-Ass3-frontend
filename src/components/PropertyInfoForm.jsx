import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Warn from './Warn'; // warn component
import BedListItem from './BedListItem'; // bed list item

// import styled components
import {
  CreateListContainer, // container for create listing
  Detail, // request detail container
  CreateListContainerFooter, // page footer
  Step, // step container
  RequestInfo, // request information container
  PreStepButton, // previosu button
  NextStepButton, // next button
  BedroomInfoContainer, // bedroom information container
  UpdateButton // update button
} from './style-components/CreateListingComponent';

import {
  Counter, // entire counter container
  CounterTitle, // counter title
  CounterContainer, // counter container
  CounterButton, // counter button
} from './style-components/Counter';

// input new room/bed information for the listing
function PropertyInfoForm ({ propertyInfo, path, setPropertyInfo, update }) {
  const { id } = useParams(); // listing id
  // bed information
  const bedInfo = {
    number: 0,
    single: 0,
    double: 0,
    queen: 0,
    king: 0
  };

  // number of bedroom
  const [bedroomNum, setBedroomNum] = React.useState(propertyInfo.bedroomNum || 0);
  // number of bathroom
  const [bathroomNum, setBathroomNum] = React.useState(propertyInfo.bathroomNum || 0);
  // number of beds
  const [bedsNum, setBedsNum] = React.useState(propertyInfo.bedsNum || 0);
  // beds information
  const [beds, setBeds] = React.useState(propertyInfo.beds || [bedInfo]);
  // bed has set flag
  const [bedDetailsSet, setBedDetailsSet] = React.useState([false]);
  // detail beds type number
  const [detailBedsNum, setDetailBedsNum] = React.useState(propertyInfo.bedsNum || 0);
  // warn bedroom flag
  const [warnBedroomNum, setWarnBedroomNum] = React.useState(false);
  // warn bathroom flag
  const [warnBathroomNum, setWarnBathroomNum] = React.useState(false);
  // warn bed flag
  const [warnBedsNum, setWarnBedsNum] = React.useState(false);

  const navigate = useNavigate(); // url history

  // set detail of bed
  const setDetail = (index) => {
    const temp = [...bedDetailsSet];
    temp[index] = !temp[index];
    setBedDetailsSet(temp);
  };

  return (
    <CreateListContainer>
      <Detail>
        {/* warn when not all information are input */}
        {
          (warnBedroomNum || warnBathroomNum || warnBedsNum) &&
          <Warn
            warnmsg="Please enter all required numbers"
          />
        }
        <Step>
          Step 4
        </Step>

        {/* requested information */}
        <RequestInfo>
          Information of your property
        </RequestInfo>
        {/* counter for bedroom number */}
        <Counter>
          <CounterTitle
            warn={warnBedroomNum && bedroomNum === 0}
          >
            Bedroom
          </CounterTitle>
          {/* decrease number of bedroom */}
          <CounterContainer>
            {
              bedroomNum !== 0 &&
              <CounterButton
                name="bedroomMinus"
                onClick={() => {
                  setBeds(beds.slice(0, bedroomNum));
                  setBedroomNum(bedroomNum - 1);
                }}
              >
                -
              </CounterButton>
            }
            {
              bedroomNum === 0 && <CounterButton disabled>-</CounterButton>
            }
            {bedroomNum}
            {/* increase number of bedroom */}
            <CounterButton
              name="bedroomAdd"
              onClick={() => {
                const newBedInfo = {
                  number: 0,
                  single: 0,
                  double: 0,
                  queen: 0,
                  king: 0
                };
                setBedroomNum(bedroomNum + 1);
                setBeds([...beds, newBedInfo]);
                setWarnBedroomNum(false);
              }}
            >
              +
            </CounterButton>
          </CounterContainer>
        </Counter>
        <Counter>
          <CounterTitle
            warn={warnBedsNum && bedsNum === 0}
          >
            Beds
          </CounterTitle>
          {/* decrease number of bed */}
          <CounterContainer>
            {
              bedsNum !== 0 &&
              <CounterButton
                name="bedMinus"
                onClick={() => {
                  setBedsNum(bedsNum - 1);
                }}
              >
                -
              </CounterButton>
            }
            {
              bedsNum === 0 && <CounterButton disabled>-</CounterButton>
            }
            {bedsNum}
            {/* increase number of bed */}
            <CounterButton
              name="bedAdd"
              onClick={() => {
                setBedsNum(bedsNum + 1);
                setWarnBedsNum(false);
              }}
            >
              +
            </CounterButton>
          </CounterContainer>
        </Counter>
        <Counter>
          <CounterTitle
            warn={warnBathroomNum && bathroomNum === 0}
          >
            Bathroom
          </CounterTitle>
          {/* decrease number of bathroom */}
          <CounterContainer>
            {
              bathroomNum !== 0 &&
              <CounterButton
                name="bathroomMinus"
                onClick={() => setBathroomNum(bathroomNum - 1)}
              >
                -
              </CounterButton>
            }
            {
              bathroomNum === 0 && <CounterButton disabled>-</CounterButton>
            }
            {bathroomNum}
            {/* decrease number of bathroom */}
            <CounterButton
              name="bathroomAdd"
              onClick={() => {
                setBathroomNum(bathroomNum + 1);
                setWarnBathroomNum(false);
              }}
            >
              +
            </CounterButton>
          </CounterContainer>
        </Counter>

        {/* bed information in each room */}
        <BedroomInfoContainer>
          {
            beds.map((item, index) => {
              return (
                <BedListItem
                  key={`${index}`}
                  index={index}
                  beds={beds}
                  bedsNum={bedsNum}
                  detailBedsNum={detailBedsNum}
                  setBedsNum={setBedsNum}
                  setBeds={setBeds}
                  bedDetailsSet={bedDetailsSet}
                  setDetail={setDetail}
                  setDetailBedsNum={setDetailBedsNum}
                />
              );
            })
          }
        </BedroomInfoContainer>
      </Detail>
      <CreateListContainerFooter>
        {/* get previous form */}
        <PreStepButton
          name="prev"
          onClick={() => {
            const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;
            navigate({
              pathname,
              search: '?type'
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
              setPropertyInfo({
                bedroomNum,
                bathroomNum,
                bedsNum,
                beds
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
            if (bedroomNum !== 0 && bathroomNum !== 0) {
              const pathname = path === 'edit' ? `/mylistings/${path}/${id}` : `/mylistings/${path}`;

              // store room information
              setPropertyInfo({
                bedroomNum,
                bathroomNum,
                bedsNum,
                beds
              });
              navigate({
                pathname,
                search: '?amenities'
              });
            } else {
              // information not complete
              // set warn message
              if (bedroomNum === 0) {
                setWarnBedroomNum(true);
              }

              if (bathroomNum === 0) {
                setWarnBathroomNum(true);
              }

              if (bedsNum === 0) {
                setWarnBedsNum(true);
              }
            }
          }}>
          Next
          <NavigateNextIcon />
        </NextStepButton>
      </CreateListContainerFooter>
    </CreateListContainer>
  )
}

PropertyInfoForm.propTypes = {
  propertyInfo: PropTypes.object,
  path: PropTypes.string,
  setPropertyInfo: PropTypes.func,
  update: PropTypes.func,
}

export default PropertyInfoForm;
