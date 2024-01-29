import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'


function OptionsRadio({ feature_name, options, currentValue, unit, product }) {
  const handleClick = (one_value) => {
    console.info('You clicked the Chip.' + one_value);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      // justifyContent="center"
      alignItems="center"
    >
      <div style={{ textAlign: "center" }}>{feature_name}</div>
      {options
        ? options.length === 1
          // ? <div>{" : " + options[0] + unit}</div>
          ? <Chip label={options[0] + unit} />
          :
          options.map((one_value, index) =>
          currentValue === String(one_value)
              ? <Chip key={index} label={one_value + unit} />
              : 
              <Link key={index} to={`/products/000?name=${product.name}&brand=${product.brand}&${feature_name}=${one_value}`}>
                    <Chip label={one_value + unit} onClick={() => handleClick(one_value)} variant="outlined" />
              </Link>
          )
        : ''
      }
    </Stack>
  );
}

export default OptionsRadio
