import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer,createReviewReducer } from './reducers/productReducers';
import { productDetailReducer,topProductsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer,registerReducer,userDetailReducer } from './reducers/userReducer';
import { 
  
  allFilterStateReducer,
  oneFilterTotalValueReducer,
  initialOneFilterTotalValueReducer } from './reducers/filterReducer';

import {critiquedProductReducer} from './reducers/critiquedProductReducers';
import {guidingCenterStateReducer} from './reducers/guidingCenterStateReducers';
import {firstRankFeatureReducer} from './reducers/firstRankFeatureReducer';
import {conversationStyleReducer} from './reducers/conversationStyleReducer';
import { interactionTrackReducer } from './reducers/interactionTrackReducer';
import { userIndexReducer, userRG01Reducer } from './reducers/userIndexReducer';
import { backMainPageReducer } from './reducers/backMainPageStateReducer';
import { inMainPageReducer } from './reducers/inMainPageStateReducer';
import { metaIntentsInfluenceStateReducer } from './reducers/metaIntentsInfluenceStateReducer';
import { metaIntentsProfileReducer } from './reducers/metaIntentsProfileReducer';
import { callFunctionInChatbotReducer } from './reducers/callFunctionInChatbotReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  register: registerReducer,
  userDetail: userDetailReducer,
  createProductReview: createReviewReducer,
  topProducts:topProductsReducer,

  allFilterState:allFilterStateReducer,
  oneFilterTotalValue:oneFilterTotalValueReducer,
  initialOneFilterTotalValue:initialOneFilterTotalValueReducer,
  critiquedProduct:critiquedProductReducer,
  guidingCenterState:guidingCenterStateReducer,
  firstRankFeatureState:firstRankFeatureReducer,
  conversationStyleState:conversationStyleReducer,
  interactionTrackState:interactionTrackReducer,
  userIndexState:userIndexReducer,
  backMainPageState:backMainPageReducer,
  inMainPageState:inMainPageReducer,
  userRG01State:userRG01Reducer,
  metaIntentsInfluenceState:metaIntentsInfluenceStateReducer,
  metaIntentsProfileState:metaIntentsProfileReducer,
  callFunctionInChatbotState:callFunctionInChatbotReducer,
});

const CartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const UserInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null




const initialState = {
  cart: {
    cartItems: CartItemsFromStorage
  },
  userLogin:{
    userInfo:UserInfoFromStorage
  },
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export default store;


