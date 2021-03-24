import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Review from './Review';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PhoneIcon from '@material-ui/icons/Phone';
import { formatRating } from '../util.js';

const THUMBNAIL_SIZE = 350;

const Business = ({ business }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',
      padding: '20px',
      width: '60%',
    },
    thumbnail: {
      width: THUMBNAIL_SIZE + 'px',
      height: THUMBNAIL_SIZE + 'px',
      padding: '5px',
    },
    thumbnailImage: {
      width: THUMBNAIL_SIZE + 'px',
      height: THUMBNAIL_SIZE + 'px',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    businessName: {
      fontFamily: `'Poppins','Helvetica Neue',Helvetica,Arial,sans-serif`,
      fontWeight: '900',
      fontSize: '48px',
      lineHeight: '54px',
    },
    businessDetails: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      whiteSpace: 'pre-wrap',
      fontSize: '18px',
    },
    reviews: {
      marginTop: '20px',
    },
  }));
  const classes = useStyles();
  return business ? (
    <Paper elevation={10} className={classes.root}>
      <Grid container direction='row' justify='center' alignItems='flex-start'>
        <Grid item xs={5}>
          <Paper elevation={10} className={classes.thumbnail}>
            <img
              className={classes.thumbnailImage}
              src={business.image_url}
              alt='business'
            />
          </Paper>
        </Grid>
        <Grid item container xs={7} spacing={1}>
          <Grid item xs={12}>
            <h1 className={classes.businessName}>{business.name}</h1>
          </Grid>
          <Grid item xs={12} style={{ margin: '-25px 0 25px 0' }}>
            {formatRating(business.rating, business.review_count)}
          </Grid>
          <Grid item xs={1} className={classes.businessDetails}>
            <LocationCityIcon />
          </Grid>
          <Grid item xs={11} className={classes.businessDetails}>
            {business.location.display_address.join('\n')}
          </Grid>
          <Grid item xs={1} className={classes.businessDetails}>
            <PhoneIcon />
          </Grid>
          <Grid item xs={11} className={classes.businessDetails}>
            {business.display_phone}
          </Grid>
          <Grid item xs={12} className={classes.businessDetails}>
            <a
              href={business.url}
              style={{ fontSize: '14px', marginLeft: '5px' }}
            >
              Go to Yelp page
            </a>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.reviews}>
        {business.reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    </Paper>
  ) : null;
};

export default Business;
