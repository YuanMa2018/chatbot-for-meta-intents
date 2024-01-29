import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function ScreenSizeCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentScreenSizes } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allScreenSizes } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentScreenSizesList = update_T_F_list.map((x, index) => (x ? allScreenSizes[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentScreenSizes: currentScreenSizesList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentScreenSizes.length !== allScreenSizes.length | currentScreenSizes.length === 0) {
            dispatch(updateAllFilterState({ currentScreenSizes: allScreenSizes }))
        } else {
            dispatch(updateAllFilterState({ currentScreenSizes: [] }))
        }
    }

    return (
        <div>
            {/* <h5 className='mt-4' onClick={allSelect}>Screen Size</h5> */}
            {
                props.hide_title || <h5 className='mt-4'>Screen Size</h5>
            }
            <Form className='m-auto' >
                {allScreenSizes?.map((one_value, index) => {
                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={`${parseFloat(one_value * 0.393701).toFixed(1)} inches`}
                            checked={(currentScreenSizes.length !== 0) ? (currentScreenSizes.includes(one_value)) : false}
                            onChange={
                                (e) => {
                                    handleCommit(e)
                                }
                            }
                        />
                    )
                }
                )}
            </Form>
            {
                props.chatbot_form && 
                <div className="d-flex flex-column justify-content-center">
                    <Button  className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, "ScreenSizeCheckBox", currentScreenSizes.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default ScreenSizeCheckBox;
