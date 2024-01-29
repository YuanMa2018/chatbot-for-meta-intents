import React from "react";
import styles from "./RadioBTN.module.css";
import { FormControl, FormGroup, FormHelperText, Checkbox, FormLabel, FormControlLabel, FormLabelTypeMap, RadioGroup, Radio, Button } from "@mui/material";
import { style } from "@mui/system";
import { green } from "@mui/material/colors";

const CheckboxBTN = (props) => {


  const [value, setValue] = React.useState(new Map());

  const handleChange = (event) => {

    setValue(value.set(event.target.name, event.target.checked));
    console.log(value)

  };


  const handleSubmit = (event) => {
    props.submit_handler();
    event.preventDefault();
    console.log(value)
  };
  

  const markup = props.options.map((option) => (
    <FormControlLabel
      control={<Checkbox
        // checked={value[option.name]}
        onChange={handleChange}
        name = {option.name}
      />}
      label={option.name}
      key={option.value}
      className={styles.option}
    />
  ));
  
  
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className={styles.options}>
        {markup}
        <Button variant="contained" type="submit">
          Confirm
        </Button>
      </FormGroup>
    </form>
  )
};



export default CheckboxBTN;






