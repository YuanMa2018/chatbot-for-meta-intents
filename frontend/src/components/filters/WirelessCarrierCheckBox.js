import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function WirelessCarrierCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentWirelessCarriers } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allWirelessCarriers } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentWirelessCarriersList = update_T_F_list.map((x, index) => (x ? allWirelessCarriers[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentWirelessCarriers: currentWirelessCarriersList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentWirelessCarriers.length !== allWirelessCarriers.length | currentWirelessCarriers.length === 0) {
            dispatch(updateAllFilterState({ currentWirelessCarriers: allWirelessCarriers }))
        } else {
            dispatch(updateAllFilterState({ currentWirelessCarriers: [] }))
        }
    }

    return (
        <div>
            {props.hide_title || <h5 className='mt-4' onClick={allSelect}>Wireless Carriers</h5>}
            <Form className='m-auto' >
                {allWirelessCarriers?.map((one_value, index) => {

                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={one_value === "AT_T" ? "AT&T" : one_value }
                            checked={(currentWirelessCarriers.length !== 0) ? (currentWirelessCarriers.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "WirelessCarrierCheckBox", currentWirelessCarriers.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default WirelessCarrierCheckBox;

