import axios from "axios"
import {

    ALL_FILTER_STATE_REQUEST,
    ALL_FILTER_STATE_SUCCESS,
    ALL_FILTER_STATE_FAIL,
    ALL_FILTER_STATE_RESET,

    ONE_FILTER_TOTAL_VALUE_REQUEST,
    ONE_FILTER_TOTAL_VALUE_SUCCESS,
    ONE_FILTER_TOTAL_VALUE_FAIL,
    ONE_FILTER_TOTAL_VALUE_RESET,

    ALL_FILTER_TOTAL_VALUE_REQUEST,
    ALL_FILTER_TOTAL_VALUE_SUCCESS,
    ALL_FILTER_TOTAL_VALUE_FAIL,
    ALL_FILTER_TOTAL_VALUE_RESET,

    INITIAL_ALL_FILTER_TOTAL_VALUE_SUCCESS
} from "../constants/filterConstant";

import { listProducts } from './productActions';
import { setBackMainPageAction } from "./backMainPageActions";

export const getOneFilterTotalValue = (filterName) => async (dispatch, getState) => {
    dispatch({
        type: ONE_FILTER_TOTAL_VALUE_REQUEST
    })

    try {
        const { allFilterState } = getState().allFilterState
        const {
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


        if (Boolean(currentKeyword.length !== 0)) {
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



        const { data } = await axios.get(`/api/filters/getOneFilterTotalValue?filter=${filterName
            }&keyword=${keyword
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

        dispatch({
            type: ONE_FILTER_TOTAL_VALUE_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: ONE_FILTER_TOTAL_VALUE_FAIL,
            payload: error
        })
    }
}



export const getAllFilterTotalValue = () => async (dispatch, getState) => {
    // dispatch({
    //     type: ALL_FILTER_TOTAL_VALUE_REQUEST
    // })

    try {
        const { allFilterState } = getState().allFilterState
        const {
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

        if (Boolean(currentKeyword.length !== 0)) {
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



        const { data } = await axios.get(`/api/filters/getAllFilterTotalValue?keyword=${keyword
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

        dispatch({
            type: ALL_FILTER_TOTAL_VALUE_SUCCESS,
            payload: data.final_data
        })

        // initialize the all filters total range
        const initialOneFilterTotalValue_obj = getState().initialOneFilterTotalValue
        if (Object.keys(initialOneFilterTotalValue_obj).length === 0) {
            dispatch({
                type: INITIAL_ALL_FILTER_TOTAL_VALUE_SUCCESS,
                payload: data.final_data
            })
        }

    } catch (error) {
        dispatch({
            type: ALL_FILTER_TOTAL_VALUE_FAIL,
            payload: error
        })
    }
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a.length === 0 && b.length === 0) return true

    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const deepEqual = (new_object, existed_object) => {
    const key_list = Object.keys(new_object)
    if (key_list[0] === "currentPageNumber") {
        return false
    } else {
        for (let i = 0; i < key_list.length; i++) {
            if (!arraysEqual(new_object[key_list[i]], existed_object[key_list[i]])) {
                return false
            }
        }
        return true
    }
}



export const updateAllFilterState = (newFilter) => (dispatch, getState) => {

    const { allFilterState } = getState().allFilterState

    // for currentPageNumber, Object.values(newFilter)[0] is undefined (undefined!==0 is true)
    // for null obj like {currentROMs : []}, Object.values(newFilter)[0] is 0
    // for normal obj like {currentROMs : ['128','256']}, Object.values(newFilter)[0] is 2
    if (Object.values(newFilter)[0].length !== 0) {
        var updateFilterState = {}
        if (Object.keys(newFilter)[0] === "currentPageNumber") {
            updateFilterState = { ...allFilterState, ...newFilter }
        } else {
            updateFilterState = { ...allFilterState, ...newFilter, ...{ "currentPageNumber": 1 } }
        }

        dispatch(
            { type: ALL_FILTER_STATE_SUCCESS, payload: updateFilterState }
        )

        // After update, reload products
        dispatch(listProducts())
        // After update and reload products, update filter widgets value range
        dispatch(getAllFilterTotalValue())
        // After update, reload products and filter widgets value range, go back to to main page
        dispatch(setBackMainPageAction(true))
    }


}


export const resetAllFilterState = () => (dispatch) => {
    dispatch(
        { type: ALL_FILTER_STATE_RESET }
    )
    // After update, reload products
    dispatch(listProducts())
    // After update and reload products, update filter widgets value range
    dispatch(getAllFilterTotalValue())
}
