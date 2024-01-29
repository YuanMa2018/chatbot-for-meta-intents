import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { updateCallFunctionInChatbotAction } from '../../actions/callFunctionInChatbotActions'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'

const Guiding_ClickToStart = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { chatbot_function__remind_comparison } = useSelector(state => state.callFunctionInChatbotState)

    const {
        MI_profile_Interest_In_Detail,
        MI_profile_Scope_Of_Choice,
        MI_profile_Dialog_Initiation,
        MI_profile_Comparison_Orientation,
        MI_profile_Explanation_Orientation, } = useSelector(state => state.metaIntentsProfileState)

    useEffect(() => {
        if (MI_profile_Comparison_Orientation == 1) {
            if (chatbot_function__remind_comparison == 1) {
                props.actionProvider.handle_remind_user_to_compare()
            }
        }
    }, [chatbot_function__remind_comparison]);


    return (
        <div className="d-flex flex-column justify-content-center">
            <Button size="small" variant="outlined" onClick={() => {
                // submit_interaction_track(dispatch, props.chatbot_form, "ScreenSizeRangeSlider", currentScreenSizeRange.toString());
                props.actionProvider.handle_initial_Question();
            }}>
                Click to start!
            </Button>
        </div>
    );
};

export default Guiding_ClickToStart;
