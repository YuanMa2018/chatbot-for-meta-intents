import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function ModelYearCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentModelYears } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allModelYears } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentModelYearsList = update_T_F_list.map((x, index) => (x ? allModelYears[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentModelYears: currentModelYearsList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentModelYears.length !== allModelYears.length | currentModelYears.length === 0) {
            dispatch(updateAllFilterState({ currentModelYears: allModelYears }))
        } else {
            dispatch(updateAllFilterState({ currentModelYears: [] }))
        }
    }

    return (
        <div>
            { props.hide_title || <h5 className='mt-4' onClick={allSelect}>Model Year</h5>}
            <Form className='m-auto' >
                {allModelYears?.map((one_value, index) => {

                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={`${one_value}`}
                            checked={(currentModelYears.length !== 0) ? (currentModelYears.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "ModelYearCheckBox", currentModelYears.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default ModelYearCheckBox;

