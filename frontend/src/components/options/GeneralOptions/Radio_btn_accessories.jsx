import React from "react";
import RadioBTN from "../Options/RadioBTN";
import CheckboxBTN from "../Options/CheckboxBTN";

const Radio_btn_accessories = (props) => {
  console.log(props)
  const options = [
    {
      name: "Professional Training",
      value: "1",
      key: "1"
    },
    {
      name: "Daily Cycling",
      value: "2",
      key: "2"
    },
    {
      name: "Daily Cycling2",
      value: "3",
      key: "3"
    },
    {
      name: "Daily Cycling3",
      value: "4",
      key: "4"
    },
  ];

  return <RadioBTN options={options} />;
};

export default Radio_btn_accessories;
