import Product from '../models/productModel.js';

// @dest Fetch one filter range. This is old one with low efficiency, check the later one: all
// @route GET /api/filters/getOneFilterTotalValue
// @access Public
// export const getOneFilterTotalValue = async (req, res) => {
//     try {

//         const keyword = req.query.keyword
//             ? {
//                 name: {
//                     $regex: req.query.keyword,
//                     $options: 'i'
//                 }
//             }
//             : {}

//         const priceRange = req.query.maxPrice
//             ? {
//                 price: {
//                     $gte: req.query.minPrice,
//                     $lte: req.query.maxPrice,
//                 }
//             }
//             : {}

//         const brands = req.query.brands
//             ? {
//                 brand: {
//                     $in: req.query.brands.split(","),
//                 }
//             }
//             : {}

//         const colorCategories = req.query.colorCategories
//             ? {
//                 color_category: {
//                     $in: req.query.colorCategories.split(","),
//                 }
//             }
//             : {}

//         const operatingSystems = req.query.operatingSystems
//             ? {
//                 operating_system: {
//                     $in: req.query.operatingSystems.split(","),
//                 }
//             }
//             : {}

//         const ratingRange = req.query.minRating
//             ? {
//                 rating: {
//                     $gte: req.query.minRating,
//                     $lte: req.query.maxRating,
//                 }
//             }
//             : {}


//         const numRatingRange = req.query.minNumRating
//             ? {
//                 numRatings: {
//                     $gte: req.query.minNumRating,
//                     $lte: req.query.maxNumRating,
//                 }
//             }
//             : {}


//         const modelYears = req.query.modelYears
//             ? {
//                 model_year: {
//                     $in: req.query.modelYears.split(","),
//                 }
//             }
//             : {}


//         const RAMs = req.query.RAMs
//             ? {
//                 RAM: {
//                     $in: req.query.RAMs.split(","),
//                 }
//             }
//             : {}



//         const ROMs = req.query.ROMs
//             ? {
//                 ROM: {
//                     $in: req.query.ROMs.split(","),
//                 }
//             }
//             : {}

//         const cellularTechnologies = req.query.cellularTechnologies
//             ? {
//                 cellular_technology: {
//                     $in: req.query.cellularTechnologies.split(","),
//                 }
//             }
//             : {}

//         const screenSizes = req.query.screenSizes
//             ? {
//                 screen_size: {
//                     $in: req.query.screenSizes.split(","),
//                 }
//             }
//             : {}


//         const wirelessCarriers = req.query.wirelessCarriers
//             ? {
//                 wireless_carrier: {
//                     $in: req.query.wirelessCarriers.split(","),
//                 }
//             }
//             : {}



//         // New features from stiftungwarentest 08.12.2022
//         const CameraScoreRange = req.query.minCameraScoreRange
//             ? {
//                 camera_score: {
//                     $gte: req.query.minCameraScoreRange,
//                     $lte: req.query.maxCameraScoreRange,
//                 }
//             }
//             : {}

//         const BatteryScoreRange = req.query.minBatteryScoreRange
//             ? {
//                 battery_score: {
//                     $gte: req.query.minBatteryScoreRange,
//                     $lte: req.query.maxBatteryScoreRange,
//                 }
//             }
//             : {}

//         const StabilityScoreRange = req.query.minStabilityScoreRange
//             ? {
//                 Stability_score: {
//                     $gte: req.query.minStabilityScoreRange,
//                     $lte: req.query.maxStabilityScoreRange,
//                 }
//             }
//             : {}

//         const MusicPlayerScoreRange = req.query.minMusicPlayerScoreRange
//             ? {
//                 music_player_score: {
//                     $gte: req.query.minMusicPlayerScoreRange,
//                     $lte: req.query.maxMusicPlayerScoreRange,
//                 }
//             }
//             : {}

//         const SurfingRatings = req.query.SurfingRatings
//             ? {
//                 surfing_rating: {
//                     $in: req.query.SurfingRatings.split(","),
//                 }
//             }
//             : {}

//         const BackupPCRatings = req.query.BackupPCRatings
//             ? {
//                 backup_PC_rating: {
//                     $in: req.query.BackupPCRatings.split(","),
//                 }
//             }
//             : {}

//         const ComputingPowerRatings = req.query.ComputingPowerRatings
//             ? {
//                 computing_power_rating: {
//                     $in: req.query.ComputingPowerRatings.split(","),
//                 }
//             }
//             : {}

