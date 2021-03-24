import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { formatRating } from '../util.js';

const THUMBNAIL_SIZE = 75;

const useStyles = makeStyles((theme) => ({
  review: {
    border: '1px solid lightgrey',
    margin: '5px',
    padding: '5px',
    borderRadius: '20px',
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
    borderRadius: '90px',
  },
}));

const Review = ({ review }) => {
  const classes = useStyles();
  return (
    <div className={classes.review}>
      <Grid container direction='row'>
        <Grid
          item
          container
          xs={2}
          direction='row'
          style={{ textAlign: 'center' }}
        >
          <Grid item xs={12} className={classes.thumbnail}>
            <img
              src={review.user && review.user.image_url}
              className={classes.thumbnailImage}
              alt='review user'
            />
          </Grid>
          <Grid item xs={12}>
            {review.user.name}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='row'
          xs={10}
          style={{ marginTop: '10px' }}
        >
          <Grid item xs={12}>
            {formatRating(review.rating)}
          </Grid>
          <Grid item xs={12} style={{ fontSize: '14px' }}>
            {review.time_created}
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px', fontSize: '18px' }}>
            {review.text}
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px', fontSize: '14px' }}>
            <a href={review.url}>Full Review</a>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Review;
