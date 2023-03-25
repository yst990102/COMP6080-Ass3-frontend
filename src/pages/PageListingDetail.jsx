import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';

// body of the structure
import { Body } from '../components/style-components/Structure';
// all information container
import { ListingInfoContainer } from '../components/style-components/Container';

import {
  ViewListingTitle, // listing title
  ViewListingEvaluate, // listing evaluation container
  ListingItemContainer, // listing inforamtion container
  ViewListingAddress, // address container
  ViewListingPrice, // price container
  ViewListingType, // type container
  Type, // details container
  TypeContent, // detail item container
  ViewListingRoomInfo, // room information container
  ViewListingAmenitieContainer, // amenitie container
  ViewListingAmenitie, // amenitie details
  ViewListingAmenitieItem, // amenitie item
  ShowMoreButton, // show more button
  ViewListingReview, // reivews container
  ListingBookContainer, // booking container
  BookingButton, // booking button
} from '../components/style-components/Listing'

import ThumbnailCarousel from '../components/ThumbnailCarousel'; // display thumbnail
import PopUpInfo from '../components/PopUpInfo'; // popup information
import PopUpBooking from '../components/PopUpBooking'; // popup booking
import PopUpMessage from '../components/PopUpMessage'; // popup message
import PopUpStatus from '../components/PopUpStatus'; // popup status
import PopUpReviews from '../components/PopUpReviews'; // popup all review
import PopUpLeaveReview from '../components/PopUpLeaveReview'; // popup leave review
import UserReview from '../components/UserReview'; // user review container
import HeaderNav from '../components/HeaderNav'; // Header Navigator

