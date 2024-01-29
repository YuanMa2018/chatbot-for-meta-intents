import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { updateCallFunctionInChatbotAction } from '../../actions/callFunctionInChatbotActions'
import { updateMetaIntentsInfluenceStateAction } from '../../actions/metaIntentsInfluenceStateActions'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

const Guiding_Comparison = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { chatbot_function__remind_comparison,
        chatbot_function__latest_checking_products_list } = useSelector(state => state.callFunctionInChatbotState)
    const { scope_of_choice__show_more__state,
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,
        // critique times
        critiquing_oriented__critiquing_state,
        critiquing_oriented__critiquing_times } = useSelector(state => state.metaIntentsInfluenceState)
    // useEffect(() => {
    //     if (chatbot_function__remind_comparison==1) {
    //         console.log("-----",chatbot_function__remind_comparison)


    //         dispatch(updateCallFunctionInChatbotAction({chatbot_function__remind_comparison:0}))
    //     }
    // }, [chatbot_function__remind_comparison]);

    const reset_comparison_list = async () => {
        if (chatbot_function__latest_checking_products_list?.length < 4) {
            if (comparison_oriented__comparison_list.length == 0) {
                dispatch(updateMetaIntentsInfluenceStateAction({
                    comparison_oriented__comparison_list: chatbot_function__latest_checking_products_list,
                }))
            } else {

                var temp_chatbot_function__latest_checking_products_list
                if (comparison_oriented__comparison_list.includes(chatbot_function__latest_checking_products_list[0])) {
                    temp_chatbot_function__latest_checking_products_list = [...(chatbot_function__latest_checking_products_list.slice(1))]
                } else {
                    temp_chatbot_function__latest_checking_products_list = [...chatbot_function__latest_checking_products_list]
                }

                if (comparison_oriented__comparison_list.length > (4 - chatbot_function__latest_checking_products_list.length)) {
                    var temp2 = comparison_oriented__comparison_list.slice(chatbot_function__latest_checking_products_list.length - 4)
                    dispatch(updateMetaIntentsInfluenceStateAction({
                        comparison_oriented__comparison_list: temp_chatbot_function__latest_checking_products_list.concat(temp2),
                    }))
                } else {
                    dispatch(updateMetaIntentsInfluenceStateAction({
                        comparison_oriented__comparison_list: [
                            ...comparison_oriented__comparison_list,
                            ...temp_chatbot_function__latest_checking_products_list,
                        ],
                    }))
                }
            }
        } else {
            dispatch(updateMetaIntentsInfluenceStateAction({
                comparison_oriented__comparison_list: chatbot_function__latest_checking_products_list.slice(0, 4),
            }))
        }
    }

    const go_to_comparison = async () => {

        await reset_comparison_list()
        navigate('/comparison')
        dispatch(updateCallFunctionInChatbotAction({
            chatbot_function__latest_checking_products_list: [],
        }))

        submit_interaction_track(
            dispatch,
            true,
            'comparing products',
            'previous comparison_oriented__comparison_times_in_chatbot=' + comparison_oriented__comparison_times_in_chatbot,
            'None',
            'Relevant MI:  comparison oriented',
        );
        dispatch(updateMetaIntentsInfluenceStateAction({
            comparison_oriented__comparison_times_in_chatbot: comparison_oriented__comparison_times_in_chatbot + 1,
            comparison_oriented__comparison_state: 1
        }))

    }

    const not_go_to_comparison = async () => {

        dispatch(updateCallFunctionInChatbotAction({
            // chatbot_function__latest_checking_products_list: [],
            // chatbot_function__remind_comparison:0
        }))


    }

    return (
        <div className="d-flex justify-content-center">
            <Button size="small" variant="outlined" className="mx-2" onClick={() => {
                // submit_interaction_track(dispatch, props.chatbot_form, "ScreenSizeRangeSlider", currentScreenSizeRange.toString());
                // props.actionProvider.handle_initial_Question();
                go_to_comparison()
                dispatch(updateCallFunctionInChatbotAction({ chatbot_function__remind_comparison: 0 }))
            }}>
                yes
            </Button>
            <br></br>
            <Button size="small" variant="outlined" className="mx-2" onClick={() => {
                // submit_interaction_track(dispatch, props.chatbot_form, "ScreenSizeRangeSlider", currentScreenSizeRange.toString());
                // not_go_to_comparison()
                props.actionProvider.handle_Next_Question();
            }}>
                no
            </Button>
        </div>
    );
};

export default Guiding_Comparison;