//         const InstructionForUseRatings = req.query.InstructionForUseRatings
//             ? {
//                 instruction_for_use_rating: {
//                     $in: req.query.InstructionForUseRatings.split(","),
//                 }
//             }
//             : {}

//         const NetworkSensitivityRatings = req.query.NetworkSensitivityRatings
//             ? {
//                 network_sensitivity_rating: {
//                     $in: req.query.NetworkSensitivityRatings.split(","),
//                 }
//             }
//             : {}

//         const DisplayScoreRange = req.query.minDisplayScoreRange
//             ? {
//                 display_score: {
//                     $gte: req.query.minDisplayScoreRange,
//                     $lte: req.query.maxDisplayScoreRange,
//                 }
//             }
//             : {}

//         const HeadphoneJack3mm5 = req.query.HeadphoneJack3mm5
//             ? {
//                 Headphone_jack_3mm_5: {
//                     $in: req.query.HeadphoneJack3mm5.split(","),
//                 }
//             }
//             : {}

//         const BiometricUnlockRatings = req.query.BiometricUnlockRatings
//             ? {
//                 biometric_unlock_rating: {
//                     $in: req.query.BiometricUnlockRatings.split(","),
//                 }
//             }
//             : {}

//         const MemoryCardSlot = req.query.MemoryCardSlot
//             ? {
//                 memory_card_slot: {
//                     $in: req.query.MemoryCardSlot.split(","),
//                 }
//             }
//             : {}

//         const DualSim = req.query.DualSim
//             ? {
//                 dual_sim: {
//                     $in: req.query.DualSim.split(","),
//                 }
//             }
//             : {}



//         const final_conditions = {
//             ...keyword,
//             ...priceRange,
//             ...brands,
//             ...colorCategories,
//             ...operatingSystems,
//             ...ratingRange,
//             ...numRatingRange,
//             ...modelYears,
//             ...RAMs,
//             ...ROMs,
//             ...cellularTechnologies,
//             ...screenSizes,
//             ...wirelessCarriers,

//             // New features from stiftungwarentest 08.12.2022
//             ...CameraScoreRange,
//             ...BatteryScoreRange,
//             ...StabilityScoreRange,
//             ...MusicPlayerScoreRange,
//             ...SurfingRatings,
//             ...BackupPCRatings,
//             ...ComputingPowerRatings,
//             ...InstructionForUseRatings,
//             ...NetworkSensitivityRatings,
//             ...DisplayScoreRange,
//             ...HeadphoneJack3mm5,
//             ...BiometricUnlockRatings,
//             ...MemoryCardSlot,
//             ...DualSim,
//         }

//         var rating_words_rank = ['sufficient','satisfactory','good','very good']

//         switch (req.query.filter) {
//             case "priceRange":
//                 delete final_conditions.price
//                 const minimal_value_priceRange = await Product.find(final_conditions).sort({ price: 1 }).limit(1);
//                 const maximal_value_priceRange = await Product.find(final_conditions).sort({ price: -1 }).limit(1);
//                 const totalPriceRange = [minimal_value_priceRange[0].price, maximal_value_priceRange[0].price]
//                 res.json({ totalPriceRange: totalPriceRange });
//                 break;

//             case "brands":
//                 delete final_conditions.brand
//                 const allBrands = await Product.find(final_conditions).distinct("brand")
//                 res.json({ allBrands: allBrands.filter(n => n) })
//                 break;

//             case "colorCategories":
//                 delete final_conditions.color_category
//                 const allColors = await Product.find(final_conditions).distinct("color_category")
//                 res.json({ allColors: allColors.filter(n => n) })
//                 break;

//             case "operatingSystems":
//                 delete final_conditions.operating_system
//                 const allOperatingSystems = await Product.find(final_conditions).distinct("operating_system")
//                 res.json({ allOperatingSystems: allOperatingSystems.filter(n => n) })
//                 break;

//             case "ratingRange":
//                 delete final_conditions.rating
//                 const minimal_value_ratingRange = await Product.find(final_conditions).sort({ rating: 1 }).limit(1);
//                 const maximal_value_ratingRange = await Product.find(final_conditions).sort({ rating: -1 }).limit(1);
//                 const totalRatingRange = [minimal_value_ratingRange[0].rating, maximal_value_ratingRange[0].rating]
//                 res.json({ totalRatingRange: totalRatingRange });
//                 break;

