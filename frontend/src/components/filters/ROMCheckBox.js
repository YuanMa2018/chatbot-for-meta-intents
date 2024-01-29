import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

function ROMCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentROMs } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allROMs } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentROMsList = update_T_F_list.map((x, index) => (x ? allROMs[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentROMs: currentROMsList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentROMs.length !== allROMs.length | currentROMs.length === 0) {
            dispatch(updateAllFilterState({ currentROMs: allROMs }))
        } else {
            dispatch(updateAllFilterState({ currentROMs: [] }))
        }
    }

    return (
        <div>
            {
                props.hide_title || <h5 className='mt-4' onClick={allSelect}>ROM</h5>
            }
            {
                (props.chatbot_form & allROMs?.length===7)
                    ? <Row >
                        <ButtonGroup variant="outlined">
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentROMs: ['16','32','64'] }))}}>{"small"}</Button>
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentROMs: ['128','256'] }))}}>{"medium"}</Button>
                            <Button onClick={()=>{dispatch(updateAllFilterState({ currentROMs: ['512','1024'] }))}}>{"large"}</Button>
                            
                        </ButtonGroup>
                    </Row>
                    : null

            }
            <Form className='m-auto' >
                {allROMs?.map((one_value, index) => {
                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={one_value<1 ? `${one_value*1024} MB` : `${one_value} GB`}
                            checked={(currentROMs.length !== 0) ? (currentROMs.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, "ROMCheckBox", currentROMs.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }
        </div>
    )
}

export default ROMCheckBox;
