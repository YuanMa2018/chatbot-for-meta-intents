import axios from "axios";
import {
  PRODUCT_LSIT_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,

  TOP_PRODUCT_LSIT_REQUEST,
  TOP_PRODUCT_LIST_SUCCESS,
  TOP_PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

import {
  FIRST_RANK_FEATURE_SUCCESS,
  FIRST_RANK_FEATURE_RESET
} from "../constants/firstRankFeatureConstants"

import { ALL_FILTER_STATE_SUCCESS } from "../constants/filterConstant";

import { updateAllFilterState } from '../actions/filterActions'

export const listProducts = () => async (dispatch, getState) => {

  const { allFilterState } = getState().allFilterState
  const {
    currentPageNumber,
    currentKeyword,
    currentPriceRange,
    currentBrands,
    currentColors,
    currentOperatingSystems,
    currentRatingRange,
    currentNumRatingRange,
    currentModelYears,
    currentRAMs,
    currentROMs,
    currentCellularTechnologies,
    currentScreenSizes,
    currentScreenSizeRange,
    currentWirelessCarriers,
    currentSortKey,
    currentSortValue,

    // New features from stiftungwarentest 08.12.2022
    currentCameraScoreRange,
    currentBatteryScoreRange,
    currentStabilityScoreRange,
    currentMusicPlayerScoreRange,
    currentSurfingRating,
    currentBackupPCRating,
    currentComputingPowerRating,
    currentInstructionForUseRating,
    currentNetworkSensitivityRating,
    currentDisplayScoreRange,
    currentHeadphoneJack3mm5,
    currentBiometricUnlockRating,
    currentMemoryCardSlot,
    currentDualSim,

  } = allFilterState

  var page = ""
  var keyword = ""
  var minPrice = ""
  var maxPrice = ""
  var brands = ""
  var colorCategories = ""
  var operatingSystems = ""
  var minRating = ""
  var maxRating = ""
  var minNumRating = ""
  var maxNumRating = ""
  var modelYears = ""
  var RAMs = ""
  var ROMs = ""
  var cellularTechnologies = ""
  var screenSizes = ""
  var minScreenSizeRange = ""
  var maxScreenSizeRange = ""
  var wirelessCarriers = ""
  var sortKey = ""
  var sortValue = ""
  // New features from stiftungwarentest 08.12.2022
  var minCameraScoreRange = ""
  var maxCameraScoreRange = ""
  var minBatteryScoreRange = ""
  var maxBatteryScoreRange = ""
  var minStabilityScoreRange = ""
  var maxStabilityScoreRange = ""
  var minMusicPlayerScoreRange = ""
  var maxMusicPlayerScoreRange = ""
  var SurfingRatings = ""
  var BackupPCRatings = ""
  var ComputingPowerRatings = ""
  var InstructionForUseRatings = ""
  var NetworkSensitivityRatings = ""
  var minDisplayScoreRange = ""
  var maxDisplayScoreRange = ""
  var HeadphoneJack3mm5 = ""
  var BiometricUnlockRatings = ""
  var MemoryCardSlot = ""
  var DualSim = ""


  try {
    dispatch({ type: PRODUCT_LSIT_REQUEST });

    if (Boolean(currentPageNumber)) {
      page = currentPageNumber
    }

    if (Boolean(currentKeyword)) {
      keyword = currentKeyword
    }

    if (Boolean(currentPriceRange.length !== 0)) {
      [minPrice, maxPrice] = currentPriceRange
    }

    if (Boolean(currentBrands.length !== 0)) {
      brands = currentBrands
    }

    if (Boolean(currentColors.length !== 0)) {
      colorCategories = currentColors
    }

    if (Boolean(currentOperatingSystems.length !== 0)) {
      operatingSystems = currentOperatingSystems
    }

    if (Boolean(currentRatingRange.length !== 0)) {
      [minRating, maxRating] = currentRatingRange
    }

    if (Boolean(currentNumRatingRange.length !== 0)) {
      [minNumRating, maxNumRating] = currentNumRatingRange
    }

    if (Boolean(currentModelYears.length !== 0)) {
      modelYears = currentModelYears
    }

    if (Boolean(currentRAMs.length !== 0)) {
      RAMs = currentRAMs
    }

    if (Boolean(currentROMs.length !== 0)) {
      ROMs = currentROMs
    }

    if (Boolean(currentCellularTechnologies.length !== 0)) {
      cellularTechnologies = currentCellularTechnologies
    }

    if (Boolean(currentScreenSizes.length !== 0)) {
      screenSizes = currentScreenSizes
    }

    if (Boolean(currentScreenSizeRange.length !== 0)) {
      [minScreenSizeRange, maxScreenSizeRange] = currentScreenSizeRange
    }

    if (Boolean(currentWirelessCarriers.length !== 0)) {
      wirelessCarriers = currentWirelessCarriers
    }



    // New features from stiftungwarentest 08.12.2022

    if (Boolean(currentCameraScoreRange.length !== 0)) {
      [minCameraScoreRange, maxCameraScoreRange] = currentCameraScoreRange
    }
    if (Boolean(currentBatteryScoreRange.length !== 0)) {
      [minBatteryScoreRange, maxBatteryScoreRange] = currentBatteryScoreRange
    }
    if (Boolean(currentStabilityScoreRange.length !== 0)) {
      [minStabilityScoreRange, maxStabilityScoreRange] = currentStabilityScoreRange
    }
    if (Boolean(currentMusicPlayerScoreRange.length !== 0)) {
      [minMusicPlayerScoreRange, maxMusicPlayerScoreRange] = currentMusicPlayerScoreRange
    }
    if (Boolean(currentDisplayScoreRange.length !== 0)) {
      [minDisplayScoreRange, maxDisplayScoreRange] = currentDisplayScoreRange
    }
    if (Boolean(currentSurfingRating.length !== 0)) {
      SurfingRatings = currentSurfingRating
    }
    if (Boolean(currentBackupPCRating.length !== 0)) {
      BackupPCRatings = currentBackupPCRating
    }
    if (Boolean(currentComputingPowerRating.length !== 0)) {
      ComputingPowerRatings = currentComputingPowerRating
    }
    if (Boolean(currentInstructionForUseRating.length !== 0)) {
      InstructionForUseRatings = currentInstructionForUseRating
    }
    if (Boolean(currentNetworkSensitivityRating.length !== 0)) {
      NetworkSensitivityRatings = currentNetworkSensitivityRating
    }
    if (Boolean(currentHeadphoneJack3mm5.length !== 0)) {
      HeadphoneJack3mm5 = currentHeadphoneJack3mm5
    }
    if (Boolean(currentBiometricUnlockRating.length !== 0)) {
      BiometricUnlockRatings = currentBiometricUnlockRating
    }
    if (Boolean(currentMemoryCardSlot.length !== 0)) {
      MemoryCardSlot = currentMemoryCardSlot
    }
    if (Boolean(currentDualSim.length !== 0)) {
      DualSim = currentDualSim
    }


    sortKey = currentSortKey
    sortValue = currentSortValue

    const { data } = await axios.get(`/api/products?keyword=${keyword
      }&page=${page
      }&minPrice=${minPrice
      }&maxPrice=${maxPrice
      }&brands=${brands
      }&colorCategories=${colorCategories
      }&operatingSystems=${operatingSystems
      }&minRating=${minRating
      }&maxRating=${maxRating
      }&minNumRating=${minNumRating
      }&maxNumRating=${maxNumRating
      }&modelYears=${modelYears
      }&RAMs=${RAMs
      }&ROMs=${ROMs
      }&cellularTechnologies=${cellularTechnologies
      }&screenSizes=${screenSizes
      }&minScreenSizeRange=${minScreenSizeRange
      }&maxScreenSizeRange=${maxScreenSizeRange
      }&wirelessCarriers=${wirelessCarriers
      }&sortKey=${sortKey
      }&sortValue=${sortValue
      }&minCameraScoreRange=${minCameraScoreRange
      }&maxCameraScoreRange=${maxCameraScoreRange
      }&minBatteryScoreRange=${minBatteryScoreRange
      }&maxBatteryScoreRange=${maxBatteryScoreRange
      }&minStabilityScoreRange=${minStabilityScoreRange
      }&maxStabilityScoreRange=${maxStabilityScoreRange
      }&minMusicPlayerScoreRange=${minMusicPlayerScoreRange
      }&maxMusicPlayerScoreRange=${maxMusicPlayerScoreRange
      }&SurfingRatings=${SurfingRatings
      }&BackupPCRatings=${BackupPCRatings
      }&ComputingPowerRatings=${ComputingPowerRatings
      }&InstructionForUseRatings=${InstructionForUseRatings
      }&NetworkSensitivityRatings=${NetworkSensitivityRatings
      }&minDisplayScoreRange=${minDisplayScoreRange
      }&maxDisplayScoreRange=${maxDisplayScoreRange
      }&HeadphoneJack3mm5=${HeadphoneJack3mm5
      }&BiometricUnlockRatings=${BiometricUnlockRatings
      }&MemoryCardSlot=${MemoryCardSlot
      }&DualSim=${DualSim
      }`)

    // update page number
    var updateFilterState = {
      ...allFilterState, ...{
        currentPageNumber: data.page,
        currentAllPageNumber: data.totalPages,
      }
    }

    var first_rank_feature = data.first_rank_feature
    dispatch(
      { type: ALL_FILTER_STATE_SUCCESS, payload: updateFilterState }
    )


    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

    dispatch({ type: FIRST_RANK_FEATURE_SUCCESS, payload: first_rank_feature });
  }



  catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error
    });
  }
};

export const productDetail = (id, search) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    // console.log("----------")
    if (id === "000") {
      // console.log("---by search---")
      // console.log(`/api/products/bySearch${search}`)
      const { data } = await axios.get(`/api/products/bySearch${search}`);
      // console.log("---data by search---",data)
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } else {
      // console.log("---by id---")
      const { data } = await axios.get(`/api/products/${id}`);
      // console.log("---data by id---",data)
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    }

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error
    });
  }
};



export const createReviewAction = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    })

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer: ${userInfo.token}`
      }
    }

    const success = await axios.post(`/api/products/${productId}/reviews`, review, config)


    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: success.data.message
    })



  } catch (error) {
    // console.log(error)
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error
    })
  }

}


export const getTopProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCT_LSIT_REQUEST })
    const topProducts = await axios.get('/api/products/topProducts')
    const { data } = topProducts

    dispatch({ type: TOP_PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TOP_PRODUCT_LIST_FAIL,
      error: error
    })
  }
}


export const resetFirstFeatureState = () => (dispatch) => {
  dispatch(
    { type: FIRST_RANK_FEATURE_RESET }
  )
}