//             case "numRatingRange":
//                 delete final_conditions.numRatings
//                 const minimal_value_numRatingRange = await Product.find(final_conditions).sort({ numRatings: 1 }).limit(1);
//                 const maximal_value_numRatingRange = await Product.find(final_conditions).sort({ numRatings: -1 }).limit(1);
//                 const totalNumRatingRange = [minimal_value_numRatingRange[0].numRatings, maximal_value_numRatingRange[0].numRatings]
//                 res.json({ totalNumRatingRange: totalNumRatingRange });
//                 break;

//             case "modelYears":
//                 delete final_conditions.model_year
//                 const allModelYears = await Product.find(final_conditions).distinct("model_year")
//                 res.json({ allModelYears: allModelYears.filter(n => n) })
//                 break;


//             case "RAMs":
//                 delete final_conditions.RAM
//                 const allRAMs = await Product.find(final_conditions).distinct("RAM")
//                 res.json({ allRAMs: allRAMs.filter(n => n) })
//                 break;


//             case "ROMs":
//                 delete final_conditions.ROM
//                 const allROMs = await Product.find(final_conditions).distinct("ROM")
//                 res.json({ allROMs: allROMs.filter(n => n) })
//                 break;



//             case "cellularTechnologies":
//                 delete final_conditions.cellular_technology
//                 const allCellularTechnologies = await Product.find(final_conditions).distinct("cellular_technology")
//                 res.json({ allCellularTechnologies: allCellularTechnologies.filter(n => n) })
//                 break;


//             case "screenSizes":
//                 delete final_conditions.screen_size
//                 const allScreenSizes = await Product.find(final_conditions).distinct("screen_size")
//                 res.json({ allScreenSizes: allScreenSizes.filter(n => n) })
//                 break;


//             case "wirelessCarriers":
//                 delete final_conditions.wireless_carrier
//                 const allWirelessCarriers = await Product.find(final_conditions).distinct("wireless_carrier")
//                 res.json({ allWirelessCarriers: allWirelessCarriers.filter(n => n) })
//                 break;

//             // New features from stiftungwarentest 08.12.2022
//             case "CameraScoreRange":
//                 delete final_conditions.camera_score
//                 const minimal_CameraScoreRange_value = await Product.find(final_conditions).sort({ camera_score: 1 }).limit(1);
//                 const maximal_CameraScoreRange_value = await Product.find(final_conditions).sort({ camera_score: -1 }).limit(1);
//                 const totalCameraScoreRange = [minimal_CameraScoreRange_value[0].camera_score, maximal_CameraScoreRange_value[0].camera_score]
//                 res.json({ totalCameraScoreRange: totalCameraScoreRange });
//                 break;

//             case "BatteryScoreRange":
//                 delete final_conditions.battery_score
//                 const minimal_BatteryScoreRange_value = await Product.find(final_conditions).sort({ battery_score: 1 }).limit(1);
//                 const maximal_BatteryScoreRange_value = await Product.find(final_conditions).sort({ battery_score: -1 }).limit(1);
//                 const totalBatteryScoreRange = [minimal_BatteryScoreRange_value[0].battery_score, maximal_BatteryScoreRange_value[0].battery_score]
//                 res.json({ totalBatteryScoreRange: totalBatteryScoreRange });
//                 break;

//             case "StabilityScoreRange":
//                 delete final_conditions.Stability_score
//                 const minimal_StabilityScoreRange_value = await Product.find(final_conditions).sort({ Stability_score: 1 }).limit(1);
//                 const maximal_StabilityScoreRange_value = await Product.find(final_conditions).sort({ Stability_score: -1 }).limit(1);
//                 const totalStabilityScoreRange = [minimal_StabilityScoreRange_value[0].Stability_score, maximal_StabilityScoreRange_value[0].Stability_score]
//                 res.json({ totalStabilityScoreRange: totalStabilityScoreRange });
//                 break;

//             case "MusicPlayerScoreRange":
//                 delete final_conditions.music_player_score
//                 const minimal_MusicPlayerScoreRange_value = await Product.find(final_conditions).sort({ music_player_score: 1 }).limit(1);
//                 const maximal_MusicPlayerScoreRange_value = await Product.find(final_conditions).sort({ music_player_score: -1 }).limit(1);
//                 const totalMusicPlayerScoreRange = [minimal_MusicPlayerScoreRange_value[0].music_player_score, maximal_MusicPlayerScoreRange_value[0].music_player_score]
//                 res.json({ totalMusicPlayerScoreRange: totalMusicPlayerScoreRange });
//                 break;


