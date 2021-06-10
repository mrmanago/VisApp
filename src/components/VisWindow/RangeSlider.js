import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
//import VisWindow from './VisWindow';

const useStyles = makeStyles({
  root: {
    width: 1505,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({firstDate, lastDate}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Timeline
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={firstDate}
        max={lastDate}
      />
    </div>
    
  );
}