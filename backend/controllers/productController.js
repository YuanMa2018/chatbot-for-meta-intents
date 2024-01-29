import Product from '../models/productModel.js';
import feature_entropy_rank from './algorithms/feature_entropy_rank.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = async (req, res) => {
    try {
        // console.log("---req.query---");
        // console.log(req.query);
        const pageSize = 16
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

        // console.log("-----");
        // console.log(final_conditions);

        const page = Number(req.query.page) || 1
        console.log("page----------", page);
        // { name: 1 } // ascending
        // { name: -1 } // descending
        const current_sort = {}
        current_sort[req.query.sortKey] = parseInt(req.query.sortValue)
        // console.log("final_conditions",final_conditions)
        const count = await Product.countDocuments(final_conditions)
        console.log("count----------", count);


        var pipeline = [
            { $match: final_conditions },
            { $group: { _id: '$name', products: { $first: '$_id' } } },
        ];
        const test_products_id_aggCursor = await Product.aggregate(pipeline)
        var products_id_list = []
        for await (const one_test_products_id_aggCursor of test_products_id_aggCursor) {
            products_id_list.push(Object.values(one_test_products_id_aggCursor)[1])
        }
        const product_id_condition = {
            _id: {
                $in: products_id_list,
            },
        }
        
        const products = await Product.find(product_id_condition)
        .sort(current_sort)
        .limit(pageSize)
        .skip(pageSize * (page - 1))

        // console.log("test_products-------", products_filtered)

        // original one, without filtering functions
        // const products = await Product.find(final_conditions)
        //     .sort(current_sort)
        //     .limit(pageSize)
        //     .skip(pageSize * (page - 1))


        // res.json({ products, page, totalPages: Math.ceil(count / pageSize) })
        // console.log("----------");
        // console.log(products[0]._id);



        //
        // Entropy Calculation Part
        //

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
            // cellularTechnologies,
            // screenSizes,
            screenSizeRange,
            wirelessCarriers,


            // New features from stiftungwarentest 08.12.2022
            CameraScoreRange,
            BatteryScoreRange,
            StabilityScoreRange,
            // MusicPlayerScoreRange,
            SurfingRatings,
            BackupPCRatings,
            ComputingPowerRatings,
            InstructionForUseRatings,
            NetworkSensitivityRatings,
            // DisplayScoreRange,
            HeadphoneJack3mm5,
            BiometricUnlockRatings,
            MemoryCardSlot,
            DualSim,
        ]

        const fixed_feature_list_for_entropy = [
            "$price",
            "$brand",
            "$color_category",
            "$operating_system",
            "$rating",
            "$numRatings",
            "$model_year",
            "$RAM",
            "$ROM",
            // "$cellular_technology",
            // "screenSizes",
            "$screen_size",
            "$wireless_carrier",


            // New features from stiftungwarentest 08.12.2022
            "$camera_score",
            "$battery_score",
            "$Stability_score",
            // "$music_player_score",
            "$surfing_rating",
            "$backup_PC_rating",
            "$computing_power_rating",
            "$instruction_for_use_rating",
            "$network_sensitivity_rating",
            // "$display_score",
            "$Headphone_jack_3mm_5",
            "$biometric_unlock_rating",
            "$memory_card_slot",
            "$dual_sim",
        ]

        var feature_list_for_entropy = [
            "$price",
            "$brand",
            "$color_category",
            "$operating_system",
            "$rating",
            "$numRatings",
            "$model_year",
            "$RAM",
            "$ROM",
            // "$cellular_technology",
            // "screenSizes",
            "$screen_size",
            "$wireless_carrier",


            // New features from stiftungwarentest 08.12.2022
            "$camera_score",
            "$battery_score",
            "$Stability_score",
            // "$music_player_score",
            "$surfing_rating",
            "$backup_PC_rating",
            "$computing_power_rating",
            "$instruction_for_use_rating",
            "$network_sensitivity_rating",
            // "$display_score",
            "$Headphone_jack_3mm_5",
            "$biometric_unlock_rating",
            "$memory_card_slot",
            "$dual_sim",
        ]


        var final_match_conditions = []
        match_conditions.forEach(function (item, index) {
            if (Object.keys(item).length !== 0) {
                final_match_conditions.push(item);
                // console.log("fixed_feature_list_for_entropy[index]---",fixed_feature_list_for_entropy[index])
                feature_list_for_entropy.splice(feature_list_for_entropy.indexOf(fixed_feature_list_for_entropy[index]), 1)
            }
        });

        if (final_match_conditions.length === 0) {
            final_match_conditions = [{}]
        }
        // console.log("final_match_conditions",final_match_conditions)
        // console.log("feature_list_for_entropy",feature_list_for_entropy)

        var all_results = []

        for await (const one_feature of feature_list_for_entropy) {
            var pipeline = [
                // { $match: { $or: [{ price: { $gte: 107, $lte: 1291 } }, { rating: { $gte: 1.6, $lte: 5 } }] } },
                { $match: { $and: final_match_conditions } },

                { $group: { _id: one_feature, count: { $sum: 1 } } },

                { $sort: { count: -1 } }
            ];

            // console.log("---one_feature---",one_feature)

            var aggCursor = Product.aggregate(pipeline);
            var feature_values__counts_list = []
            for await (const one_feature_value__count of aggCursor) {
                feature_values__counts_list.push(Object.values(one_feature_value__count)[1])
            }

            var temp = {}
            temp[one_feature] = feature_values__counts_list
            all_results.push(temp)
        }

        // console.log("all_results",all_results)

        var first_rank_feature = feature_entropy_rank(all_results)
        // console.log("first_rank_feature",first_rank_feature)
        res.json({ products, page, totalPages: Math.ceil(count / pageSize), first_rank_feature })

    } catch (error) {
        console.log("error", error)
    }
}


// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ "message": 'Product not found' })
        }
    } catch (error) {
        res.status(404).json({ message: 'Product not found', stack: error.stack })
    }
};


// @desc Fetch single product
// @route GET /api/products/bySearch
// @access Public
const getProductBySearch = async (req, res) => {
    try {
        // console.log("getProductBySearch---req.query---");
        // console.log(req.query);

        const name = req.query.name
            ? {
                'name': req.query.name
            }
            : {}

        const brand = req.query.brand
            ? {
                'brand': req.query.brand
            }
            : {}

        const color_category = req.query.Color
            ? {
                'color_category': req.query.Color
            }
            : {}


        const model_year = req.query.model_year
            ? {
                'model_year': req.query.model_year
            }
            : {}


        const RAM = req.query.RAM
            ? {
                'RAM': req.query.RAM
            }
            : {}



        const ROM = req.query.ROM
            ? {
                'ROM': req.query.ROM
            }
            : {}


        const cellularTechnologies = req.query.cellularTechnologies
            ? {
                'cellular_technology': {
                    $in: req.query.cellularTechnologies.split(","),
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
            ...name,
            ...brand,
            ...color_category,
            ...model_year,
            ...RAM,
            ...ROM,
            ...cellularTechnologies,

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

        // console.log("---getProductBySearch---");
        // console.log("final_conditions",final_conditions)
        const products = await Product.find(final_conditions)
        res.json(products[0])
        // console.log("----------");
        // console.log(products[0]);
    } catch (error) {
        console.log("error", error)
    }
};

// @desc Create product reviews
// @route Post /api/products/:id/reviews
// @access private
const createProductReview = async (req, res) => {

    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReview = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if (alreadyReview) {
            res.status(400).json({ message: "User has already commented!" })
        } else {
            // console.log("------");
            // console.log(req.user);
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment: comment,
                user: req.user.id
            }
            product.reviews.push(review);
            product.numRatings = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            await product.save()
            res.status(201).json({ message: "Review added" })
        }
    } else {
        res.status(400).json({ message: "Product no found!" })
    }

}

const getFirstNumBrand = (Products, num) => {
    var targetList = []
    var brandList = []
    for (let i = 0; i < Products.length; i++) {
        let one_product = Products[i]
        if (targetList.length === num) {
            break
        }
        if (!brandList.includes(one_product['brand'])) {
            brandList.push(one_product['brand']);
            targetList.push(one_product);
        }
    }
    return targetList
}

const getTopProducts = async (req, res) => {
    try {
        const Products = await Product.find({}).sort({ 'numRatings': -1 });
        // console.log("----------")
        const topProducts = getFirstNumBrand(Products, 5)
        // console.log(topProducts)
        res.json(topProducts)
    }
    catch (error) {
        res.status(200).json({ message: error })
    }
}

export { getProducts, getProductById, getProductBySearch, createProductReview, getTopProducts }

