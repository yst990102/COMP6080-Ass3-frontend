import React from 'react';
import PropTypes from 'prop-types';

import BedTypeInput from './BedTypeInput'; // type counter

// styled components
import {
  BedroomInfo, // entire container
  BedroomInfoTitleContainer, // title container
  BedroomInfoTitle, // title
  BedInfoButton, // inforamtion button
  BedInfoContainer, // information container
} from './style-components/CreateListingComponent';

// display bed list
function BedListItem ({
  index, beds, bedsNum, detailBedsNum, bedDetailsSet,
  setBeds, setBedsNum, setDetailBedsNum, setDetail
}) {
  return (
    <BedroomInfo>
      <BedroomInfoTitleContainer>
        {/* room title */}
        {
          index === 0 && <BedroomInfoTitle>Public space</BedroomInfoTitle>
        }
        {
          index !== 0 && <BedroomInfoTitle>Bedroom {index}</BedroomInfoTitle>
        }

        {/* number of beds in room */}
        {
          beds[index].number <= 1 && <div>{beds[index].number} bed</div>
        }
        {
          beds[index].number > 1 && <div>{beds[index].number} beds</div>
        }
        {/* show all bed detail */}
        {
          !bedDetailsSet[index] &&
          <BedInfoButton
            name={`${index === 0 ? 'public' : 'bedroom'}${index !== 0 && index}`}
            onClick={() => setDetail(index)}
            aria-controls={`bedDetail${index}`}
            aria-expanded={false}
            aria-haspopup="listbox"
          >
            Add
          </BedInfoButton>
        }
        {/* hide all bed detail */}
        {
          bedDetailsSet[index] &&
          <BedInfoButton
            onClick={() => setDetail(index)}
            aria-controls={`bedDetail${index}`}
            aria-expanded={true}
            aria-haspopup="listbox"
          >
            Hide
          </BedInfoButton>
        }
      </BedroomInfoTitleContainer>
      {
        bedDetailsSet[index] &&
        <BedInfoContainer id={`bedDetail${index}`}>
          {/* type of single counter */}
          <BedTypeInput
            index={index}
            type="single"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of double counter */}
          <BedTypeInput
            index={index}
            type="double"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of queen counter */}
          <BedTypeInput
            index={index}
            type="queen"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of king counter */}
          <BedTypeInput
            index={index}
            type="king"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
        </BedInfoContainer>
      }
    </BedroomInfo>
  );
}

BedListItem.propTypes = {
  index: PropTypes.number,
  beds: PropTypes.array,
  bedsNum: PropTypes.number,
  detailBedsNum: PropTypes.number,
  bedDetailsSet: PropTypes.array,
  setBeds: PropTypes.func,
  setBedsNum: PropTypes.func,
  setDetailBedsNum: PropTypes.func,
  setDetail: PropTypes.func,
}

export default BedListItem;
