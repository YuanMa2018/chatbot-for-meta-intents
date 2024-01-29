import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { listProducts } from '../../actions/productActions'
import { updateAllFilterState } from '../../actions/filterActions'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function RatingRangeSlider(props) {

    const dispatch = useDispatch()
    const [ratingRangeValue, setRatingRangeValue] = useState([0, 5]);
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentRatingRange} = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const {totalRatingRange} = oneFilterTotalValue_obj


    useEffect(() => {
        if (currentRatingRange.length === 0) {
            //Intitial and reset, assign value
            setRatingRangeValue([0, 5])
        } else {
            // Go back, assign value
            setRatingRangeValue(currentRatingRange)
        }
    }, [currentRatingRange])


    const valuetext = (value) => {
        return `${parseFloat(value).toFixed(1)} Stars`
    }

    const handleChange = (event, newValue) => {
        setRatingRangeValue(newValue);
    };

    const handleCommit = (event, newValue) => {
        dispatch(updateAllFilterState({currentRatingRange:newValue}))
    }

    return (
        <div>
            {props.hide_title ||
                <div className='my-5'>
                    <h5 style={{ display: 'inline' }}>Rating</h5>
                    <p style={{ display: 'inline', color:"#bdbdbd", fontSize:12 }}>(larger is better)</p>
                </div>}
                
            <Box 
            sx={props.chatbot_form ? { maxWidth: 180 } : { maxWidth: 300 }}
            className='m-auto'>
                <Slider
                    min={totalRatingRange?.[0]}
                    max={totalRatingRange?.[1]}
                    step={0.1}
                    getAriaLabel={() => 'Temperature range'}
                    value={ratingRangeValue}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    valueLabelDisplay="on"
                />
            </Box>
            {
                props.chatbot_form && 
                <div className="d-flex flex-column justify-content-center">
                    <Button  className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, "RatingRangeSlider", currentRatingRange.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>)


}

export default RatingRangeSlider;

