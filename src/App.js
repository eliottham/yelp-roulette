import React, { useEffect, useState } from 'react';
import Dropdown from './components/Dropdown';
import Location from './components/Location';
import Business from './components/Business';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import allYelpCategories from './allYelpCategories.json';
import axios from 'axios';

const API_KEY =
  'p6QFhqOuDbzeTZRNSoRTLIpYm1bKoOxdIfbTISdfL-bJlfXKWTsvrvR007Ze-HoBzI43hojC5qZAsmgx7mxBM_uME4yBpKNdVCbfv_cvJTeVOurePLm3d7oKEs9KYHYx';
const CORS_ANYWHERE = 'https://damp-temple-31483.herokuapp.com/';
const yelpREST = axios.create({
  baseURL: `${CORS_ANYWHERE}https://api.yelp.com/v3`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-type': 'application/json',
  },
});
const BUSINESS_SEARCH_ENDPOINT = 'businesses/search';

const categories = {
  active: {
    value: 'active',
    label: 'Activity',
    subcategories: [
      {
        value: 'all',
        label: 'All',
      },
    ],
  },
  food: {
    value: 'food',
    label: 'Food',
    subcategories: [
      {
        value: 'all',
        label: 'All',
      },
    ],
  },
  restaurants: {
    value: 'restaurants',
    label: 'Restaurants',
    subcategories: [
      {
        value: 'all',
        label: 'All',
      },
    ],
  },
};

// value is in meters (40000 is the max ~25 miles)
const radiusOptions = [
  {
    value: 8050,
    label: '5 miles',
  },
  {
    value: 16100,
    label: '10 miles',
  },
  {
    value: 40000,
    label: '25 miles',
  },
];

const getSubcategories = () => {
  for (const category of allYelpCategories) {
    for (const parent of category.parents) {
      if (categories[parent]) {
        categories[parent].subcategories.push({
          value: category.alias,
          label: category.title,
        });
      }
    }
  }
};

const useStyles = makeStyles((theme) => ({
  parameters: {
    display: 'flex',
    margin: '50px auto',
    justifyContent: 'center',
    width: '60%',
  },
  priceFilter: {
    height: 'fit-content',
    margin: theme.spacing(2),
  },
  searchButton: {
    height: 'fit-content',
    margin: theme.spacing(2),
  },
}));

const App = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState([]);
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [price, setPrice] = useState('');
  const [business, setBusiness] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    getSubcategories();
  }, []);

  const handleSubcategoryChange = (e) => {
    const subcategoryLength = e.target.value.length;
    if (
      subcategoryLength === 0 ||
      (subcategoryLength > 0 && e.target.value[subcategoryLength - 1] === 'all')
    ) {
      setSubcategory(['all']);
    } else {
      setSubcategory(
        e.target.value.filter((subcategory) => subcategory !== 'all')
      );
    }
  };

  const handleSearchClick = async (e) => {
    if (!category) {
    }
    let params = {
      limit: 50,
      term: category,
      radius,
    };
    if (price) {
      params.price = price;
    }
    params.categories =
      subcategory[0] === 'all'
        ? categories[category].subcategories
            .slice(1, categories[category].subcategories.length)
            .map((subcat) => subcat.value)
            .join()
        : subcategory.join();
    const parsedLocation = location.split(',');
    if (
      parsedLocation.length === 2 &&
      !Number.isNaN(parsedLocation[0]) &&
      !Number.isNaN(parsedLocation[1])
    ) {
      params.latitude = Number.parseFloat(parsedLocation[0]);
      params.longitude = Number.parseFloat(parsedLocation[1]);
    } else {
      params.location = location;
    }
    let response = await yelpREST(BUSINESS_SEARCH_ENDPOINT, { params });
    let businesses = response.data.businesses;
    const maxOffset =
      response.data.total > params.limit
        ? response.data.total - params.limit + 1
        : businesses.length + 1;
    params.offset = Math.floor(Math.random() * Math.floor(maxOffset));
    params.offset =
      params.offset > 1000 - params.limit ? 1000 - params.limit : params.offset;
    response = await yelpREST(BUSINESS_SEARCH_ENDPOINT, { params });
    let validBusiness = false;
    let businessIndex;
    while (!validBusiness) {
      businessIndex = Math.floor(Math.random() * Math.floor(businesses.length));
      validBusiness = !businesses[businessIndex].is_closed;
    }
    const chosenBusiness = response.data.businesses[businessIndex];
    response = await yelpREST(`businesses/${chosenBusiness.id}/reviews`);
    chosenBusiness.reviews = (response.data && response.data.reviews) || [];
    setBusiness(chosenBusiness);
  };

  return (
    <div>
      <div className={classes.parameters}>
        <Location value={location} handleChange={setLocation} />
        <Dropdown
          label={'Radius'}
          value={radius}
          options={radiusOptions}
          handleChange={(e) => {
            setRadius(e.target.value);
          }}
          minWidth={80}
        />
        <Dropdown
          label={'Category'}
          value={category}
          options={Object.values(categories)}
          handleChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <Dropdown
          label={'Subcategory'}
          value={subcategory}
          options={category ? categories[category].subcategories : []}
          handleChange={handleSubcategoryChange}
          multiple={true}
          minWidth={240}
          maxWidth={240}
        />
        <ToggleButtonGroup
          className={classes.priceFilter}
          value={price}
          onChange={(e, newPrice) => setPrice(newPrice)}
          size='small'
          aria-label='price filter'
          exclusive
        >
          <ToggleButton value='1' aria-label='1'>
            $
          </ToggleButton>
          <ToggleButton value='2' aria-label='2'>
            $$
          </ToggleButton>
          <ToggleButton value='3' aria-label='3'>
            $$$
          </ToggleButton>
          <ToggleButton value='4' aria-label='4'>
            $$$$
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          className={classes.searchButton}
          variant='contained'
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
      <Business business={business} />
    </div>
  );
};

export default App;
