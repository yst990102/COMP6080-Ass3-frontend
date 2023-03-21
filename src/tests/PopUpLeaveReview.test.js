import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import PopUpLeaveReview from '../components/PopUpLeaveReview';
import Rating from '@mui/material/Rating';
import { CloseButtonContainer } from '../components/style-components/PopUp';
import { Wrap } from '../components/style-components/SideBar'
import { CommentContainer } from '../components/style-components/Container'
import { PublishButton } from '../components/style-components/Listing';

describe('popup container for leaving reviews of a booking', () => {
  const noop = () => {};

  // close popup container
  it('close popup container', () => {
    const setPopUpLeaveReview = jest.fn();
    const popup = shallow(
      <PopUpLeaveReview
        listingId=""
        bookingId={0}
        setMessage={noop}
        setPopUpLeaveReview={setPopUpLeaveReview}
        setPopUpMessage={noop}
      />
    );

    // close by close button
    popup.find(CloseButtonContainer).simulate('click');
    expect(setPopUpLeaveReview).toBeCalledTimes(1);

    // close by wrapper
    popup.find(Wrap).simulate('click');
    expect(setPopUpLeaveReview).toBeCalledTimes(2);
  })

  // send empty review and check whether the warning is popup with given message
  it('warning message is set after set empty reviews', () => {
    const setMessage = jest.fn();
    const setPopUpMessage = jest.fn();

    const popup = shallow(
      <PopUpLeaveReview
        listingId=""
        bookingId={0}
        setMessage={setMessage}
        setPopUpLeaveReview={noop}
        setPopUpMessage={setPopUpMessage}
      />
    );

    // send message directly without input comment and rating
    popup.find(PublishButton).simulate('click');

    // expect warning message to be
    expect(setMessage).toHaveBeenCalledWith('Require fill in comment and rating');

    // expect warning is popup
    expect(setPopUpMessage).toHaveBeenCalledWith(true);
  })

  // send rating and empty comment and check whether the
  // warning is popup with given message
  it('warning message is set after set empty reviews', () => {
    const setMessage = jest.fn();
    const setPopUpMessage = jest.fn();
    const event = {
      target: {
        value: 'test'
      }
    }

    const popup = shallow(
      <PopUpLeaveReview
        listingId=""
        bookingId={0}
        setMessage={setMessage}
        setPopUpLeaveReview={noop}
        setPopUpMessage={setPopUpMessage}
      />
    );

    popup.find(CommentContainer).simulate('change', event);
    expect(popup.find(CommentContainer).props().value).toBe('test');

    // send message directly without input comment and rating
    popup.find(PublishButton).simulate('click');

    // expect warning message to be
    expect(setMessage).toHaveBeenCalledWith('Require fill in rating (at least one star)');

    // expect warning is popup
    expect(setPopUpMessage).toHaveBeenCalledWith(true);
  })

  // send comment and empty rating and check whether the
  // warning is popup with given message
  it('warning message is set after set empty reviews', () => {
    const setMessage = jest.fn();
    const setPopUpMessage = jest.fn();
    const event = {};

    const popup = shallow(
      <PopUpLeaveReview
        listingId=""
        bookingId={0}
        setMessage={setMessage}
        setPopUpLeaveReview={noop}
        setPopUpMessage={setPopUpMessage}
      />
    );

    popup.find(Rating).simulate('change', event, 1);
    expect(popup.find(Rating).props().value).toBe(1);

    // send message directly without input comment and rating
    popup.find(PublishButton).simulate('click');

    // expect warning message to be
    expect(setMessage).toHaveBeenCalledWith('Require fil in comment');

    // expect warning is popup
    expect(setPopUpMessage).toHaveBeenCalledWith(true);
  })
})
