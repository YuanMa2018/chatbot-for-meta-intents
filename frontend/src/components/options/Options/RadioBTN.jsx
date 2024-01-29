import React from "react";
import styles from "./RadioBTN.module.css";
import { FormControl, FormHelperText, Checkbox, FormLabel, FormControlLabel, FormLabelTypeMap, RadioGroup, Radio, Button } from "@mui/material";
import { style } from "@mui/system";
import { green } from "@mui/material/colors";

const RadioBTN = ({ options }) => {

  const [value, setValue] = React.useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value)
    console.log(typeof (value))
    if (value === "1") {

    }
  };

  const markup = options.map((option) => (
    <FormControlLabel
      value={option.value}
      control={<Radio />}
      label={option.name}
      key={option.key}
      className={styles.option}
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend" >Gender</FormLabel> */}
        <RadioGroup value={value} onChange={handleRadioChange}>
          {markup}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </RadioGroup>
      </FormControl>
    </form>

  )

};

export default RadioBTN;

