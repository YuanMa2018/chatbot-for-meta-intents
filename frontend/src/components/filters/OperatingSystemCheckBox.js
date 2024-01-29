import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function OperatingSystemCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentOperatingSystems } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allOperatingSystems } = oneFilterTotalValue_obj


    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentOperatingSystemsList = update_T_F_list.map((x, index) => (x ? allOperatingSystems[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentOperatingSystems: currentOperatingSystemsList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentOperatingSystems.length !== allOperatingSystems.length | currentOperatingSystems.length === 0) {
            dispatch(updateAllFilterState({ currentOperatingSystems: allOperatingSystems }))
        } else {
            dispatch(updateAllFilterState({ currentOperatingSystems: [] }))
        }
    }

    return (
        <div>
            <h5 className='mt-4' onClick={allSelect}>Operating System</h5>
            <Form className='m-auto' >
                {allOperatingSystems?.map((one_value, index) => {

                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={`${one_value}`}
                            checked={(currentOperatingSystems.length !== 0) ? (currentOperatingSystems.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "OperatingSystemCheckBox", currentOperatingSystems.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default OperatingSystemCheckBox;
