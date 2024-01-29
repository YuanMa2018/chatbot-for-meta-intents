import {
    NEW_CRITIQUED_PRODUCT_REQUEST,
    NEW_CRITIQUED_PRODUCT_SUCCESS,
    NEW_CRITIQUED_PRODUCT_FAIL,
    NEW_CRITIQUED_PRODUCT_RESET
} from "../constants/critiquingConstants.js";
import axios from "axios";


export const initialCritiquedProduct = (critiquedProduct_id) => async (dispatch) => {

    const { data } = await axios.get(`/api/products/${critiquedProduct_id}`);
    dispatch({ type: NEW_CRITIQUED_PRODUCT_SUCCESS, payload: data });
}


export const getNewCritiquedProduct = (critiquing_condition, previous_critiquing_condition, critiqued_product_id) => async (dispatch,getState) => {
    dispatch({
        type: NEW_CRITIQUED_PRODUCT_REQUEST
    })


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


    try {

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


        const { data } = await axios.post(`/api/critique/getNewCritiquedProduct?keyword=${keyword
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
            }`     
            ,
            {
                critiquing_condition: critiquing_condition,
                previous_critiquing_condition: previous_critiquing_condition,
                critiqued_product_id: critiqued_product_id
            }
        );

        var critiqued_product = data["newCritiquedProduct"]
        // console.log("critiqued_product")
        // console.log(critiqued_product)
        // console.log(typeof(critiqued_product))
        // no product meet condictions
        if(critiqued_product === 0){
            dispatch({
                type: NEW_CRITIQUED_PRODUCT_FAIL,
                payload: 0
              });
        }else{
            dispatch({ type: NEW_CRITIQUED_PRODUCT_SUCCESS, payload: critiqued_product });
        }

    } catch (error) {
        dispatch({
            type: NEW_CRITIQUED_PRODUCT_FAIL,
            payload: error
          });
    }
};







