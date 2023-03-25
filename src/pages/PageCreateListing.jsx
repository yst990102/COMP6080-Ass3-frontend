import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// body of the structure
import { Body } from '../components/style-components/Structure';
import TitleForm from '../components/TitleForm'; // title form
import AddressForm from '../components/AddressForm'; // address form
import TypeForm from '../components/TypeForm'; // property type form
// property information form
import PropertyInfoForm from '../components/PropertyInfoForm';
import AmenitieForm from '../components/AmenitieForm'; // amenitie form
import ThumbnailForm from '../components/ThumbnailForm' // thumbnail form
import PriceForm from '../components/PriceForm' // price form
import HeaderNav from '../components/HeaderNav'; // Header Navigator

// create a new listing
const PageCreateListing = () => {
  const [token, setToken] = React.useState(''); // user token
  const [submitSuccess, setSubmitSuccess] = React.useState(true); // success flag
  const [title, setTitle] = React.useState(''); // title
  const [address, setAddress] = React.useState({}); // address
  const [type, setType] = React.useState({}); // property type
  // property information
  const [propertyInfo, setPropertyInfo] = React.useState({});
  const [amenitie, setAmenitie] = React.useState([]); // amenitie
  const [price, setPrice] = React.useState(0); // price

  // thumbnails
  const [thumbnails, setThumbnails] = React.useState({
    cover: '',
    addition: []
  });

  const navigate = useNavigate(); // url history
  const location = useLocation(); // url location
  const form = useLocation().search.slice(1); // form need to be render

  // send create new listing request
  const submit = async () => {
    // request body
    const body = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        address,
        price,
        thumbnail: thumbnails.cover,
        metadata: {
          additiothumbnail: thumbnails.addition,
          type,
          propertyInfo,
          amenitie
        }
      })
    };

    const response = await fetch('https://comp6080-ass3-backend.onrender.com/listings/new', body);

    if (response.status === 200) {
      // successfull create
      navigate({
        pathname: '/mylistings',
        search: 'create_success'
      }, { state: true });
    } else {
      // fail to create new listing due to duplicate title
      setSubmitSuccess(false);
      navigate({
        pathname: '/mylistings/create',
        search: 'title'
      });
    }
  };

  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');

    // check whether user is login
    if (loggedInToken) {
      setToken(loggedInToken);
    } else {
      navigate({
        pathname: '/login',
      }, {
        state: {
          pathname: location.pathname,
          search: 'title'
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
        {/* render title form */}
        {
          form === 'title' &&
          <TitleForm
            title={title}
            setTitle={setTitle}
            submitSuccess={submitSuccess}
            setSubmitSuccess={setSubmitSuccess}
            path="create"
          />
        }
        {/* render address form */}
        {
          form === 'address' &&
          <AddressForm
            address={address}
            setAddress={setAddress}
            path="create"
          />
        }
        {/* render type form */}
        {
          form === 'type' &&
          <TypeForm
            type={type}
            setType={setType}
            path="create"
          />
        }
        {/* render property information form */}
        {
          form === 'propertyinfo' &&
          <PropertyInfoForm
            propertyInfo={propertyInfo}
            setPropertyInfo={setPropertyInfo}
            path="create"
          />
        }
        {/* render amenities form */}
        {
          form === 'amenities' &&
          <AmenitieForm
            amenitie={amenitie}
            setAmenitie={setAmenitie}
            path="create"
          />
        }
        {/* render thumbnail form */}
        {
          form === 'thumbnail' &&
          <ThumbnailForm
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            path="create"
          />
        }
        {/* render price form */}
        {
          form === 'price' &&
          <PriceForm
            price={price}
            setPrice={setPrice}
            submit={submit}
            path="create"
          />
        }
      </Body>
    </>
  );
}

export default PageCreateListing;
