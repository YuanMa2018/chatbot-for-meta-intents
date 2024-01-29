import Product from '../models/productModel.js';
import update_critiqued_item from './algorithms/critiquing_algorithm.js';

// @desc Fetch all products
// @route GET /api/getNewCritiquedProduct
// @access Public

const getNewCritiquedProduct = async (req, res) => {
    try {

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
            : {}

        const priceRange = req.query.maxPrice
            ? {
                price: {
                    $gte: req.query.minPrice,
                    $lte: req.query.maxPrice,
                }
            }
            : {}

        const brands = req.query.brands
            ? {
                brand: {
                    $in: req.query.brands.split(","),
                }
            }
            : {}

        const colorCategories = req.query.colorCategories
            ? {
                color_category: {
                    $in: req.query.colorCategories.split(","),
                }
            }
            : {}

        const operatingSystems = req.query.operatingSystems
            ? {
                operating_system: {
                    $in: req.query.operatingSystems.split(","),
                }
            }
            : {}

        const ratingRange = req.query.minRating
            ? {
                rating: {
                    $gte: req.query.minRating,
                    $lte: req.query.maxRating,
                }
            }
            : {}


        const numRatingRange = req.query.minNumRating
            ? {
                numRatings: {
                    $gte: req.query.minNumRating,
                    $lte: req.query.maxNumRating,
                }
            }
            : {}


        const modelYears = req.query.modelYears
            ? {
                model_year: {
                    $in: req.query.modelYears.split(","),
                }
            }
            : {}


        const RAMs = req.query.RAMs
            ? {
                RAM: {
                    $in: req.query.RAMs.split(","),
                }
            }
            : {}



        const ROMs = req.query.ROMs
            ? {
                ROM: {
                    $in: req.query.ROMs.split(","),
                }
            }
            : {}


        const cellularTechnologies = req.query.cellularTechnologies
            ? {
                cellular_technology: {
                    $in: req.query.cellularTechnologies.split(","),
                }
            }
            : {}

        const screenSizes = req.query.screenSizes
            ? {
                screen_size: {
                    $in: req.query.screenSizes.split(","),
                }
            }
            : {}


        const screenSizeRange = req.query.minScreenSizeRange
            ? {
                screen_size: {
                    $gte: req.query.minScreenSizeRange,
                    $lte: req.query.maxScreenSizeRange,
                }
            }
            : {}


        const wirelessCarriers = req.query.wirelessCarriers
            ? {
                wireless_carrier: {
                    $in: req.query.wirelessCarriers.split(","),
                }
            }
            : {}


        // New features from stiftungwarentest 08.12.2022
        const CameraScoreRange = req.query.minCameraScoreRange
            ? {
                camera_score: {
                    $gte: req.query.minCameraScoreRange,
                    $lte: req.query.maxCameraScoreRange,
                }
            }
            : {}
        
        const BatteryScoreRange = req.query.minBatteryScoreRange
            ? {
                battery_score: {
                    $gte: req.query.minBatteryScoreRange,
                    $lte: req.query.maxBatteryScoreRange,
                }
            }
            : {}
        
        const StabilityScoreRange = req.query.minStabilityScoreRange
            ? {
                Stability_score: {
                    $gte: req.query.minStabilityScoreRange,
                    $lte: req.query.maxStabilityScoreRange,
                }
            }
            : {}

        const MusicPlayerScoreRange = req.query.minMusicPlayerScoreRange
            ? {
                music_player_score: {
                    $gte: req.query.minMusicPlayerScoreRange,
                    $lte: req.query.maxMusicPlayerScoreRange,
                }
            }
            : {}

        const SurfingRatings = req.query.SurfingRatings
            ? {
                surfing_rating: {
                    $in: req.query.SurfingRatings.split(","),
                }
            }
            : {}

        const BackupPCRatings = req.query.BackupPCRatings
            ? {
                backup_PC_rating: {
                    $in: req.query.BackupPCRatings.split(","),
                }
            }
            : {}

        const ComputingPowerRatings = req.query.ComputingPowerRatings
            ? {
                computing_power_rating: {
                    $in: req.query.ComputingPowerRatings.split(","),
                }
            }
            : {}

        const InstructionForUseRatings = req.query.InstructionForUseRatings
            ? {
                instruction_for_use_rating: {
                    $in: req.query.InstructionForUseRatings.split(","),
                }
            }
            : {}

        const NetworkSensitivityRatings = req.query.NetworkSensitivityRatings
            ? {
                network_sensitivity_rating: {
                    $in: req.query.NetworkSensitivityRatings.split(","),
                }
            }
            : {}

        const DisplayScoreRange = req.query.minDisplayScoreRange
            ? {
                display_score: {
                    $gte: req.query.minDisplayScoreRange,
                    $lte: req.query.maxDisplayScoreRange,
                }
            }
            : {}

        const HeadphoneJack3mm5 = req.query.HeadphoneJack3mm5
            ? {
                Headphone_jack_3mm_5: {
                    $in: req.query.HeadphoneJack3mm5.split(","),
                }
            }
            : {}

        const BiometricUnlockRatings = req.query.BiometricUnlockRatings
            ? {
                biometric_unlock_rating: {
                    $in: req.query.BiometricUnlockRatings.split(","),
                }
            }
            : {}

        const MemoryCardSlot = req.query.MemoryCardSlot
            ? {
                memory_card_slot: {
                    $in: req.query.MemoryCardSlot.split(","),
                }
            }
            : {}

        const DualSim = req.query.DualSim
            ? {
                dual_sim: {
                    $in: req.query.DualSim.split(","),
                }
            }
            : {}

        const final_conditions = {
            ...keyword,
            ...priceRange,
            ...brands,
            ...colorCategories,
            ...operatingSystems,
            ...ratingRange,
            ...numRatingRange,
            ...modelYears,
            ...RAMs,
            ...ROMs,
            ...cellularTechnologies,
            ...screenSizes,
            ...screenSizeRange,
            ...wirelessCarriers,

            // New features from stiftungwarentest 08.12.2022
            ...CameraScoreRange,
            ...BatteryScoreRange,
            ...StabilityScoreRange,
            ...MusicPlayerScoreRange,
            ...SurfingRatings,
            ...BackupPCRatings,
            ...ComputingPowerRatings,
            ...InstructionForUseRatings,
            ...NetworkSensitivityRatings,
            ...DisplayScoreRange,
            ...HeadphoneJack3mm5,
            ...BiometricUnlockRatings,
            ...MemoryCardSlot,
            ...DualSim,

        }


        const count = await Product.countDocuments(final_conditions)
        const products = await Product.find(final_conditions)
        // console.log("count: ");
        // console.log(count);

        const { critiquing_condition } = req.body;
        const { previous_critiquing_condition } = req.body;
        // console.log("req.body: ");
        // console.log(req.body);

        const { critiqued_product_id } = req.body;
        const critiqued_product = await Product.findById(critiqued_product_id);
        // console.log("critiqued_product: ");
        // console.log(critiqued_product);
        // console.log("----------");
        // console.log("------critiquing_condition----",critiquing_condition);
        // console.log("------previous_critiquing_condition----",previous_critiquing_condition);
        // console.log("------critiqued_product----",critiqued_product);

        let newCritiquedProduct = update_critiqued_item(products, critiquing_condition, previous_critiquing_condition, critiqued_product)
        // console.log("----------");
        // console.log("newCritiquedProduct",newCritiquedProduct)
        res.json({ newCritiquedProduct })
    } catch (error) {
    }
}


export { getNewCritiquedProduct }


