import {
  META_INTENTS_INFLUENCE_STATE_REQUEST,
  META_INTENTS_INFLUENCE_STATE_SUCCESS,
  META_INTENTS_INFLUENCE_STATE_FAIL,
  META_INTENTS_INFLUENCE_STATE_RESET
} from "../constants/metaIntentsInfluenceStateConstants.js";

export const metaIntentsInfluenceStateReducer = (state = {
  // 0 => system initiative
  // 1 => user initiative
  initiative_preference__user_initiative__state: 1,
  user_initiative_times: 0,
  system_initiative_times: 0,


  // comparison times
  comparison_oriented__comparison_state: 0,
  comparison_oriented__comparison_list: [],
  comparison_oriented__comparison_times_in_UI:0,
  comparison_oriented__comparison_times_in_chatbot:0,
  comparison_oriented__add_item_times:0,
  comparison_oriented__remove_item_times:0,


  // critique times
  critiquing_oriented__critiquing_state: 0,
  critiquing_oriented__critiquing_times: 0,
  critiquing_oriented__adjust_feature_times: 0,
  // explanation state 
  // 0 => no explanation
  // 1 => explanation
  explanation_oriented__state: 0,

  // interest in detail state 
  // 0 => no interest in detail
  // 1 => interest in detail
  interest_in_detail__state: 0,
  interest_in_detail__times: 0,
  interest_in_detail__show_more_times: 0,
  interest_in_detail__show_less_times: 0,
  // 3 level "show more" button:  
  //   0 => 4 prodcts
  //   1 => 8 prodcts
  //   2 => 16 prodcts
  //   3 => all prodcts
  scope_of_choice__show_more__state: 0,

}, action) => {
  switch (action.type) {
    case META_INTENTS_INFLUENCE_STATE_REQUEST:
      return { ...state, loading: true }
    case META_INTENTS_INFLUENCE_STATE_SUCCESS:
      return {
        loading: false,
        ...state,
        ...(action.payload)
      }
    case META_INTENTS_INFLUENCE_STATE_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}



