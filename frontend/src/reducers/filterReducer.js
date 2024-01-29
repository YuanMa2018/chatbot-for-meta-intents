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

    INITIAL_ALL_FILTER_TOTAL_VALUE_SUCCESS,
    INITIAL_ALL_FILTER_TOTAL_VALUE_FAIL,

} from "../constants/filterConstant";









// Get all filter's current value or value range

export const allFilterStateReducer = (state = {
    allFilterState: {
        currentPageNumber: "",
        currentAllPageNumber: "",
        currentKeyword: "",
        currentPriceRange: [],
        currentBrands: [],
        currentColors: [],
        currentOperatingSystems: [],
        currentRatingRange: [],
        currentNumRatingRange: [],
        currentModelYears: [],
        currentRAMs: [],
        currentROMs: [],
        currentCellularTechnologies: [],
        currentScreenSizes: [],
        currentScreenSizeRange: [],
        currentWirelessCarriers: [],
        // currentSortKey: "_id", "numRatings","model_year"
        // currentSortValue: "1",
        currentSortKey: "numRatings",
        currentSortValue: "-1",
        message: "",

        // New features from stiftungwarentest 08.12.2022
        currentCameraScoreRange: [],
        currentBatteryScoreRange: [],
        currentStabilityScoreRange: [],
        currentMusicPlayerScoreRange: [],
        currentSurfingRating: [],
        currentBackupPCRating: [],
        currentComputingPowerRating: [],
        currentInstructionForUseRating: [],
        currentNetworkSensitivityRating: [],
        currentDisplayScoreRange: [],
        currentHeadphoneJack3mm5: [],
        currentBiometricUnlockRating: [],
        currentMemoryCardSlot: [],
        currentDualSim: [],
    }
}, action) => {
    switch (action.type) {
        case ALL_FILTER_STATE_SUCCESS:
            return { allFilterState: action.payload }

        case ALL_FILTER_STATE_FAIL:
            return { error: action.payload }

        case ALL_FILTER_STATE_RESET:
            return {
                allFilterState: {
                    currentPageNumber: "",
                    currentAllPageNumber: "",
                    currentKeyword: "",
                    currentPriceRange: [],
                    currentBrands: [],
                    currentColors: [],
                    currentOperatingSystems: [],
                    currentRatingRange: [],
                    currentNumRatingRange: [],
                    currentModelYears: [],
                    currentRAMs: [],
                    currentROMs: [],
                    currentCellularTechnologies: [],
                    currentScreenSizes: [],
                    currentScreenSizeRange: [],
                    currentWirelessCarriers: [],
                    currentSortKey: "_id",
                    currentSortValue: "1",
                    message: "",

                    // New features from stiftungwarentest 08.12.2022
                    currentCameraScoreRange: [],
                    currentBatteryScoreRange: [],
                    currentStabilityScoreRange: [],
                    currentMusicPlayerScoreRange: [],
                    currentSurfingRating: [],
                    currentBackupPCRating: [],
                    currentComputingPowerRating: [],
                    currentInstructionForUseRating: [],
                    currentNetworkSensitivityRating: [],
                    currentDisplayScoreRange: [],
                    currentHeadphoneJack3mm5: [],
                    currentBiometricUnlockRating: [],
                    currentMemoryCardSlot: [],
                    currentDualSim: [],

                }
            }

        default:
            return state
    }
}

// Get all filter's value range (for each one feature, get its filter range, accroding to all rest filters)
// the name oneFilterTotalValueReducer is old one, not stand for one filter! but all!
export const oneFilterTotalValueReducer = (state = {
    totalPriceRange: [],
    allBrands: [],
    allColors: [],
    allOperatingSystems: [],
    totalRatingRange: [],
    totalNumRatingRange: [],
    allModelYears: [],
    allRAMs: [],
    allROMs: [],
    allCellularTechnologies: [],
    allScreenSizes: [],
    totalScreenSizeRange: [],
    allWirelessCarriers: [],
    message: "",

    // New features from stiftungwarentest 08.12.2022
    totalCameraScoreRange: [],
    totalBatteryScoreRange: [],
    totalStabilityScoreRange: [],
    totalMusicPlayerScoreRange: [],
    allSurfingRating: [],
    allBackupPCRating: [],
    allComputingPowerRating: [],
    allInstructionForUseRating: [],
    allNetworkSensitivityRating: [],
    totalDisplayScoreRange: [],
    allHeadphoneJack3mm5: [],
    allBiometricUnlockRating: [],
    allMemoryCardSlot: [],
    allDualSim: [],

}, action) => {
    switch (action.type) {
        case ONE_FILTER_TOTAL_VALUE_SUCCESS:
            return {
                ...state,
                ...(action.payload)
            }
        case ONE_FILTER_TOTAL_VALUE_FAIL:
            return { error: action.payload }

        case ONE_FILTER_TOTAL_VALUE_RESET:
            return {
                totalPriceRange: [],
                allBrands: [],
                allColors: [],
                allOperatingSystems: [],
                totalRatingRange: [],
                totalNumRatingRange: [],
                allModelYears: [],
                allRAMs: [],
                allROMs: [],
                allCellularTechnologies: [],
                allScreenSizes: [],
                totalScreenSizeRange: [],
                allWirelessCarriers: [],
                message: "",

                // New features from stiftungwarentest 08.12.2022
                totalCameraScoreRange: [],
                totalBatteryScoreRange: [],
                totalStabilityScoreRange: [],
                totalMusicPlayerScoreRange: [],
                allSurfingRating: [],
                allBackupPCRating: [],
                allComputingPowerRating: [],
                allInstructionForUseRating: [],
                allNetworkSensitivityRating: [],
                totalDisplayScoreRange: [],
                allHeadphoneJack3mm5: [],
                allBiometricUnlockRating: [],
                allMemoryCardSlot: [],
                allDualSim: [],
            }

        case ALL_FILTER_TOTAL_VALUE_SUCCESS:
            return {
                ...(action.payload)
            }
        case ALL_FILTER_TOTAL_VALUE_FAIL:
            return { error: action.payload }

        case ALL_FILTER_TOTAL_VALUE_RESET:
            return {
                totalPriceRange: [],
                allBrands: [],
                allColors: [],
                allOperatingSystems: [],
                totalRatingRange: [],
                totalNumRatingRange: [],
                allModelYears: [],
                allRAMs: [],
                allROMs: [],
                allCellularTechnologies: [],
                allScreenSizes: [],
                totalScreenSizeRange: [],
                allWirelessCarriers: [],
                message: "",

                // New features from stiftungwarentest 08.12.2022
                totalCameraScoreRange: [],
                totalBatteryScoreRange: [],
                totalStabilityScoreRange: [],
                totalMusicPlayerScoreRange: [],
                allSurfingRating: [],
                allBackupPCRating: [],
                allComputingPowerRating: [],
                allInstructionForUseRating: [],
                allNetworkSensitivityRating: [],
                totalDisplayScoreRange: [],
                allHeadphoneJack3mm5: [],
                allBiometricUnlockRating: [],
                allMemoryCardSlot: [],
                allDualSim: [],
            }
        default:
            return state
    }
}


// intial value for all filters
export const initialOneFilterTotalValueReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIAL_ALL_FILTER_TOTAL_VALUE_SUCCESS:
            return {
                ...(action.payload)
            }
        default:
            return state
    }
}
