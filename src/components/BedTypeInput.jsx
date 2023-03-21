import React from 'react'
import PropTypes from 'prop-types';

// styled components
// entire container
import { BedInfo } from './style-components/CreateListingComponent';
import {
  Counter, // entire counter container
  CounterTitle, // counter title
  CounterContainer, // counter container
  CounterButton, // counter button
} from './style-components/Counter';

// counter for bed type
function BedTypeInput ({ index, type, beds, bedsNum, detailBedsNum, setBedsNum, setDetailBedsNum, setBeds }) {
  return (
    <BedInfo>
      <Counter>
        <CounterTitle>
          {type[0].toUpperCase() + type.slice(1)}
        </CounterTitle>
        {/* decrease number of bed type */}
        <CounterContainer>
          {
            beds[index][type] !== 0 &&
            <CounterButton
              name={`${index === 0 ? 'public' : 'bedroom'}${index !== 0 && index}_${type}Minus`}
              onClick={() => {
                const temp = [...beds];
                --temp[index][type];
                --temp[index].number;
                setBeds(temp);
                setDetailBedsNum(detailBedsNum - 1);
                if (detailBedsNum === bedsNum) {
                  setBedsNum(bedsNum - 1);
                }
              }}
            >
              -
            </CounterButton>
          }
          {
            beds[index][type] === 0 && <CounterButton disabled>-</CounterButton>
          }
          {beds[index][type]}
          {/* increase number of bed type */}
          <CounterButton
            name={`${index === 0 ? 'public' : 'bedroom'}${index !== 0 && index}_${type}Add`}
            onClick={() => {
              const temp = [...beds];
              ++temp[index][type];
              ++temp[index].number;
              setBeds(temp);
              setDetailBedsNum(detailBedsNum + 1);
              if (detailBedsNum === bedsNum) {
                setBedsNum(bedsNum + 1);
              }
            }}
          >
            +
          </CounterButton>
        </CounterContainer>
      </Counter>
    </BedInfo>
  )
}

BedTypeInput.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
  beds: PropTypes.array,
  detailBedsNum: PropTypes.number,
  bedsNum: PropTypes.number,
  setBedsNum: PropTypes.func,
  setDetailBedsNum: PropTypes.func,
  setBeds: PropTypes.func,
}

export default BedTypeInput;
