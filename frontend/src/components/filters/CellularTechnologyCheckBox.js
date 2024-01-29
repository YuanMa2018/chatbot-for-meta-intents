import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button } from '@mui/material';
import { submit_interaction_track } from '../../actions/inteactionTrackActions';


function CellularTechnologyCheckBox(props) {

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentCellularTechnologies } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allCellularTechnologies } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentCellularTechnologiesList = update_T_F_list.map((x, index) => (x ? allCellularTechnologies[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentCellularTechnologies: currentCellularTechnologiesList }))
    }

    // select all | unselect all
    const allSelect = () => {
        if (currentCellularTechnologies.length !== allCellularTechnologies.length | currentCellularTechnologies.length === 0) {
            dispatch(updateAllFilterState({ currentCellularTechnologies: allCellularTechnologies }))
        } else {
            dispatch(updateAllFilterState({ currentCellularTechnologies: [] }))
        }
    }

    return (
        <div>
            <h5 className='mt-4' onClick={allSelect}>Cellular Technology</h5>
            <Form className='m-auto' >
                {allCellularTechnologies?.map((one_value, index) => {

                    return (
                        <Form.Check
                            key={index}
                            inline={props.isInline}
                            type={"checkbox"}
                            id={index}
                            label={`${one_value}`}
                            checked={(currentCellularTechnologies.length !== 0) ? (currentCellularTechnologies.includes(one_value)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, 'CellularTechnologyCheckBox', currentCellularTechnologies.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </Button>
                </div>
            }

        </div >
    )
}

export default CellularTechnologyCheckBox;
