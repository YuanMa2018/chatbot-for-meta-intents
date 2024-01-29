import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from '@mui/material';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';


function GeneralCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { [props.filter_name_current_state]:currentValues } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { [props.filter_name_all_values]:totalValues } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentValues = update_T_F_list.map((x, index) => (x ? totalValues[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ [props.filter_name_current_state]: currentValues }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentValues.length !== totalValues.length | currentValues.length === 0) {
            dispatch(updateAllFilterState({ [props.filter_name_all_values]: totalValues }))
        } else {
            dispatch(updateAllFilterState({ [props.filter_name_all_values]: [] }))
        }
    }

    return (
        <div>
            { props.hide_title || <h5 className='mt-4' onClick={allSelect}>{props.title}</h5>}
            <Form className='m-auto' >
                {totalValues?.map((one_value, index) => {

                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={`${one_value}`}
                            checked={(currentValues.length !== 0) ? (currentValues.includes(one_value)) : false}
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
                    <Button className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, props.title, currentValues.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }

        </div>
    )
}

export default GeneralCheckBox;
