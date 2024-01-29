import React from "react";
import CheckboxBTN from "../Options/CheckboxBTN";

const Checkbox_btn_accessories = (props) => {
  console.log(props)
  const options = [
    {
      name: "Lights",
      value: "0",
    },
    {
      name: "Suspension",
      value: "1",
    },
    {
      name: "Basket",
      value: "2",
    },
    {
      name: "Bell",
      value: "3",
    },
  ];

  return <CheckboxBTN options={options} submit_handler={props.actionProvider.howMuchDoYouWantToSpendOnIt}/>;
};

export default Checkbox_btn_accessories;
