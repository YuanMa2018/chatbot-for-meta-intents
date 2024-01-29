import React from "react";
import PriceRangeSlider from "../filters/PriceRangeSlider"
import { Button } from "@mui/material";

const Guiding_Price = (props) => {
    return (
        <div className="d-flex flex-column justify-content-center">
            <PriceRangeSlider {...props} hide_title={true} show_jump_next_question={true} chatbot_form ={true}></PriceRangeSlider>
            {/* <Button size="small" variant="outlined" onClick={props.actionProvider.handle_Next_Question}>
                Confirm
            </Button> */}
        </div>
    );

}

export default Guiding_Price;



