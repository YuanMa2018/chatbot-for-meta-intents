import * as React from 'react';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import styles from "../Options/Text.module.css"


const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 5px 5px;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

const InlineCritiquing = (props) =>{

    return <div className={styles.inlineText} >
    {"OK, we have some bikes for you, suitbale for city, which are cheap, easy to ride, here is a bike you might like".split(/\s|(?=\W)/).map((word,index) => {
      var keywords = ["city", "cheap", "easy"]
      if (keywords.includes(word)) {
        return (
            <CustomButton key={index} variant="contained">{word}</CustomButton>
        );
      }
      return word + " ";
    })}
  </div>

}

export default InlineCritiquing;


