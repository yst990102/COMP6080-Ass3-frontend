import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';
import ThumbnailCarousel from '../components/ThumbnailCarousel';
import {
  Thumbnail,
  PreviousButton,
  NextButton,
  ShiftLeftCenter,
  ShiftLeftRight,
  ShiftRightCenter,
  ShiftRightLeft,
} from '../components/style-components/Thumbnail';

describe('carousel displaying all uploaded thumbnail', () => {
  const cover = 'test.jpg';
  const addition = ['1.jpg', '2.jpg', '3.jpg'];

  // test cover thumbnail is displyaed first before clicking previous/next button
  it('cover thumbnail is displayed first after loading', () => {
    const carousel = shallow(
      <ThumbnailCarousel
        cover={cover}
        addition={addition}
      />
    );

    // cover thumbnail is displayed
    expect(carousel.find(Thumbnail).exists()).toBeTruthy();
    expect(carousel.find(Thumbnail).props().src).toBe(cover);

    // carousel thumbnails are not exist before clicking previous or next button
    expect(carousel.find(ShiftLeftCenter).exists()).toBeFalsy();
    expect(carousel.find(ShiftLeftRight).exists()).toBeFalsy();
    expect(carousel.find(ShiftRightCenter).exists()).toBeFalsy();
    expect(carousel.find(ShiftRightLeft).exists()).toBeFalsy();
  })

  // test previous thumbnail is displayed
  it('shift carousel to left/previous thumbnail', () => {
    const carousel = shallow(
      <ThumbnailCarousel
        cover={cover}
        addition={addition}
      />
    );

    // shift left carousel
    carousel.find(PreviousButton).simulate('click');

    // shift cover thumnail away from display
    expect(carousel.find(ShiftRightCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightCenter).props().src).toBe(cover);

    // display last thumnail in addtion array
    expect(carousel.find(ShiftRightLeft).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightLeft).props().src).toBe(addition[2]);

    // cover thumbnail container is not exist
    expect(carousel.find(Thumbnail).exists()).toBeFalsy();

    // carousel thumbnails are not exist before clicking previous or next button
    expect(carousel.find(ShiftLeftCenter).exists()).toBeFalsy();
    expect(carousel.find(ShiftLeftRight).exists()).toBeFalsy();
  })

  // test next thumbnail is displayed
  it('shift carousel to right/next thumbnail', () => {
    const carousel = shallow(
      <ThumbnailCarousel
        cover={cover}
        addition={addition}
      />
    );

    // shift left carousel
    carousel.find(NextButton).simulate('click');

    // shift cover thumnail away from display
    expect(carousel.find(ShiftLeftCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftCenter).props().src).toBe(cover);

    // display first thumnail in addtion array
    expect(carousel.find(ShiftLeftRight).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftRight).props().src).toBe(addition[0]);

    // cover thumbnail container is not exist
    expect(carousel.find(Thumbnail).exists()).toBeFalsy();

    // carousel thumbnails are not exist before clicking previous or next button
    expect(carousel.find(ShiftRightCenter).exists()).toBeFalsy();
    expect(carousel.find(ShiftRightCenter).exists()).toBeFalsy();
  })

  // test continuously shift to left thumbnails
  it('continuously shift thumbnails', () => {
    const carousel = shallow(
      <ThumbnailCarousel
        cover={cover}
        addition={addition}
      />
    );

    // first click
    // shift left carousel
    carousel.find(PreviousButton).simulate('click');

    // shift displayed thumnail away from display
    expect(carousel.find(ShiftRightCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightCenter).props().src).toBe(cover);

    // display previous thumnail in addtion array
    expect(carousel.find(ShiftRightLeft).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightLeft).props().src).toBe(addition[2]);

    // second click
    carousel.find(PreviousButton).simulate('click');

    // shift displayed thumnail away from display
    expect(carousel.find(ShiftRightCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightCenter).props().src).toBe(addition[2]);

    // display previous thumnail in addtion array
    expect(carousel.find(ShiftRightLeft).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightLeft).props().src).toBe(addition[1]);

    // thrid click
    carousel.find(PreviousButton).simulate('click');

    // shift displayed thumnail away from display
    expect(carousel.find(ShiftRightCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightCenter).props().src).toBe(addition[1]);

    // display previous thumnail in addtion array
    expect(carousel.find(ShiftRightLeft).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightLeft).props().src).toBe(addition[0]);

    // fourth click
    carousel.find(PreviousButton).simulate('click');

    // shift displayed thumnail away from display
    expect(carousel.find(ShiftRightCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightCenter).props().src).toBe(addition[0]);

    // display previous thumnail in addtion array
    expect(carousel.find(ShiftRightLeft).exists()).toBeTruthy();
    expect(carousel.find(ShiftRightLeft).props().src).toBe(cover);
  })

  // test continuously shift to right thumbnails
  it('continuously shift thumbnails', () => {
    const carousel = shallow(
      <ThumbnailCarousel
        cover={cover}
        addition={addition}
      />
    );

    // first click
    // shift left carousel
    carousel.find(NextButton).simulate('click');

    // shift cover thumnail away from display
    expect(carousel.find(ShiftLeftCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftCenter).props().src).toBe(cover);

    // display first thumnail in addtion array
    expect(carousel.find(ShiftLeftRight).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftRight).props().src).toBe(addition[0]);

    // second click
    carousel.find(NextButton).simulate('click');
    // shift displayed thumnail away from display
    expect(carousel.find(ShiftLeftCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftCenter).props().src).toBe(addition[0]);

    // display next thumnail in addtion array
    expect(carousel.find(ShiftLeftRight).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftRight).props().src).toBe(addition[1]);

    // third click
    carousel.find(NextButton).simulate('click');
    // shift displayed thumnail away from display
    expect(carousel.find(ShiftLeftCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftCenter).props().src).toBe(addition[1]);

    // display next thumnail in addtion array
    expect(carousel.find(ShiftLeftRight).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftRight).props().src).toBe(addition[2]);

    // last click
    carousel.find(NextButton).simulate('click');
    // shift displayed thumnail away from display
    expect(carousel.find(ShiftLeftCenter).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftCenter).props().src).toBe(addition[2]);

    // display next thumnail in addtion array
    expect(carousel.find(ShiftLeftRight).exists()).toBeTruthy();
    expect(carousel.find(ShiftLeftRight).props().src).toBe(cover);
  })
})
