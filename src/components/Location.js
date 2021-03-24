import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const Location = ({ value, handleChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleCurrentPositionClick = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleChange(`${pos.coords.latitude}, ${pos.coords.longitude}`);
        setError(false);
        setLoading(false);
      },
      (err) => {
        window.alert(`Could not get location: ${err.message}`);
        setError(true);
        setLoading(false);
      },
      {
        timeout: 10000,
      }
    );
  };

  return (
    <div className={classes.margin}>
      <FormControl className={classes.margin}>
        <TextField
          label='Location'
          style={{ width: 350 }}
          value={value}
          error={error}
          helperText={error ? 'Invalid location' : ''}
          onChange={(e) => {
            setError(!e.target.value);
            handleChange(e.target.value);
          }}
          onBlur={(e) => setError(!e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton
                    color='primary'
                    aria-label='get current position'
                    onClick={handleCurrentPositionClick}
                  >
                    <LocationOn fontSize='small' />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
};

export default Location;