//             case "SurfingRatings":
//                 delete final_conditions.surfing_rating
//                 const allSurfingRating = await Product.find(final_conditions).distinct("surfing_rating")
//                 res.json({ allSurfingRating: allSurfingRating.filter(n => n) })
//                 break;


//             case "BackupPCRatings":
//                 delete final_conditions.backup_PC_rating
//                 const allBackupPCRating = await Product.find(final_conditions).distinct("backup_PC_rating")
//                 res.json({ allBackupPCRating: allBackupPCRating.filter(n => n) })
//                 break;

//             case "ComputingPowerRatings":
//                 delete final_conditions.computing_power_rating
//                 const allComputingPowerRating = await Product.find(final_conditions).distinct("computing_power_rating")
//                 res.json({ allComputingPowerRating: allComputingPowerRating.filter(n => n)})
//                 break;

//             case "InstructionForUseRatings":
//                 delete final_conditions.instruction_for_use_rating
//                 const allInstructionForUseRating = await Product.find(final_conditions).distinct("instruction_for_use_rating")
//                 res.json({ allInstructionForUseRating: allInstructionForUseRating.filter(n => n) })
//                 break;

//             case "NetworkSensitivityRatings":
//                 delete final_conditions.network_sensitivity_rating
//                 const allNetworkSensitivityRating = await Product.find(final_conditions).distinct("network_sensitivity_rating")
//                 res.json({ allNetworkSensitivityRating: allNetworkSensitivityRating.filter(n => n) })
//                 break;


//             case "DisplayScoreRange":
//                 delete final_conditions.display_score
//                 const minimal_DisplayScoreRange_value = await Product.find(final_conditions).sort({ display_score: 1 }).limit(1);
//                 const maximal_DisplayScoreRange_value = await Product.find(final_conditions).sort({ display_score: -1 }).limit(1);
//                 const totalDisplayScoreRange = [minimal_DisplayScoreRange_value[0].display_score, maximal_DisplayScoreRange_value[0].display_score]
//                 res.json({ totalDisplayScoreRange: totalDisplayScoreRange });
//                 break;


//             case "HeadphoneJack3mm5":
//                 delete final_conditions.Headphone_jack_3mm_5
//                 const allHeadphoneJack3mm5 = await Product.find(final_conditions).distinct("Headphone_jack_3mm_5")
//                 res.json({ allHeadphoneJack3mm5: allHeadphoneJack3mm5.filter(n => n) })
//                 break;

//             case "BiometricUnlockRatings":
//                 delete final_conditions.biometric_unlock_rating
//                 const allBiometricUnlockRating = await Product.find(final_conditions).distinct("biometric_unlock_rating")
//                 res.json({ allBiometricUnlockRating: allBiometricUnlockRating.filter(n => n) })
//                 break;

//             case "MemoryCardSlot":
//                 delete final_conditions.memory_card_slot
//                 const allMemoryCardSlot = await Product.find(final_conditions).distinct("memory_card_slot")
//                 res.json({ allMemoryCardSlot: allMemoryCardSlot.filter(n => n) })
//                 break;

//             case "DualSim":
//                 delete final_conditions.dual_sim
//                 const allDualSim = await Product.find(final_conditions).distinct("dual_sim")
//                 res.json({ allDualSim: allDualSim.filter(n => n) })
//                 break;


//             default:
//                 res.json({ message: "default" })
//                 break
//         }

//     } catch (error) {
//         res.status(200).json({ message: error, stack: error.stack })
//     }
// }




// @dest Fetch all filters range (This new one !)
// @route GET /api/filters/getAllFilterTotalValue
// @access Public


