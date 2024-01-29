import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { updateAllFilterState } from '../../actions/filterActions'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Paper } from '@mui/material';
import { Row } from 'react-bootstrap';
import { color, display } from '@mui/system';
import { blue } from '@mui/material/colors';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

// props.hide_slider
// props.hide_button
// props.chatbot_form (include all components without next question)
// props.show_jump_next_question

function GeneralRangeSlider(props) {


    const dispatch = useDispatch()
    const [rangeValue, setRangeValue] = useState([0, 6]);
    const { allFilterState } = useSelector(state => state.allFilterState)
    // const {currentRatingRange:currentRange} = allFilterState
    const { [props.filter_name_current_state]: currentRange } = allFilterState

    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    // const {totalRatingRange:totalRange} = oneFilterTotalValue_obj
    const { [props.filter_name_all_range]: totalRange } = oneFilterTotalValue_obj


    useEffect(() => {
        if (currentRange.length === 0) {
            //Intitial and reset, assign value
            setRangeValue([0, 6])
        } else {
            // Go back, assign value
            setRangeValue(currentRange)
        }
        // console.log(totalRange)

    }, [currentRange])


    const valuetext = (value) => {
        return `${parseFloat(value).toFixed(2)} `
    }

    const handleChange = (event, newValue) => {
        setRangeValue(newValue);
    };

    const handleCommit = (event, newValue) => {

        dispatch(updateAllFilterState({ [props.filter_name_current_state]: newValue }))

    }

    return (
        <div>
            {props.hide_title ||
                <div className='my-5'>
                    {<h5 style={{ display: 'inline' }}>{props.title}</h5>}
                    {props.additional_title && <p style={{ display: 'inline', color: "#bdbdbd", fontSize: 12 }}>{props.additional_title}</p>}
                </div>}



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
                                : <Row className={props.hide_button ? 'mb-3' : 'mb-5'} >
                                    <ButtonGroup size="small" variant="outlined" className="d-flex justify-content-center">
                                        <Button >{"<" + Math.ceil((totalRange[1] - totalRange[0]) / 3) + ""}</Button>
                                        <Button >{Math.ceil((totalRange[1] - totalRange[0]) / 3) + " - " + Math.ceil(2 * (totalRange[1] - totalRange[0]) / 3) + ""}</Button>
                                        <Button >{">" + Math.ceil(2 * (totalRange[1] - totalRange[0]) / 3) + ""}</Button>
                                    </ButtonGroup>
                                </Row>
                        }

                    </div>
                    : null
            }



            {
                props.hide_slider
                    ? null
                    :
                    <Box
                        sx={props.chatbot_form ? { maxWidth: 180 } : { maxWidth: 300 }}

                        className='m-auto'>
                        <Slider
                            min={totalRange?.[0]}
                            max={totalRange?.[1]}
                            step={0.1}
                            getAriaLabel={() => 'Temperature range'}
                            value={rangeValue}
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
                        submit_interaction_track(dispatch, props.chatbot_form, props.title, currentRange.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>)


}

export default GeneralRangeSlider;

