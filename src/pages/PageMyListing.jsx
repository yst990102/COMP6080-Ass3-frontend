import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// body of the structure
import { Body } from '../components/style-components/Structure';
import {
  ListingHeader, // listing header
  ListingCreateButton, // create listing button
  AllListing // all listing container
} from '../components/style-components/Listing';

import MyListingItem from '../components/MyListingItem'; // listing item
import PopUpDate from '../components/PopUpDateContainer'; // popup date form
import PopUpMessage from '../components/PopUpMessage'; // popup notification
import Search from '../components/Search'; // search component
import HeaderNav from '../components/HeaderNav'; // Header Navigator

// all user listing display in this page
const PageMyListing = () => {
  const urlParam = useLocation().search.slice(1); // url parameter
  const paraLength = urlParam.length; // url parameter length
  // pop up date form flag
  const [popUpDate, setPopUpDate] = React.useState(false);
  const [listingInfo, setListingInfo] = React.useState({}); // listings information
  const [token, setToken] = React.useState(''); // user token
  const [listing, setListing] = React.useState([]); // listings
  // pattern of current path
  const [pattern, setPattern] = React.useState(urlParam.slice(0, paraLength - 8) || '');
  // success flag
  const [success, setSuccess] = React.useState(useLocation().state);
  // displayed listings
  const [displayListings, setDisplayListings] = React.useState([]);

  const navigate = useNavigate(); // url history
  const location = useLocation(); // url location

  // clear prvious router state
  React.useEffect(() => {
    window.history.replaceState({}, '');
  }, [])

  // get all user's listing
  const getOwnListing = async (email) => {
    const body = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch('http://google.hongkong.styuan990102.top:5005/listings', body);
    if (response.status === 200) {
      const data = await response.json();
      const myListings = []; // user listings
      const id = []; // listing ids
      // request body
      const detailBody = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }

      // get all user listings
      for (const listing of data.listings) {
        if (listing.owner === email) {
          id.push(listing.id);
          myListings.push(fetch(`http://google.hongkong.styuan990102.top:5005/listings/${listing.id}`, detailBody));
        }
      }

      const detailListingsJson = await Promise.all(myListings);
      const detailListings = [];
      const numListing = detailListingsJson.length;

      // get listing details
      for (let i = 0; i < numListing; ++i) {
        const listing = await detailListingsJson[i].json();
        listing.listing.id = id[i];
        detailListings.push(listing.listing);
      }

      // store listings
      setListing(detailListings);
      setDisplayListings(detailListings);
    }
  }

  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');

    // setup page
    if (loggedInToken) {
      setToken(loggedInToken);
      getOwnListing(email);
    } else {
      // return to login page
      navigate({
        pathname: '/login',
      }, {
        state: {
          pathname: location.pathname,
          search: location.search
        }
      })
    }
  }, []);

  return (
    <>
      <HeaderNav
        token={token}
        setToken={setToken}
      />
      <Body>
        <ListingHeader>
          {/* search component for searching */}
          <Search
            listings={listing}
            displayListings={displayListings}
            setDisplayListings={setDisplayListings}
          />
        </ListingHeader>
        {/* display all listings own by user */}
        <AllListing>
          {
            displayListings.map((item, index) => {
              return <MyListingItem
                token={token}
                listingInfo={item}
                key={`${index}-${item.published}`}
                index={index}
                displayListings={displayListings}
                setListingInfo={setListingInfo}
                setListing={setListing}
                setDisplayListings={setDisplayListings}
                setPopUpDate={setPopUpDate}
                setSuccess={setSuccess}
                setPattern={setPattern}
              />
            })
          }
        </AllListing>
        {/* popup date input field for availability */}
        {
          popUpDate &&
          <PopUpDate
            token={token}
            listingInfo={listingInfo}
            listing={listing}
            setListing={setListing}
            setPopUpDate={setPopUpDate}
            setSuccess={setSuccess}
          />
        }
        {/* popup success notification */}
        {
          success &&
          <PopUpMessage
            msg={`Successful ${pattern}`}
            setSuccess={setSuccess}
          />
        }
        {/* create new listing button */}
        <ListingCreateButton
          name="newListing"
          onClick={() => navigate({
            pathname: '/mylistings/create',
            search: '?title'
          })}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </ListingCreateButton>
      </Body>
    </>
  );
}

export default PageMyListing;
