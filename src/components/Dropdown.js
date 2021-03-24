import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const Dropdown = ({
  label,
  value,
  options,
  handleChange,
  multiple = false,
  minWidth = 120,
  maxWidth = 120,
}) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: minWidth,
      maxWidth: maxWidth,
    },
  }));

  const classes = useStyles();

  options = options.map((option, index) => {
    return (
      <MenuItem key={index} value={option.value}>
        {option.label}
      </MenuItem>
    );
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select onChange={handleChange} value={value} multiple={multiple}>
          {options}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
