import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// import styled components
import {
  SearchField, // search container
  MainSearch, // search bar for name/city search
  AuxiliarySearch, // conditional search container
  SearchContainer, // search filed container
  ListingSearch, // search filed
  ClearButton, // clear input button
  SearchButton, // search button
  SearchFilterContainer, // condition search container
  InputContainer, // input field container
  Input, // input field
  ClearFilterButton, // clear condition button
  SortButton // sort by rate button
} from '../components/style-components/Search';

function Search ({ listings, displayListings, setDay, setDisplayListings }) {
  // toggle flag for conditional search
  const [toggle, setToggle] = React.useState(false);
  // input search text
  const [searchText, setSearchText] = React.useState('');
  // number of bedrrom
  const [bedroomsNum, setBedroomsNum] = React.useState(['', '']);
  const [price, setPrice] = React.useState(['', '']); // price
  const [date, setDate] = React.useState(['', '']); // date range
  const [order, setOrder] = React.useState(1); // display order

  // check whether specific condition is set
  const isSet = (item) => {
    return item[0] !== '' || item[1] !== '';
  }

  // check whether a listing satisfy the condition
  const passCheck = (listing, pattern, bedroom, datems) => {
    const title = listing.title.toLowerCase(); // nomalize listing's title
    const city = listing.address.city.toLowerCase(); // normalize listing's city
    // number of bedrrom of listing
    const listingBedroomNum = listing.metadata.propertyInfo.bedroomNum;
    let pass = true;

    // not match search text
    if (searchText !== '' && (title !== pattern && city !== pattern)) {
      pass = false;
    }

    // not match number of bedroom
    if (isSet(bedroom) && (listingBedroomNum < bedroom[0] || listingBedroomNum > bedroom[1])) {
      pass = false;
    }

    // not match price
    if (isSet(price) && (listing.price < price[0] || listing.price > price[1])) {
      pass = false;
    }

    // check availability
    let isAvailable = !isSet(date);

    if (isSet(date)) {
      for (const availability of listing.availability) {
        // normalize listing availability date
        const ms = [Date.parse(availability.start), Date.parse(availability.end)]

        // match availability
        if (datems[0] >= ms[0] && datems[1] <= ms[1]) {
          // match day range
          isAvailable = true;
          break;
        } else if (datems[0] >= ms[0] && isNaN(datems[1])) {
          // match start day and end day is not provided
          isAvailable = true;
          break;
        } else if (isNaN(datems[0]) && datems[1] <= ms[1]) {
          // match end day and start day is not provided
          isAvailable = true;
          break;
        }
      }
    }

    // get number of days of search range
    const numDay = (datems[1] - datems[0]) / (1000 * 60 * 60 * 24);

    // set number of days
    if (setDay) {
      setDay(numDay || 1);
    }

    return pass && isAvailable && (!isSet(date) || date[0] !== date[1]);
  }

  // sort display listings
  const sort = () => {
    const tempListings = [...displayListings];
    tempListings.sort((a, b) => {
      return order * (a.rate - b.rate);
    })
    setOrder(-1 * order);
    setDisplayListings(tempListings);
  }

  // search listings
  const search = () => {
    const pattern = searchText.toLowerCase(); // normalize search text
    const displayListings = []; // display listigns list
    const bedroom = [...bedroomsNum]; // range of number of bedrooms
    const prices = [...price]; // range of price
    const datems = [...date]; // range of date

    // reverse input numbers of bedroom if user input in order
    if (bedroom[0] > bedroom[1]) {
      bedroom.reverse();
      setBedroomsNum(bedroom);
    }

    // reverse input prices if user input in order
    if (prices[0] > prices[1]) {
      prices.reverse();
      setBedroomsNum(prices);
    }

    // normalize input date
    datems[0] = Date.parse(datems[0]);
    datems[1] = Date.parse(datems[1]);

    // check all listing
    for (const listing of listings) {
      if (passCheck(listing, pattern, bedroom, datems)) {
        displayListings.push(listing);
      }
    }

    // reset search component
    setToggle(false);
    setDate(['', '']);

    // display listings
    setDisplayListings(displayListings);
  }

  // render component
  return (
    <SearchField>
      <MainSearch>
        {/* filter button */}
        <SearchButton
          onClick={() => setToggle(!toggle)}
          aria-label="show more search option"
        >
          <FilterAltIcon />
        </SearchButton>

        {/* input area */}
        <SearchContainer>
          <SearchIcon />
          <ListingSearch
            onChange={e => {
              setSearchText(e.target.value);
              if (e.target.value === '') {
                setDisplayListings(listings);
              }
            }}
            value={searchText}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                search();
              }
            }}
          />
          {/* clear input button */}
          <ClearButton
            aria-label="clear search text and display all listings"
            onClick={(e) => {
              setSearchText('');
              setDisplayListings(listings);
            }}
          >
            <ClearIcon fontSize="small" />
          </ClearButton>
        </SearchContainer>
        {/* search button */}
        <SearchButton
          onClick={() => search()}
        >
          <SearchIcon />
        </SearchButton>
      </MainSearch>
      {/* show more condition for search */}
      {
        toggle &&
        <AuxiliarySearch>
          {/* order button */}
          <SearchFilterContainer>
            {
              order === 1 &&
              <>
                <SortButton
                  onClick={() => sort()}
                  id="sortButton"
                  aria-label="sort listing by rate in decreasing order"
                >
                  Rate
                  <ArrowDownwardIcon />
                </SortButton>
              </>
            }
            {
              order === -1 &&
              <>
                <SortButton
                  onClick={() => sort()}
                  id="sortButton"
                  aria-label="sort listing by rate in increaseing order"
                >
                  Rate
                  <ArrowUpwardIcon />
                </SortButton>
              </>
            }
          </SearchFilterContainer>
          {/* bedroom search */}
          <SearchFilterContainer>
            Bedrooms:
            <div>
              {/* bedroom range begin */}
              <InputContainer>
                <Input
                  onChange={e => {
                    if (!isNaN(e.target.value) || e.target.value === '') {
                      const temp = [...bedroomsNum];
                      temp[0] = parseInt(e.target.value) || '';
                      setBedroomsNum(temp);
                    }
                  }}
                  value={bedroomsNum[0]}
                  id="bedroomstart"
                  aria-label="input number of bedroom range start"
                />
              </InputContainer>
              &nbsp;-&nbsp;
              {/* bedroom range end */}
              <InputContainer>
                <Input
                  onChange={e => {
                    if (!isNaN(e.target.value) || e.target.value === '') {
                      const temp = [...bedroomsNum];
                      temp[1] = parseInt(e.target.value) || '';
                      setBedroomsNum(temp);
                    }
                  }}
                  value={bedroomsNum[1]}
                  id="bedroomend"
                  aria-label="input number of bedroom range end"
                />
              </InputContainer>
              {/* clear input range of number of bedroom */}
              <ClearFilterButton
                onClick={() => setBedroomsNum(['', ''])}
                aria-controls="bedroomstart bedroomend"
              >
                Clear
              </ClearFilterButton>
            </div>
          </SearchFilterContainer>
          {/* price condition */}
          <SearchFilterContainer>
            Price:
            <div>
              {/* price range begin */}
              <InputContainer>
                $
                <Input
                  onChange={e => {
                    if (!isNaN(e.target.value) || e.target.value === '') {
                      const temp = [...price];
                      temp[0] = parseInt(e.target.value) || '';
                      setPrice(temp);
                    }
                  }}
                  value={price[0]}
                  id="pricestart"
                  aria-label="input price range start"
                />
              </InputContainer>
              &nbsp;-&nbsp;
              {/* price range end */}
              <InputContainer>
                $
                <Input
                  onChange={e => {
                    if (!isNaN(e.target.value) || e.target.value === '') {
                      const temp = [...price];
                      temp[1] = parseInt(e.target.value) || '';
                      setPrice(temp);
                    }
                  }}
                  value={price[1]}
                  id="priceend"
                  aria-label="input price range end"
                />
              </InputContainer>
              {/* clear input range of price */}
              <ClearFilterButton
                onClick={() => setPrice(['', ''])}
                aria-controls="pricestart priceend"
              >
                Clear
              </ClearFilterButton>
            </div>
          </SearchFilterContainer>
          {/* date range start search */}
          <SearchFilterContainer>
            From:
            <input
              type="date"
              value={date[0]}
              onChange={e => {
                const range = [...date];
                range[0] = e.target.value
                setDate(range);
              }}
            />
          </SearchFilterContainer>
          {/* date range end search */}
          <SearchFilterContainer>
            To:
            <input
              type="date"
              value={date[1]}
              onChange={e => {
                const range = [...date];
                range[1] = e.target.value
                setDate(range);
              }}
            />
          </SearchFilterContainer>
        </AuxiliarySearch>
      }
    </SearchField>
  )
}

Search.propTypes = {
  listings: PropTypes.array,
  displayListings: PropTypes.array,
  setDay: PropTypes.func,
  setDisplayListings: PropTypes.func,
};

export default Search;
