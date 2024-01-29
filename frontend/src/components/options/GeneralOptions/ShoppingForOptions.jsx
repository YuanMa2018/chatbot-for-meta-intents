import React from "react";
import Options from "../Options/Options";

const ShoppingForOptions = (props) => {
  // console.log(props)
  const options = [
    {
      name: "Adult",
      handler: props.actionProvider.whatAreYouGoingToDoWithIt,
      id: 1,
    },
    {
      name: "Child",
      handler: props.actionProvider.whatAreYouGoingToDoWithIt,
      id: 2,
    },
  ];

  return <Options options={options} />;
};

export default ShoppingForOptions;