// displaying all the information of a specific listing
const PageListingDetail = () => {
  const { id } = useParams(); // listing id
  const [token, setToken] = React.useState(''); // user tokoen
  const [listing, setListing] = React.useState({}); // listing information
  const [load, setLoad] = React.useState(false); // load flag
  const [popUp, setPopUp] = React.useState(false); // popup flag
  const [status, setStatus] = React.useState(false); // popup status flag
  const [book, setBook] = React.useState(false); // popup booking flag
  // popup message flag
  const [popUpMessage, setPopUpMessage] = React.useState(false);
  // popup leave review flag
  const [popUpReviews, setPopUpReviews] = React.useState(false);
  const [popUpLeaveReview, setPopUpLeaveReview] = React.useState(false);
  const [bookingId, setBookingId] = React.useState(''); // booking id
  const [message, setMessage] = React.useState(''); // notification
  const address = listing.address; // address
  const day = useLocation().state || 1; // number of days

  // get information of listing
  const loadInfo = async () => {
    // request body
    const body = {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    };

    const response = await fetch(`https://comp6080-ass3-backend.onrender.com/listings/${id}`, body);

    // store listing information
    if (response.status === 200) {
      const data = (await response.json()).listing;
      const numReviews = data.reviews.length;
      let rate = 0;

      // get rate
      for (const review of data.reviews) {
        rate += review.rate;
      }

      if (numReviews) {
        rate /= numReviews
      }
      data.rate = rate;

      // store listing
      setListing(data);

      // premission to display on screen
      setLoad(true);
    }
  }

  // action after page load
  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');

    if (loggedInToken) {
      setToken(loggedInToken);
    }

    if (popUpLeaveReview === false) {
      // load all information
      loadInfo();
    }
  }, [popUpLeaveReview]);

  // render component
  return (
    <>
      <HeaderNav
        token={token}
        setToken={setToken}
      />
      <Body>
        <ListingInfoContainer>
          {/* display thumbnails */}
          <ThumbnailCarousel
            cover={listing.thumbnail}
            addition={(load && listing.metadata.additiothumbnail) || []}
          />
          {/* listing title */}
          <ViewListingTitle>
            {listing.title}
          </ViewListingTitle>
          {/* listing evaluation */}
          <ViewListingEvaluate>
            {/* rating */}
            <ListingItemContainer color="#FFD700">
              <StarRateIcon />
            </ListingItemContainer>
            <ListingItemContainer>
              {load && listing.rate.toFixed(1)}
            </ListingItemContainer>
            <ListingItemContainer>
              &nbsp;
            </ListingItemContainer>

            {/* number of review */}
            <ListingItemContainer>
              <TextsmsOutlinedIcon />
            </ListingItemContainer>
            <ListingItemContainer>
              {load && listing.reviews.length}
            </ListingItemContainer>
          </ViewListingEvaluate>

          {/* listing address */}
          <ViewListingAddress>
            {load && `${address.street}, ${address.city}, ${address.state}`}
          </ViewListingAddress>

          {/* listing price base on number of day */}
          <ViewListingPrice>
            $
            {
              load && (listing.price * day)
            }
            {
              load && day === 1 && '/night'
            }
            {
              load && day > 1 && ` (${day} days)`
            }
          </ViewListingPrice>

          {/* listing type */}
          <ViewListingType>
            <h3>Property Type</h3>
            {
              load &&
              <>
                {/* property type */}
                <Type>
                  <TypeContent>
                    <HomeOutlinedIcon
                      id="propertyType"
                      aria-label="property type"
                      fontSize="large"
                    />
                  </TypeContent>
                  <TypeContent aria-labelledby="propertyType">
                    {listing.metadata.type.propertyType}
                  </TypeContent>
                </Type>
                {/* lease type */}
                <Type>
                  <TypeContent>
                    <VpnKeyOutlinedIcon
                      id="leaseType"
                      aria-label="lease type"
                      fontSize="large"
                    />
                  </TypeContent>
                  <TypeContent aria-labelledby="leaseType">
                    {listing.metadata.type.leaseType}
                  </TypeContent>
                </Type>
              </>
            }
          </ViewListingType>

          {/* listing rooms/beds information */}
          <ViewListingRoomInfo>
            <h3>Room information</h3>
            {
              load &&
              <>
                {/* number of bedrooms */}
                <Type>
                  <TypeContent>
                    <BedroomChildOutlinedIcon
                      id="bedroomNum"
                      aria-label="Number of bedroom"
                      fontSize="large"
                    />
                  </TypeContent>
                  <TypeContent aria-labelledby="bedroomNum">
                    {listing.metadata.propertyInfo.bedroomNum}
                  </TypeContent>
                </Type>

                {/* number of bathrooms */}
                <Type>
                  <TypeContent>
                    <BathroomOutlinedIcon
                      id="bathroomNum"
                      aria-label="Number of bathroom"
                      fontSize="large"
                    />
                  </TypeContent>
                  <TypeContent aria-labelledby="bathroomNum">
                    {listing.metadata.propertyInfo.bathroomNum}
                  </TypeContent>
                </Type>

                {/* number of beds */}
                <Type>
                  <TypeContent>
                    <BedOutlinedIcon
                      id="bedNum"
                      aria-label="Number of beds"
                      fontSize="large"
                    />
                  </TypeContent>
                  <TypeContent aria-labelledby="bedNum">
                    {listing.metadata.propertyInfo.bedsNum}
                  </TypeContent>
                </Type>
              </>
            }
          </ViewListingRoomInfo>

          {/* listing amenitie information */}
          <ViewListingAmenitieContainer>
            <h3>Amenitie</h3>

            {/* show only first 4 amenitie */}
            <ViewListingAmenitie>
              {
                load &&
                listing.metadata.amenitie.map((item, index) => {
                  if (index <= 4) {
                    return (
                      <ViewListingAmenitieItem
                        key={index}
                      >
                        {item}
                      </ViewListingAmenitieItem>
                    );
                  }
                  return <React.Fragment key={index}></React.Fragment>
                })
              }
            </ViewListingAmenitie>
            {/* show more button for more amenitie */}
            {
              load && listing.metadata.amenitie.length > 4 &&
              <ShowMoreButton
                onClick={() => setPopUp(true)}
                aria-controls="moreAmenitie"
                aria-expanded={false}
                aria-haspopup="listbox"
              >
                Show All
              </ShowMoreButton>
            }
          </ViewListingAmenitieContainer>
          <div>
            {/* show only first 4 reviews */}
            <ViewListingReview>
              {
                load && listing.reviews.map((item, index) => {
                  if (index < 4) {
                    return (
                      <UserReview
                        item={item}
                        key={`review_${index}`}
                      />
                    );
                  }
                  return <React.Fragment key={index}></React.Fragment>
                })
              }
            </ViewListingReview>
            {/* show more button for more reviews */}
            {
              load && listing.reviews.length > 4 &&
              <ShowMoreButton
                onClick={() => setPopUpReviews(true)}
                aria-controls="moreReviews"
                aria-expanded={false}
                aria-haspopup="listbox"
              >
                Show All
              </ShowMoreButton>
            }
          </div>
        </ListingInfoContainer>
        {/* page footer */}
        <ListingBookContainer>
          {/* view all status of bookings */}
          <BookingButton
            onClick={() => setStatus(true)}
            aria-controls={`status${id}`}
            aria-expanded={false}
            aria-haspopup="listbox"
          >
            Status
          </BookingButton>
          {/* book listing */}
          <BookingButton
            name="booking"
            onClick={() => setBook(true)}
            aria-controls={`book${id}`}
            aria-expanded={false}
            aria-haspopup="form"
          >
            Book
          </BookingButton>
        </ListingBookContainer>
        {/* popup amenities list */}
        {
          popUp &&
          <PopUpInfo
            amenitie={listing.metadata.amenitie}
            setPopUp={setPopUp}
            role="listbox"
            id="moreAmenitie"
          />
        }
        {/* popup reviews list */}
        {
          popUpReviews &&
          <PopUpReviews
            reviews={listing.reviews}
            setPopUpReviews={setPopUpReviews}
            role="listbox"
            id="moreReviews"
          />
        }
        {/* popup booking status list */}
        {
          status &&
          <PopUpStatus
            id={id}
            setStatus={setStatus}
            setBookingId={setBookingId}
            setPopUpLeaveReview={setPopUpLeaveReview}
            role="listbox"
          />
        }
        {/* popup booking */}
        {
          book &&
          <PopUpBooking
            id={id}
            price={listing.price}
            setBook={setBook}
            setPopUpMessage={setPopUpMessage}
            setMessage={setMessage}
            role="form"
          />
        }
        {/* popup leave review */}
        {
          popUpLeaveReview &&
          <PopUpLeaveReview
            listingId={id}
            bookingId={bookingId}
            setPopUpLeaveReview={setPopUpLeaveReview}
            setPopUpMessage={setPopUpMessage}
            setMessage={setMessage}
          />
        }
        {/* popup notification */}
        {
          popUpMessage &&
          <PopUpMessage
            msg={message}
            setSuccess={setPopUpMessage}
          />
        }
      </Body>
    </>
  );
}

export default PageListingDetail;
