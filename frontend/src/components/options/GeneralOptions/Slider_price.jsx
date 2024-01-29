import React from "react";
import { Slider } from "@mui/material";
import { Button } from "@mui/material";

function valuetext(value) {
    return `${value} €`;
}

const Slider_price = (props) => {
    const [price, setPrice] = React.useState([300, 800]);

    const handleChange = (event, newValue) => {
        setPrice(newValue)
    }

    const handleSubmit = (event) => {
        props.submit_handler();
        event.preventDefault();
        console.log(price)
      };

    const marks = [
        {
          value: 100,
          label: '100€',
        },
        {
          value: 2000,
          label: '2000€',
        },
      ];

    return (
        <div>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext} 
                marks={marks}
                min={100}
                max={2000}
                />
            <Button variant="contained" onClick={props.actionProvider.recommendation}>
                Confirm
            </Button>
        </div>
    );
}

export default Slider_price;