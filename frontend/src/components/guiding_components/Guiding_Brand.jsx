import React from "react";
import BrandCheckBox from "../filters/BrandCheckBox.js"
import { Button } from "@mui/material";
const Guiding_Brand = (props) => {
  return (
    <div>
        <BrandCheckBox {...props} isInline={true} chatbot_form={true}></BrandCheckBox>
        {/* <Button size="small" variant="outlined" onClick={props.actionProvider.handle_Next_Question}>
            Confirm
        </Button> */}
    </div>
);
};

export default Guiding_Brand;