export const getAllFilterTotalValue = async (req, res) => {
    try {

        const priceRange = req.query.maxPrice
            ? {
                price: {
                    $gte: parseInt(req.query.minPrice),
                    $lte: parseInt(req.query.maxPrice),
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
                    $gte: parseFloat(req.query.minRating),
                    $lte: parseFloat(req.query.maxRating),
                }
            }
            : {}


        const numRatingRange = req.query.minNumRating
            ? {
                numRatings: {
                    $gte: parseFloat(req.query.minNumRating),
                    $lte: parseFloat(req.query.maxNumRating),
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
                    // $in: req.query.ROMs.split(",")?.map((one_rom) => parseInt(one_rom)),
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


        // const screenSizes = req.query.screenSizes
        //     ? {
        //         screen_size: {
        //             $in: req.query.screenSizes.split(","),
        //         }
        //     }
        //     : {}


        const screenSizeRange = req.query.minScreenSizeRange
            ? {
                screen_size: {
                    $gte: parseFloat(req.query.minScreenSizeRange),
                    $lte: parseFloat(req.query.maxScreenSizeRange),
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
                    $gte: parseFloat(req.query.minCameraScoreRange),
                    $lte: parseFloat(req.query.maxCameraScoreRange),
                }
            }
            : {}

        const BatteryScoreRange = req.query.minBatteryScoreRange
            ? {
                battery_score: {
                    $gte: parseFloat(req.query.minBatteryScoreRange),
                    $lte: parseFloat(req.query.maxBatteryScoreRange),
                }
            }
            : {}

        const StabilityScoreRange = req.query.minStabilityScoreRange
            ? {
                Stability_score: {
                    $gte: parseFloat(req.query.minStabilityScoreRange),
                    $lte: parseFloat(req.query.maxStabilityScoreRange),
                }
            }
            : {}

        const MusicPlayerScoreRange = req.query.minMusicPlayerScoreRange
            ? {
                music_player_score: {
                    $gte: parseFloat(req.query.minMusicPlayerScoreRange),
                    $lte: parseFloat(req.query.maxMusicPlayerScoreRange),
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
                    $gte: parseFloat(req.query.minDisplayScoreRange),
                    $lte: parseFloat(req.query.maxDisplayScoreRange),
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
            // ...screenSizes,
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


        var match_conditions = [
            priceRange,
            brands,
            colorCategories,
            operatingSystems,
            ratingRange,
            numRatingRange,
            modelYears,
            RAMs,
            ROMs,
            cellularTechnologies,
            // screenSizes,
            screenSizeRange,
            wirelessCarriers,


            // New features from stiftungwarentest 08.12.2022
            CameraScoreRange,
            BatteryScoreRange,
            StabilityScoreRange,
            MusicPlayerScoreRange,
            SurfingRatings,
            BackupPCRatings,
            ComputingPowerRatings,
            InstructionForUseRatings,
            NetworkSensitivityRatings,
            DisplayScoreRange,
            HeadphoneJack3mm5,
            BiometricUnlockRatings,
            MemoryCardSlot,
            DualSim,
        ]




        var final_data = {
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
            // allScreenSizes: [],
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

        const filters_list = [
            "totalPriceRange",
            "allBrands",
            "allColors",
            "allOperatingSystems",
            "totalRatingRange",
            "totalNumRatingRange",
            "allModelYears",
            "allRAMs",
            "allROMs",
            "allCellularTechnologies",
            // "allScreenSizes",
            "totalScreenSizeRange",
            "allWirelessCarriers",

            // New features from stiftungwarentest 08.12.2022
            "totalCameraScoreRange",
            "totalBatteryScoreRange",
            "totalStabilityScoreRange",
            "totalMusicPlayerScoreRange",
            "allSurfingRating",
            "allBackupPCRating",
            "allComputingPowerRating",
            "allInstructionForUseRating",
            "allNetworkSensitivityRating",
            "totalDisplayScoreRange",
            "allHeadphoneJack3mm5",
            "allBiometricUnlockRating",
            "allMemoryCardSlot",
            "allDualSim",

        ]

        var rating_words_rank = ['sufficient', 'satisfactory', 'good', 'very good']

        for (let i = 0; i < filters_list.length; i++) {

            var temp_final_conditions = JSON.parse(JSON.stringify(final_conditions))

            switch (filters_list[i]) {

                case "totalPriceRange":

                    delete temp_final_conditions.price
                    const minimal_value_priceRange = await Product.find(temp_final_conditions).sort({ price: 1 }).limit(1);
                    const maximal_value_priceRange = await Product.find(temp_final_conditions).sort({ price: -1 }).limit(1);
                    const totalPriceRange = [minimal_value_priceRange[0].price, maximal_value_priceRange[0].price]
                    final_data = { ...final_data, ...{ "totalPriceRange": totalPriceRange } };
                    break;

                case "allBrands":

                    // Only for return available brands
                    // delete temp_final_conditions.brand
                    // const allBrands = await Product.find(temp_final_conditions).distinct("brand")

                    // Only for ranking brands by numRatings
                    // const allBrands_temp = await Product.aggregate([{$group : {_id : "$brand", count : {$sum : "$numRatings"}}}]).sort({count:-1})
                    // let allBrands = allBrands_temp.map(element => {
                    //     return element._id
                    // })

                    // both of them
                    var final_match_conditions = []
                    match_conditions.forEach(function (item, index) {
                        if (Object.keys(item).length !== 0 & Object.keys(item)[0] !== "brand") {
                            final_match_conditions.push(item);
                        }
                    });

                    if (final_match_conditions.length === 0) {
                        final_match_conditions = [{}]
                    }
                    var pipeline = [
                        { $match: { $and: final_match_conditions } },

                        { $group: { _id: "$brand", count: { $sum: "$numRatings" } } },

                        { $sort: { count: -1 } }
                    ];
                    var allBrands_temp = Product.aggregate(pipeline);
                    var allBrands = []
                    for await (const one_brand of allBrands_temp) {
                        allBrands.push(Object.values(one_brand)[0])
                    }

                    final_data = { ...final_data, ...{ "allBrands": allBrands } };
                    break;

                case "allColors":
                    // delete temp_final_conditions.color_category
                    // const allColors = await Product.find(temp_final_conditions).distinct("color_category")

                    var final_match_conditions = []
                    match_conditions.forEach(function (item, index) {
                        if (Object.keys(item).length !== 0 & Object.keys(item)[0] !== "color_category") {
                            final_match_conditions.push(item);
                        }
                    });

                    if (final_match_conditions.length === 0) {
                        final_match_conditions = [{}]
                    }
                    var pipeline = [
                        { $match: { $and: final_match_conditions } },

                        { $group: { _id: "$color_category", count: { $sum: "$numRatings" } } },

                        { $sort: { count: -1 } }
                    ];
                    var allColors_temp = Product.aggregate(pipeline);
                    var allColors = []
                    for await (const one_brand of allColors_temp) {
                        allColors.push(Object.values(one_brand)[0])
                    }

                    final_data = { ...final_data, ...{ "allColors": allColors } };

                    break;

                case "allOperatingSystems":
                    delete temp_final_conditions.operating_system
                    var current_allOperatingSystems = await Product.find(temp_final_conditions).distinct("operating_system")
                    const allOperatingSystems = current_allOperatingSystems.filter(n => n)
                    final_data = { ...final_data, ...{ "allOperatingSystems": allOperatingSystems } };

                    break;

                case "totalRatingRange":
                    delete temp_final_conditions.rating
                    const minimal_value_ratingRange = await Product.find(temp_final_conditions).sort({ rating: 1 }).limit(1);
                    const maximal_value_ratingRange = await Product.find(temp_final_conditions).sort({ rating: -1 }).limit(1);
                    const totalRatingRange = [minimal_value_ratingRange[0].rating, maximal_value_ratingRange[0].rating]
                    final_data = { ...final_data, ...{ "totalRatingRange": totalRatingRange } };
                    break;

                case "totalNumRatingRange":
                    delete temp_final_conditions.numRatings
                    const minimal_value_numRatingRange = await Product.find(temp_final_conditions).sort({ numRatings: 1 }).limit(1);
                    const maximal_value_numRatingRange = await Product.find(temp_final_conditions).sort({ numRatings: -1 }).limit(1);
                    const totalNumRatingRange = [minimal_value_numRatingRange[0].numRatings, maximal_value_numRatingRange[0].numRatings]
                    final_data = { ...final_data, ...{ "totalNumRatingRange": totalNumRatingRange } };

                    break;

                case "allModelYears":
                    delete temp_final_conditions.model_year
                    var current_allModelYears = await Product.find(temp_final_conditions).distinct("model_year")
                    const allModelYears = current_allModelYears.filter(n => n)
                    final_data = { ...final_data, ...{ "allModelYears": allModelYears } };

                    break;



                case "allRAMs":
                    delete temp_final_conditions.RAM
                    var unclean_allRAMs = await Product.find(temp_final_conditions).distinct("RAM")
                    const allRAMs = unclean_allRAMs.filter(n => n).sort(function (a, b) {
                        return a - b
                    })
                    final_data = { ...final_data, ...{ "allRAMs": allRAMs } };

                    break;


                case "allROMs":
                    delete temp_final_conditions.ROM
                    var unclean_allROMs = await Product.find(temp_final_conditions).distinct("ROM")
                    const allROMs = unclean_allROMs.filter(n => n).sort(function (a, b) {
                        return a - b
                    })
                    final_data = { ...final_data, ...{ "allROMs": allROMs } };

                    break;



                case "allCellularTechnologies":
                    delete temp_final_conditions.cellular_technology
                    const allCellularTechnologies = await Product.find(temp_final_conditions).distinct("cellular_technology")
                    final_data = { ...final_data, ...{ "allCellularTechnologies": allCellularTechnologies } };

                    break;


                // case "allScreenSizes":
                //     delete temp_final_conditions.screen_size
                //     var current_allScreenSizes = await Product.find(temp_final_conditions).distinct("screen_size")
                //     const allScreenSizes = current_allScreenSizes.filter(n => n)
                //     final_data = { ...final_data, ...{"allScreenSizes": allScreenSizes} };

                //     break;

                case "totalScreenSizeRange":
                    delete temp_final_conditions.screen_size
                    const minimal_ScreenSizeRange_value = await Product.find(temp_final_conditions).sort({ screen_size: 1 }).limit(1);
                    const maximal_ScreenSizeRange_value = await Product.find(temp_final_conditions).sort({ screen_size: -1 }).limit(1);
                    const totalScreenSizeRange = [minimal_ScreenSizeRange_value[0].screen_size, maximal_ScreenSizeRange_value[0].screen_size]
                    final_data = { ...final_data, ...{ "totalScreenSizeRange": totalScreenSizeRange } };

                    break;


                case "allWirelessCarriers":
                    delete temp_final_conditions.wireless_carrier
                    const allWirelessCarriers = await Product.find(temp_final_conditions).distinct("wireless_carrier")
                    final_data = { ...final_data, ...{ "allWirelessCarriers": allWirelessCarriers } };

                    break;



                // New features from stiftungwarentest 08.12.2022
                case "totalCameraScoreRange":
                    delete temp_final_conditions.camera_score
                    const minimal_CameraScoreRange_value = await Product.find(temp_final_conditions).sort({ camera_score: 1 }).limit(1);
                    const maximal_CameraScoreRange_value = await Product.find(temp_final_conditions).sort({ camera_score: -1 }).limit(1);
                    const totalCameraScoreRange = [minimal_CameraScoreRange_value[0].camera_score, maximal_CameraScoreRange_value[0].camera_score]
                    final_data = { ...final_data, ...{ "totalCameraScoreRange": totalCameraScoreRange } }
                    break;

                case "totalBatteryScoreRange":
                    delete temp_final_conditions.battery_score
                    const minimal_BatteryScoreRange_value = await Product.find(temp_final_conditions).sort({ battery_score: 1 }).limit(1);
                    const maximal_BatteryScoreRange_value = await Product.find(temp_final_conditions).sort({ battery_score: -1 }).limit(1);
                    const totalBatteryScoreRange = [minimal_BatteryScoreRange_value[0].battery_score, maximal_BatteryScoreRange_value[0].battery_score]
                    final_data = { ...final_data, ...{ "totalBatteryScoreRange": totalBatteryScoreRange } }
                    break;

                case "totalStabilityScoreRange":
                    delete temp_final_conditions.Stability_score
                    const minimal_StabilityScoreRange_value = await Product.find(temp_final_conditions).sort({ Stability_score: 1 }).limit(1);
                    const maximal_StabilityScoreRange_value = await Product.find(temp_final_conditions).sort({ Stability_score: -1 }).limit(1);
                    const totalStabilityScoreRange = [minimal_StabilityScoreRange_value[0].Stability_score, maximal_StabilityScoreRange_value[0].Stability_score]
                    final_data = { ...final_data, ...{ "totalStabilityScoreRange": totalStabilityScoreRange } }
                    break;

                // 1.5 - 3.3
                case "totalMusicPlayerScoreRange":
                    delete temp_final_conditions.music_player_score
                    // temp_final_conditions.music_player_score = {$ne:null}
                    const minimal_MusicPlayerScoreRange_value = await Product.find(temp_final_conditions).sort({ music_player_score: 1 }).limit(1);
                    const maximal_MusicPlayerScoreRange_value = await Product.find(temp_final_conditions).sort({ music_player_score: -1 }).limit(1);
                    const totalMusicPlayerScoreRange = [minimal_MusicPlayerScoreRange_value[0].music_player_score, maximal_MusicPlayerScoreRange_value[0].music_player_score]
                    // const totalMusicPlayerScoreRange = [minimal_MusicPlayerScoreRange_value[0].music_player_score<1.5 ? 1.5 : minimal_MusicPlayerScoreRange_value[0].music_player_score, 
                    // maximal_MusicPlayerScoreRange_value[0].music_player_score || 3.3]
                    final_data = { ...final_data, ...{ "totalMusicPlayerScoreRange": totalMusicPlayerScoreRange } }
                    break;

                // 0.9 - 3.2
                case "totalDisplayScoreRange":
                    delete temp_final_conditions.display_score
                    // temp_final_conditions.display_score = {$ne:null}
                    const minimal_DisplayScoreRange_value = await Product.find(temp_final_conditions).sort({ display_score: 1 }).limit(1);
                    const maximal_DisplayScoreRange_value = await Product.find(temp_final_conditions).sort({ display_score: -1 }).limit(1);
                    const totalDisplayScoreRange = [minimal_DisplayScoreRange_value[0].display_score, maximal_DisplayScoreRange_value[0].display_score]
                    // const totalDisplayScoreRange = [minimal_DisplayScoreRange_value[0].display_score<0.9 ? 0.9 : minimal_DisplayScoreRange_value[0].display_score, 
                    // maximal_DisplayScoreRange_value[0].display_score || 3.2]
                    final_data = { ...final_data, ...{ "totalDisplayScoreRange": totalDisplayScoreRange } }
                    break;

                case "allSurfingRating":
                    delete temp_final_conditions.surfing_rating
                    const allSurfingRating_temp = await Product.find(temp_final_conditions).distinct("surfing_rating")
                    let allSurfingRating = allSurfingRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allSurfingRating": allSurfingRating.filter(n => n) } }
                    break;


                case "allBackupPCRating":
                    delete temp_final_conditions.backup_PC_rating
                    const allBackupPCRating_temp = await Product.find(temp_final_conditions).distinct("backup_PC_rating")
                    let allBackupPCRating = allBackupPCRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allBackupPCRating": allBackupPCRating.filter(n => n) } }
                    break;

                case "allComputingPowerRating":
                    delete temp_final_conditions.computing_power_rating
                    const allComputingPowerRating_temp = await Product.find(temp_final_conditions).distinct("computing_power_rating")
                    let allComputingPowerRating = allComputingPowerRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allComputingPowerRating": allComputingPowerRating } }
                    break;

                case "allInstructionForUseRating":
                    delete temp_final_conditions.instruction_for_use_rating
                    const allInstructionForUseRating_temp = await Product.find(temp_final_conditions).distinct("instruction_for_use_rating")
                    let allInstructionForUseRating = allInstructionForUseRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allInstructionForUseRating": allInstructionForUseRating.filter(n => n) } }
                    break;

                case "allNetworkSensitivityRating":
                    delete temp_final_conditions.network_sensitivity_rating
                    const allNetworkSensitivityRating_temp = await Product.find(temp_final_conditions).distinct("network_sensitivity_rating")
                    let allNetworkSensitivityRating = allNetworkSensitivityRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allNetworkSensitivityRating": allNetworkSensitivityRating.filter(n => n) } }
                    break;


                case "allHeadphoneJack3mm5":
                    delete temp_final_conditions.Headphone_jack_3mm_5
                    const allHeadphoneJack3mm5 = await Product.find(temp_final_conditions).distinct("Headphone_jack_3mm_5")
                    final_data = { ...final_data, ...{ "allHeadphoneJack3mm5": allHeadphoneJack3mm5.filter(n => n) } }
                    break;

                case "allBiometricUnlockRating":
                    delete temp_final_conditions.biometric_unlock_rating
                    const allBiometricUnlockRating_temp = await Product.find(temp_final_conditions).distinct("biometric_unlock_rating")
                    let allBiometricUnlockRating = allBiometricUnlockRating_temp.filter(n => n).sort(function (strat, next) {
                        return rating_words_rank.indexOf(strat) - rating_words_rank.indexOf(next)
                    })
                    final_data = { ...final_data, ...{ "allBiometricUnlockRating": allBiometricUnlockRating.filter(n => n) } }
                    break;

                case "allMemoryCardSlot":
                    delete temp_final_conditions.memory_card_slot
                    const allMemoryCardSlot = await Product.find(temp_final_conditions).distinct("memory_card_slot")
                    final_data = { ...final_data, ...{ "allMemoryCardSlot": allMemoryCardSlot.filter(n => n) } }
                    break;

                case "allDualSim":
                    delete temp_final_conditions.dual_sim
                    const allDualSim = await Product.find(temp_final_conditions).distinct("dual_sim")
                    final_data = { ...final_data, ...{ "allDualSim": allDualSim.filter(n => n) } }
                    break;

            }
        }
        res.json({ "final_data": final_data })


    } catch (error) {
        res.status(200).json({ message: error, stack: error.stack })
    }
}