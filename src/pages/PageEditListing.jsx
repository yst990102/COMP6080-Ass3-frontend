import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// body of the structure
import { Body } from '../components/style-components/Structure';
import TitleForm from '../components/TitleForm'; // title form
import AddressForm from '../components/AddressForm'; // address form
import TypeForm from '../components/TypeForm'; // property type form
// property information form
import PropertyInfoForm from '../components/PropertyInfoForm';
import AmenitieForm from '../components/AmenitieForm'; // amenitie form
import ThumbnailForm from '../components/ThumbnailForm'; // thumbnail form
import PriceForm from '../components/PriceForm'; // price form
import HeaderNav from '../components/HeaderNav'; // Header Navigator

// edit a exist listing
const PageEditListing = () => {
  const { id } = useParams(); // listing id
  const [token, setToken] = React.useState(''); // user token
  const [submitSuccess, setSubmitSuccess] = React.useState(true); // success flag
  const [title, setTitle] = React.useState(''); // title
  const [address, setAddress] = React.useState({}); // address
  const [type, setType] = React.useState({});// property type
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
  const form = useLocation().search.slice(1); // form need to be render
  const state = useLocation().state; // listing original information

  // setup all original information
  React.useEffect(() => {
    setTitle(state.title);
    setAddress(state.address);
    setType(state.metadata.type);
    setPropertyInfo(state.metadata.propertyInfo);
    setAmenitie(state.metadata.amenitie);
    setPrice(state.price);
    setThumbnails({
      cover: state.thumbnail,
      addition: [...state.metadata.additiothumbnail]
    })
  }, []);

  // send update listing request
  const update = async () => {
    // request body
    const body = {
      method: 'PUT',
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

    const response = await fetch(`https://comp6080-ass3-backend.onrender.com/listings/${id}`, body);

    if (response.status === 200) {
      // successfull update
      navigate({
        pathname: '/mylistings',
        search: 'edit_success'
      }, { state: true })
    } else {
      // fail to update listing due to duplicate title
      setSubmitSuccess(false);
      navigate({
        pathname: `/mylistings/edit/${id}`,
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
      navigate('/')
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
            path={'edit'}
            update={update}
          />
        }
        {/* render address form */}
        {
          form === 'address' &&
          <AddressForm
            address={address}
            setAddress={setAddress}
            path={'edit'}
            update={update}
          />
        }
        {/* render type form */}
        {
          form === 'type' &&
          <TypeForm
            type={type}
            setType={setType}
            path={'edit'}
            update={update}
          />
        }
        {/* render property information form */}
        {
          form === 'propertyinfo' &&
          <PropertyInfoForm
            propertyInfo={propertyInfo}
            setPropertyInfo={setPropertyInfo}
            path={'edit'}
            update={update}
          />
        }
        {/* render amenities form */}
        {
          form === 'amenities' &&
          <AmenitieForm
            amenitie={amenitie}
            setAmenitie={setAmenitie}
            path={'edit'}
            update={update}
          />
        }
        {/* render thumbnail form */}
        {
          form === 'thumbnail' &&
          <ThumbnailForm
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            path={'edit'}
            update={update}
          />
        }
        {/* render price form */}
        {
          form === 'price' &&
          <PriceForm
            price={price}
            setPrice={setPrice}
            submit={update}
            path={'edit'}
            update={update}
          />
        }
      </Body>
    </>
  );
}

export default PageEditListing;
