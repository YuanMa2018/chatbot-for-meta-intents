import React from "react";
import Options from "../Options/Options";

const DoingWithOptions = (props) => {
  // console.log(props)
  const options = [
    {
      name: "Professional Training",
      handler: props.actionProvider.whichAccessoriesDoYouWant,
      id: 1,
    },
    {
      name: "Daily Cycling",
      handler: props.actionProvider.whichAccessoriesDoYouWant,
      id: 2,
    },
  ];

  return <Options options={options} />;
};

export default DoingWithOptions;
