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

function PriceRangeSlider(props) {

    const dispatch = useDispatch()
    const [priceRangeValue, setPriceRangeValue] = useState([0, 30000]);
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentPriceRange } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { totalPriceRange } = oneFilterTotalValue_obj



    useEffect(() => {
        if (currentPriceRange.length === 0) {
            //Intitial and reset, assign value
            setPriceRangeValue([0, 30000])
        } else {
            // Go back, assign value
            setPriceRangeValue(currentPriceRange)
        }

    }, [currentPriceRange])


    const valuetext = (value) => {
        return `${parseFloat(value).toFixed(2)} $`
    }

    const handleChange = (event, newValue) => {
        setPriceRangeValue(newValue);
    };

    const handleCommit = (event, newValue) => {
        dispatch(updateAllFilterState({ currentPriceRange: newValue }))
    }

    return (
        <div>
            {
                (props.hide_title || props.chatbot_form) || <h5 className='my-5'>Price</h5>
                
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
                                    : totalPriceRange?.toString() === [107, 1670].toString()
                                        ? <Row className={props.hide_button ? 'mb-3' : 'mb-5'} >
                                            <ButtonGroup size="small" variant="outlined" className="d-flex justify-content-center">
                                                {/* <Button onClick={(e) => handleCommit(e, [totalPriceRange[0], totalPriceRange[0] + Math.ceil((totalPriceRange[1] - totalPriceRange[0]) / 3)])}>{"Cheap"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [totalPriceRange[0] + Math.ceil((totalPriceRange[1] - totalPriceRange[0]) / 3), totalPriceRange[0] + Math.ceil(2 * (totalPriceRange[1] - totalPriceRange[0]) / 3)])}>{"Middle"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [totalPriceRange[0] + Math.ceil(2 * (totalPriceRange[1] - totalPriceRange[0]) / 3), totalPriceRange[1]])}>{"Expensive"}</Button> */}
                                                <Button onClick={(e) => handleCommit(e, [totalPriceRange[0], 400])}>{"Cheap"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [400, 800])}>{"Middle"}</Button>
                                                <Button onClick={(e) => handleCommit(e, [800, totalPriceRange[1]])}>{"Expensive"}</Button>
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
                                min={totalPriceRange?.[0]}
                                max={totalPriceRange?.[1]}
                                getAriaLabel={() => 'Temperature range'}
                                value={priceRangeValue}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "PriceRangeSlider", currentPriceRange.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>

                </div>
            }

        </div>)

}

export default PriceRangeSlider;
