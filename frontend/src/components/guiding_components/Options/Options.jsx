import { Button, ButtonGroup } from "@mui/material";
import React from "react";


const Options = ({ options }) => {
  const markup = options.map((option) => (
    <Button key={option.id} onClick={option.handler}>{option.name}</Button>
  ));

  return <ButtonGroup variant="outlined">{markup}</ButtonGroup>;
};

export default Options;
