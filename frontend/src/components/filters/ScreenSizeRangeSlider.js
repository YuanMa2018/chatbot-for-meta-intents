import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { listProducts } from '../../actions/productActions'
import { updateAllFilterState, getOneFilterTotalValue } from '../../actions/filterActions'
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

function ScreenSizeRangeSlider(props) {

    const dispatch = useDispatch()
    const [screenSizeRangeValue, setScreenSizeRangeValue] = useState([0, 20]);
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentScreenSizeRange } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { totalScreenSizeRange } = oneFilterTotalValue_obj

    useEffect(() => {


        if (currentScreenSizeRange.length === 0) {
            //Intitial and reset, assign value
            setScreenSizeRangeValue([1, 20])
        } else {
            // Go back, assign value
            setScreenSizeRangeValue(currentScreenSizeRange)
        }
        // console.log(totalScreenSizeRange)

    }, [currentScreenSizeRange])


    const valuetext = (value) => {
        // return `${value} cm (` + parseFloat(value  * 0.393701).toFixed(1) + 'inch)'
        return parseFloat(value * 0.393701).toFixed(1) + ' inch'
    }

    const handleChange = (event, newValue) => {
        setScreenSizeRangeValue(newValue);
    };

    const handleCommit = (event, newValue) => {
        dispatch(updateAllFilterState({ currentScreenSizeRange: newValue }))

    }

    return (
        <div>
            {
                props.chatbot_form || <h5 className='my-5'>Screen size Range</h5>
            }
            {
                <div>
                    {props.chatbot_form
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
                                    : totalScreenSizeRange?.toString() === [11.4, 19.3].toString()
                                        ? <Row className={props.hide_button ? 'mb-3' : 'mb-5'} >
                                            <ButtonGroup size="small" variant="outlined" className="d-flex justify-content-center">
                                                <Button onClick={(e) => handleCommit(e, [totalScreenSizeRange[0], totalScreenSizeRange[0] + Math.ceil((totalScreenSizeRange[1] - totalScreenSizeRange[0]) / 3)])}>{"Small"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [totalScreenSizeRange[0] + Math.ceil((totalScreenSizeRange[1] - totalScreenSizeRange[0]) / 3), totalScreenSizeRange[0] + Math.ceil(2 * (totalScreenSizeRange[1] - totalScreenSizeRange[0]) / 3)])}>{"Medium"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [totalScreenSizeRange[0] + Math.ceil(2 * (totalScreenSizeRange[1] - totalScreenSizeRange[0]) / 3), totalScreenSizeRange[1]])}>{"Large"}</Button>
                                            </ButtonGroup>
                                        </Row>
                                        : <div className={props.hide_button ? 'mb-3' : 'mb-4'} ></div>
                            }

                        </div>
                        : null
                    }

                    {props.hide_slider
                        ? null
                        :
                        <Box
                            sx={props.chatbot_form ? { maxWidth: 180 } : { maxWidth: 300 }}
                            className='m-auto'>
                            <Slider
                                min={totalScreenSizeRange?.[0]}
                                max={totalScreenSizeRange?.[1]}
                                getAriaLabel={() => 'Temperature range'}
                                value={screenSizeRangeValue}
                                onChange={handleChange}
                                onChangeCommitted={handleCommit}
                                getAriaValueText={valuetext}
                                valueLabelFormat={valuetext}
                                valueLabelDisplay="on"
                            />
                        </Box>

                    }
                </div>
            }
            {
                props.chatbot_form &&
                <div className="d-flex flex-column justify-content-center">
                    <Button className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, "ScreenSizeRangeSlider", currentScreenSizeRange.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>)

}

export default ScreenSizeRangeSlider;
