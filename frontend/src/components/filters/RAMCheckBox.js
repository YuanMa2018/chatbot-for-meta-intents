import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

// props.hide_slider
// props.hide_button
// props.chatbot_form


function RAMCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentRAMs } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allRAMs } = oneFilterTotalValue_obj
    // console.log("allRAMs",allRAMs)

    const handleCommit = (e) => {
        // which box is checked by this action
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        // console.log("update_T_F_list",update_T_F_list)
        // console.log("allRAMs[0]",allRAMs[0])
        // which box is checked by this action, then add this checked value in redux
        // .filter(n => n) remove objects: null,,0,,undefined
        let currentRAMsList = update_T_F_list.map((x, index) => (x ? allRAMs[index] : null)).filter(n => n)
        // console.log("currentRAMsList",currentRAMsList)
        dispatch(updateAllFilterState({ currentRAMs: currentRAMsList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentRAMs.length !== allRAMs.length | currentRAMs.length === 0) {
            dispatch(updateAllFilterState({ currentRAMs: allRAMs }))
        } else {
            dispatch(updateAllFilterState({ currentRAMs: [] }))
        }
    }

    return (
        <div>
            {
                props.hide_title || <h5 className='mt-4' onClick={allSelect}>RAM</h5>
            }
            {
                (props.chatbot_form & allRAMs?.length===7)
                    ? <Row >
                        <ButtonGroup variant="outlined">
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentRAMs: ['1','2'] }))}}>{"small"}</Button>
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentRAMs: ['3','4','6'] }))}}>{"medium"}</Button>
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentRAMs: ['8','12'] }))}}>{"large"}</Button>
                            
                        </ButtonGroup>
                    </Row>
                    : null

            }
            <Form className='m-auto' >
                {allRAMs?.map((one_value, index) => {
                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={one_value<1 ? `${one_value*1024} MB` : `${one_value} GB`}
                            //currentRAMs include this value then checked otherwise no checked
                            checked={(currentRAMs.length !== 0) ? (currentRAMs.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "RAMCheckBox", currentRAMs.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default RAMCheckBox;
