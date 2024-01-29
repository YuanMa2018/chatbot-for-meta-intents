import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { listProducts } from '../../actions/productActions'
import { updateAllFilterState } from '../../actions/filterActions'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Row } from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

// props.hide_slider
// props.hide_button
// props.chatbot_form (include all components without next question)
// props.show_jump_next_question

function NumRatingRangeSlider(props) {

    const dispatch = useDispatch()
    const [numRatingRangeValue, setNumRatingRangeValue] = useState([0, 21888]);
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentNumRatingRange } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { totalNumRatingRange } = oneFilterTotalValue_obj

    useEffect(() => {
        if (currentNumRatingRange.length === 0) {
            //Intitial and reset, assign value
            setNumRatingRangeValue([0, 21888])
        } else {
            // Go back, assign value
            setNumRatingRangeValue(currentNumRatingRange)
        }
        // console.log(totalNumRatingRange)

    }, [currentNumRatingRange])


    const valuetext = (value) => {
        return `${parseInt(value)} `
    }

    const handleChange = (event, newValue) => {
        setNumRatingRangeValue(newValue);
    };

    const handleCommit = (event, newValue) => {
        dispatch(updateAllFilterState({ currentNumRatingRange: newValue }))
    }

    return (
        <div>
            {
                props.hide_title || <h5 className='my-5'>Number of rating of the product</h5>
            }
            {
                props.chatbot_form
                    ? <div className="d-flex flex-column justify-content-center">
                        {props.show_jump_next_question
                            ?
                            <Button className={props.hide_button ? 'mb-5' : 'my-3'} size="small" variant="outlined">jump to next question</Button>
                            :
                            null
                        }

                        {
                            props.hide_button
                                ? null
                                : totalNumRatingRange?.toString() === [1, 21888].toString()
                                    ? <Row className={props.hide_button ? 'mb-3' : 'mb-5'} >
                                        {/* <ButtonGroup size="small" variant="outlined" className="d-flex justify-content-center">
                                            <Button onClick={(e) => handleCommit(e, [totalNumRatingRange[0], totalNumRatingRange[0] + Math.ceil((totalNumRatingRange[1] - totalNumRatingRange[0]) / 2)])}>{"Less"}</Button>
                                            <Button onClick={(e) => handleCommit(e, [totalNumRatingRange[0] + Math.ceil((totalNumRatingRange[1] - totalNumRatingRange[0]) / 2), totalNumRatingRange[1]])}>{"More"}</Button>
                                        </ButtonGroup> */}
                                        <ButtonGroup size="small" variant="outlined" className="d-flex justify-content-center">
                                            <Button onClick={(e) => handleCommit(e, [totalNumRatingRange[0], 2000])}>{"Less"}</Button>
                                            <Button onClick={(e) => handleCommit(e, [2000, totalNumRatingRange[1]])}>{"More"}</Button>
                                        </ButtonGroup>
                                    </Row>
                                    : <div className={props.hide_button ? 'mb-3' : 'mb-4'} ></div>
                        }

                    </div>
                    : null
            }


            {props.hide_slider
                ?
                null
                :
                <Box
                    sx={props.chatbot_form ? { maxWidth: 180 } : { maxWidth: 300 }}
                    className='m-auto'>
                    <Slider
                        min={totalNumRatingRange?.[0]}
                        max={totalNumRatingRange?.[1]>3100?3100:totalNumRatingRange?.[1]}
                        getAriaLabel={() => 'Temperature range'}
                        value={numRatingRangeValue}
                        onChange={handleChange}
                        onChangeCommitted={handleCommit}
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                        valueLabelDisplay="on"
                    />
                </Box>
            }
            {
                props.chatbot_form &&
                <div className="d-flex flex-column justify-content-center">
                    <Button className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, "NumRatingRangeSlider", currentNumRatingRange.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }

        </div>
    )
}

export default NumRatingRangeSlider;

