import axios from 'axios';
import { INTERACTION_TRACK_SUCCESS } from '../constants/interactionTrackConstants';


// JSON.parse(data)
// JSON.stringify(data)


//generates random id;
const generate_random_user_id = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// var data=[
//     {user_random_id: 125,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
//     {user_random_id: 124,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
// ];

//submit the all interactions from frontend store (reducer) to backend database
export const submitInteractionTrackAction = () => async (dispatch, getState) => {

    
    const { interactionTrackState } = getState().interactionTrackState

    try {
        await axios.post(
            '/api/interactions/submit',
            {
                "interactions": JSON.stringify(interactionTrackState)
            })

    } catch (error) {

    }

}



export const addOneInteractionTrackAction = (new_data) => async (dispatch, getState) => {

    var user_random_id = 0

    const { interactionTrackState } = getState().interactionTrackState
    const { userIndex } = getState().userIndexState
    const { userRG01 } = getState().userRG01State
    if (interactionTrackState.length === 0) {
        user_random_id = generate_random_user_id()
    } else {
        user_random_id = interactionTrackState[0].user_random_id
    }


    var new_interactionTrackState = interactionTrackState
    new_interactionTrackState.push({ 
        user_index: userIndex, 
        user_random_generator: userRG01,
        user_random_id: user_random_id, 
        ...new_data, 
        local_timestamps: Date.now() })
    
    // console.log("---new_interactionTrackState---",new_interactionTrackState)
    dispatch({
        type: INTERACTION_TRACK_SUCCESS,
        payload: new_interactionTrackState
    })
}



//submit the one interaction to frontend store (reducer)
export const submit_interaction_track = (dispatch, 
    chatbot_form, 
    components_name, 
    components_info, 
    intents='None', 
    intents_info='None'
    ) => {
    var components_context
    if (chatbot_form) {
        components_context = "chatbot"
    } else {
        components_context = "filter"
    }

    var one_interaction_data =
    {
        components_name: components_name,
        components_context: components_context,
        components_info: components_info,
        intents: intents,
        intents_info: intents_info
    }
    dispatch(addOneInteractionTrackAction(one_interaction_data))
}





// export const downloadInteractionTrack = async () => {
//     console.log("interaction_data---")

//     try {
//         const interaction_data = await axios.get(
//             '/api/interactions/download')
//         console.log(interaction_data)
//         return interaction_data
        
//     } catch (error) {

//     }

// }
