import {
  META_INTENTS_PROFILE_REQUEST,
  META_INTENTS_PROFILE_SUCCESS,
  META_INTENTS_PROFILE_FAIL,
  META_INTENTS_PROFILE_RESET
} from "../constants/metaIntentsProfileConstants.js";

// A total of five meta intent variables:
// MI_profile_Interest_In_Detail
// MI_profile_Scope_Of_Choice
// MI_profile_Dialog_Initiation
// MI_profile_Comparison_Orientation
// MI_profile_Explanation_Orientation
  
export const metaIntentsProfileReducer = (state = {
  
  // interest in detail state 
  // 0 => no interest in detail
  // 1 => interest in detail
  MI_profile_Interest_In_Detail: -1,

  // 3 level "show more" button:  
  //   0 => 4 prodcts
  //   1 => 8 prodcts
  //   2 => 16 prodcts
  //   3 => all prodcts
  MI_profile_Scope_Of_Choice: -1,

  // 0 => system initiative
  // 1 => user initiative
  MI_profile_Dialog_Initiation: -1,

  // 0 => no comparison orientation
  // 1 => comparison orientation
  MI_profile_Comparison_Orientation: -1,

  // explanation state 
  // 0 => no explanation
  // 1 => explanation
  MI_profile_Explanation_Orientation: -1,

}, action) => {
  switch (action.type) {
    case META_INTENTS_PROFILE_REQUEST:
      return { ...state, loading: true }
    case META_INTENTS_PROFILE_SUCCESS:
      return {
        loading: false,
        ...state,
        ...(action.payload)
      }
    case META_INTENTS_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}



