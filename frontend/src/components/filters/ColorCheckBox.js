import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllFilterState } from '../../actions/filterActions';
import { listProducts } from '../../actions/productActions';
import { Button as MuiButton } from "@mui/material";
import { submit_interaction_track } from '../../actions/inteactionTrackActions';


function ColorCheckBox(props) {
    var show_first_n_checkbox = 5
    const [show_more_ON, set_show_more_ON] = useState(true)

    const dispatch = useDispatch()
    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentColors } = allFilterState
    const oneFilterTotalValue_obj = useSelector(state => state.oneFilterTotalValue)
    const { allColors } = oneFilterTotalValue_obj

    const handleCommit = (e) => {
        let update_list = [...Array(Number(e.target.form.length)).keys()]
        let update_T_F_list = update_list.map(x => e.target.form[x].checked)
        let currentColorsList = update_T_F_list.map((x, index) => (x ? allColors[index] : null)).filter(n => n)
        dispatch(updateAllFilterState({ currentColors: currentColorsList }))

    }

    // select all | unselect all
    const allSelect = () => {
        if (currentColors.length !== allColors.length | currentColors.length === 0) {
            dispatch(updateAllFilterState({ currentColors: allColors }))
        } else {
            dispatch(updateAllFilterState({ currentColors: [] }))
        }
    }


    return (
        <div>
            {
                props.hide_title || <h5 className='mt-4' onClick={allSelect}>Colors</h5>
            }
            {props.chatbot_form && allColors.length>show_first_n_checkbox
            ? 
            <Form className='m-auto' >
                {allColors.slice(0,show_first_n_checkbox)?.map((one_Color, index) => {
                    return (
                        <Form.Check
                            inline={props.isInline}
                            key={index}
                            type={"checkbox"}
                            id={index}
                            label={`${one_Color}`}
                            checked={(currentColors.length !== 0) ? (currentColors.includes(one_Color)) : false}
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
                : allColors.slice(show_first_n_checkbox,-1)?.map((one_Color, index) => {
                    return (
                        <Form.Check
                            inline={props.isInline}
                            key={index}
                            type={"checkbox"}
                            id={index}
                            label={`${one_Color}`}
                            checked={(currentColors.length !== 0) ? (currentColors.includes(one_Color)) : false}
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
                <Button variant="outlined" onClick={(show_more_ON)=>{
                    set_show_more_ON(false)
                }} size="sm" >show more</Button>
                :
                <Button variant="outlined" onClick={(show_more_ON)=>{
                    set_show_more_ON(true)
                }} size="sm" >show less</Button>
                }         

            </Form>
            :
            <Form className='m-auto' >
                {allColors?.map((one_Color, index) => {

                    return (
                        <Form.Check
                            key={index}
                            type={"checkbox"}
                            inline={props.isInline}
                            id={index}
                            label={`${one_Color}`}
                            checked={(currentColors.length !== 0) ? (currentColors.includes(one_Color)) : false}
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
                        submit_interaction_track(dispatch, props.chatbot_form, 'ColorCheckBox', currentColors.toString());
                        props.actionProvider.handle_Next_Question();
                    }}>
                        Confirm
                    </MuiButton>
                </div>
            }
        </div>
    )
}

export default ColorCheckBox;


