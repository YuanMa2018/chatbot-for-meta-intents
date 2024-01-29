import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button as MuiButton } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

// props.chatbot_form


function BrandCheckBox(props) {

    var show_first_n_checkbox = 5
    const [show_more_ON, set_show_more_ON] = useState(true)

    const dispatch = useDispatch()

    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentBrands } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allBrands } = oneFilterTotalValue_obj

    const handleCommit = (e) => {

        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentBrandsList = update_T_F_list.map((x, index) => (x ? allBrands[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentBrands: currentBrandsList }))
    }



    // select all | unselect all
    const allSelect = () => {
        if (currentBrands.length !== allBrands.length | currentBrands.length === 0) {
            dispatch(updateAllFilterState({ currentBrands: allBrands }))
        } else {
            dispatch(updateAllFilterState({ currentBrands: [] }))
        }
    }

    return (
        <div>
            {
                props.hide_title || <h5 className='mt-4'>Brands</h5>
            }
            {props.chatbot_form && allBrands.length > show_first_n_checkbox
                ?
                <Form className='m-auto' >
                    {allBrands.slice(0, show_first_n_checkbox)?.map((one_brand, index) => {
                        return (
                            <Form.Check
                                inline={props.isInline}
                                key={index}
                                type={"checkbox"}
                                id={index}
                                label={`${one_brand}`}
                                checked={(currentBrands.length !== 0) ? (currentBrands.includes(one_brand)) : false}
                                onChange={
                                    (e) => {
                                        handleCommit(e)
                                    }
                                }
                            />
                        )
                    }
                    )}
                    {show_more_ON
                        ? null
                        : allBrands.slice(show_first_n_checkbox, -1)?.map((one_brand, index) => {
                            return (
                                <Form.Check
                                    inline={props.isInline}
                                    key={index}
                                    type={"checkbox"}
                                    id={index}
                                    label={`${one_brand}`}
                                    checked={(currentBrands.length !== 0) ? (currentBrands.includes(one_brand)) : false}
                                    onChange={
                                        (e) => {
                                            handleCommit(e)
                                        }
                                    }
                                />
                            )
                        }
                        )
                    }

                    {show_more_ON
                        ?
                        <Button variant="outlined" onClick={(show_more_ON) => {
                            set_show_more_ON(false)
                        }} size="sm" >show more</Button>
                        :
                        <Button variant="outlined" onClick={(show_more_ON) => {
                            set_show_more_ON(true)
                        }} size="sm" >show less</Button>
                    }


                </Form>

                :
                <Form className='m-auto' >
                    {allBrands?.map((one_brand, index) => {
                        return (
                            <Form.Check
                                inline={props.isInline}
                                key={index}
                                type={"checkbox"}
                                id={index}
                                label={`${one_brand}`}
                                checked={(currentBrands.length !== 0) ? (currentBrands.includes(one_brand)) : false}
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

            }

            {
                props.chatbot_form &&
                <div className="d-flex flex-column justify-content-center">
                    <MuiButton className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                        submit_interaction_track(dispatch, props.chatbot_form, 'BrandCheckBox', currentBrands.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        next step
                    </MuiButton>
                </div>
            }

        </div>
    )
}

export default BrandCheckBox;
