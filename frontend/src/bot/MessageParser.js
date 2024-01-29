import axios from 'axios'
import store from '../store';
import { updateAllFilterState } from '../actions/filterActions';
import { addOneInteractionTrackAction } from '../actions/inteactionTrackActions';
import { update_conversation_style } from '../actions/conversationStyleAction';
import { setBackMainPageAction } from '../actions/backMainPageActions';
import { updateMetaIntentsInfluenceStateAction } from '../actions/metaIntentsInfluenceStateActions';


class MessageParser {

    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }
    intent_list = [
        'AI',
        'BACKUP TO PC RATING',
        'BATTERY',
        'benefits and discounts',
        'biometric unlock',
        'brand',
        'CAMERA',
        'cellular technology',
        'clear',
        'color',
        'STABILITY',
        'support SD card',
        'SURFING RATING',
        'warranty',
        'wireless carrier',
        'compare',
        'COMPUTING POWER RATING',
        'contract data volume',
        'dual SIM',
        'environmentally friendly materials',
        'general features',
        'greeting',
        'headphone jack 3.5mm',
        'help',
        'INSTRUCTION FOR USE RATING',
        'is unlocked',
        'model year',
        'MUSIC PLAYER',
        'NETWORK SENSITIVITY RATING',
        'operating system',
        'paying options',
        'popularity',
        'preinstalled software',
        'price',
        'ram',
        'rating',
        'recommendation',
        'regular updates',
        'reset',
        'rom',
        'safe',
        'screen',
        'SCREEN DISPLAY RATING',
        'special features',
        'do not understand',
    ]

    intent_dict = {
        // product feature intent (amazon data)
        'brand': 'brand',
        'cellular technology': 'cellular technology',
        'color': 'color',
        'wireless carrier': 'wireless carrier',
        'greeting': 'greeting',
        'model year': 'model year',
        'operating system': 'operating system',
        'popularity': 'numrating',
        'price': 'price',
        'ram': 'ram',
        'rating': 'rating',
        'rom': 'rom',
        'screen size': 'screen size',

        // function intent
        'help': 'help',
        'clear': 'clear',
        'reset': 'reset',

        'do not understand': 'do not understand',
        'recommendation': 'recommendation',

        // product assessment intent (stiftung warentest data)
        'CAMERA': 'camera_score', // camera_rating
        'BATTERY': 'battery_score', // battery_rating
        'STABILITY': 'Stability_score', //Stability_rating
        'MUSIC PLAYER': 'music_player_score', //music_player_rating
        'SURFING RATING': 'surfing_rating',
        'BACKUP TO PC RATING': 'backup_PC_rating',
        'COMPUTING POWER RATING': 'computing_power_rating',
        'INSTRUCTION FOR USE RATING': 'instruction_for_use_rating',
        'NETWORK SENSITIVITY RATING': 'network_sensitivity_rating',
        'SCREEN DISPLAY RATING': 'display_score', // display_rting
        'headphone jack 3.5mm': 'Headphone_jack_3mm_5',
        'biometric unlock': 'biometric_unlock_rating', // fingerprint_unlock, face_unlock
        'support SD card': 'memory_card_slot',
        'dual SIM': 'dual_sim',

        // Limited by the data, we don't have such information for user
        'benefits and discounts': 'no_such_infomation',
        'compare': 'no_such_infomation',
        'warranty': 'no_such_infomation',
        'AI': 'no_such_infomation',
        'contract data volume': 'no_such_infomation',
        'environmentally friendly materials': 'no_such_infomation',
        'general features': 'no_such_infomation',
        'is unlocked': 'no_such_infomation',
        'paying options': 'no_such_infomation',
        'preinstalled software': 'no_such_infomation',
        'regular updates': 'no_such_infomation',
        'safe': 'no_such_infomation',
        'special features': 'no_such_infomation',

        'thanks': 'thanks',
        'comparison': 'comparison',
    }


    // convert 128GB => 128
    clean_parameter_value_to_value = async (parameter_value, parameter_measurement) => {
        if (parameter_measurement !== undefined) {
            // console.log("--------defined-------")
            var final_parameter_value = parameter_value.map(function (x) {
                var single_parameter_value = parseFloat(x)
                // 1024 mb => 1gb
                if (parameter_measurement.toLowerCase().includes('mb')) {
                    single_parameter_value = Math.round(100000 * single_parameter_value / 1024) / 100000
                }
                return single_parameter_value
            })
        } else {
            // console.log("--------undefined-------")
            var final_parameter_value = parameter_value.map(function (x) {
                var single_parameter_value = parseFloat(x)
                return single_parameter_value
            })
        }
        return final_parameter_value
    }

    clip_the_ideal_range_to_current_state_range = (ideal_range, current_state_range) => {

        var final_range = []
        if (ideal_range[0] >= current_state_range[1] || ideal_range[1] <= current_state_range[0]) {
            final_range = []
        }
        else {
            final_range = ideal_range
        }

        return final_range
    }


    modifying_current_filter_state = async (parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, one_feature_all_state_values, intial_one_feature_all_state_values, UI_type, notInversed = 1) => {
        var one_feature_filtered_state_values = [];
        var final_parameter_value;
        var parameter_quality_level = parameter_quality_level[0]

        // console.log("---intial_one_feature_all_state_values---", intial_one_feature_all_state_values)
        // console.log("---parameter_quality_level---", parameter_quality_level)
        // console.log("---parameter_value---", parameter_value)

        // blur indication of filter (blur expression)
        if (parameter_quality_level !== "" && parameter_quality_level !== undefined) {
            var one_third_position = parseInt(intial_one_feature_all_state_values.length / 3)
            var two_third_position = parseInt(2 * intial_one_feature_all_state_values.length / 3)
            switch (parameter_quality_level) {
                case "good":
                    if (UI_type === "checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(
                            one_value => parseFloat(one_value) >= parseFloat(intial_one_feature_all_state_values[two_third_position])
                        );
                    } else if (UI_type === "string_checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(function (one_value) {
                            if (one_value === "good" || one_value === "very good") {
                                return true
                            }
                        })
                    } else if (UI_type === "slider") {
                        if (notInversed === 1) {
                            one_feature_filtered_state_values = [
                                parseFloat(intial_one_feature_all_state_values[0]) +
                                0.66 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))
                                , parseFloat(intial_one_feature_all_state_values[1])]

                        } else {
                            one_feature_filtered_state_values = [parseFloat(intial_one_feature_all_state_values[0]),
                            parseFloat(intial_one_feature_all_state_values[0]) +
                            0.33 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))
                            ]
                        }

                        one_feature_filtered_state_values = this.clip_the_ideal_range_to_current_state_range(one_feature_filtered_state_values, one_feature_all_state_values)

                    }

                    break;

                case "satisfactory":

                    if (UI_type === "checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(function (one_value) {
                            if (one_value >= parseFloat(intial_one_feature_all_state_values[one_third_position])
                                &&
                                one_value <= parseFloat(intial_one_feature_all_state_values[two_third_position])) {
                                return true
                            }
                        }
                        );
                    } else if (UI_type === "string_checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(function (one_value) {
                            if (one_value === "satisfactory") {
                                return true
                            }
                        })
                    } else if (UI_type === "slider") {

                        one_feature_filtered_state_values = [
                            parseFloat(intial_one_feature_all_state_values[0]) +
                            0.33 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))
                            ,
                            parseFloat(intial_one_feature_all_state_values[0]) +
                            0.66 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))]
                        one_feature_filtered_state_values = this.clip_the_ideal_range_to_current_state_range(one_feature_filtered_state_values, one_feature_all_state_values)

                    }

                    break;

                case "sufficient":
                    if (UI_type === "checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(
                            one_value => parseFloat(one_value) <= parseFloat(intial_one_feature_all_state_values[one_third_position])
                        );
                    } else if (UI_type === "string_checkbox") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(function (one_value) {
                            if (one_value === "sufficient") {
                                return true
                            }
                        })
                    } else if (UI_type === "slider") {
                        if (notInversed === 1) {

                            one_feature_filtered_state_values = [parseFloat(intial_one_feature_all_state_values[0]),
                            parseFloat(intial_one_feature_all_state_values[0]) +
                            0.33 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))
                            ]
                        } else {
                            one_feature_filtered_state_values = [
                                parseFloat(intial_one_feature_all_state_values[0]) +
                                0.66 * (parseFloat(intial_one_feature_all_state_values[1]) - parseFloat(intial_one_feature_all_state_values[0]))
                                , parseFloat(intial_one_feature_all_state_values[1])]
                        }
                        one_feature_filtered_state_values = this.clip_the_ideal_range_to_current_state_range(one_feature_filtered_state_values, one_feature_all_state_values)
                    }

                    break;

            }
        }
        // clear indication of filter (exact value)
        else {
            // console.log("---parameter_value---", parameter_value)
            if (UI_type === "checkbox" || UI_type === "slider") {
                final_parameter_value = await this.clean_parameter_value_to_value(parameter_value, parameter_measurement)
            }

            // string_checkbox
            else {
                final_parameter_value = parameter_value
            }

            // console.log("-------comparison_operator-------:", comparison_operator)
            // console.log("-------parameter_value-------:", parameter_value)
            // console.log("-------final_parameter_value-------:", final_parameter_value)
            // console.log("-------parameter_measurement-------:", parameter_measurement)
            // console.log("-------one_feature_all_state_values-------:", one_feature_all_state_values)
            // no parameter_value
            if (parameter_value.length === 0 || !parameter_value) {
                one_feature_filtered_state_values = []
            }
            else {
                // list => checkbox
                if (UI_type === "checkbox") {
                    // no comparison operator
                    if (comparison_operator === "" && parameter_value.length === 1) {
                        // get closest value to use assigned parameter_value from one_feature_all_state_values list
                        let closest_list = final_parameter_value.map(function (x) {
                            let closest = one_feature_all_state_values.sort((a, b) => Math.abs(x - a) - Math.abs(x - b))[0];
                            return closest
                        })
                        one_feature_filtered_state_values = closest_list
                    }
                    else if (parameter_value.length === 2) {
                        one_feature_filtered_state_values = [final_parameter_value[0], final_parameter_value[1]]
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(function (one_value) {
                            if (one_value >= final_parameter_value[0] && one_value <= final_parameter_value[1]) {
                                return true
                            }
                        });

                    }
                    // greater >
                    else if (comparison_operator === ">") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(one_value => one_value >= final_parameter_value[0]);
                    }
                    // smaller <
                    else if (comparison_operator === "<") {
                        one_feature_filtered_state_values = one_feature_all_state_values.filter(one_value => one_value <= final_parameter_value[0]);
                    }
                }

                else if (UI_type === "string_checkbox") {
                    one_feature_filtered_state_values = parameter_value.filter(function (x) {
                        if (one_feature_all_state_values.indexOf(x) > -1) {
                            return x
                        }
                    })
                }

                // 2 values => slider
                else if (UI_type === "slider") {
                    // no comparison operator
                    if (comparison_operator === "" && parameter_value.length === 1) {
                        // 20% higher and lower than user assigned value 
                        one_feature_filtered_state_values = [final_parameter_value[0] - 0.2 * final_parameter_value[0], final_parameter_value[0] + 0.2 * final_parameter_value[0]]
                    }
                    else if (parameter_value.length === 2) {
                        one_feature_filtered_state_values = [final_parameter_value[0], final_parameter_value[1]]

                    }
                    // greater >
                    else if (comparison_operator === ">") {
                        if (final_parameter_value[0] < one_feature_all_state_values[1]) {
                            one_feature_filtered_state_values = [final_parameter_value[0], one_feature_all_state_values[1]];
                        } else {
                            one_feature_filtered_state_values = [one_feature_all_state_values[1], one_feature_all_state_values[1]]
                        }
                    }
                    // smaller <
                    else if (comparison_operator === "<") {
                        if (one_feature_all_state_values[0] < final_parameter_value[0]) {
                            one_feature_filtered_state_values = [one_feature_all_state_values[0], final_parameter_value[0]];
                        } else {
                            one_feature_filtered_state_values = [one_feature_all_state_values[0], one_feature_all_state_values[0]];
                        }
                    }
                    one_feature_filtered_state_values = this.clip_the_ideal_range_to_current_state_range(one_feature_filtered_state_values, one_feature_all_state_values)
                }
            }
        }


        console.log("---one_feature_filtered_state_values---:", one_feature_filtered_state_values)
        return one_feature_filtered_state_values
    }

    // Dialogflow deal with user utterance
    dialogflow_response = async (message) => {

        try {
            const { data } = await axios.post(
                '/api/dialogflow/textInput',
                {
                    message: message
                })
            console.log("---data---", data)
            const msg = data["data"][0]["queryResult"]["fulfillmentText"]
            var intent = data["data"][0]["queryResult"]["intent"]
            const parameter = data["data"][0]["queryResult"]["parameters"]["fields"]
            var additional_para = null
            // console.log("---msg---", msg)
            // console.log("---parameter---", parameter)
            // console.log("---intent---", intent)

            // if there is a intent, which means Dialogflow found a matched intent
            if (intent) {
                intent = intent["displayName"]
                ////intent_dict using! 
                intent = this.intent_dict[intent]
                // console.log("---intent---", intent)

                try {
                    if (Object.keys(parameter).length !== 0) {

                        var comparison_operator = ""
                        var parameter_value = []
                        var parameter_measurement = "GB"

                        // string checkbox parameters
                        var parameter_brand = ""
                        var parameter_cellular_technologies = ""
                        var parameter_color = ""
                        var parameter_wireless_carriers = ""
                        var parameter_operating_system = ""
                        var parameter_quality_level = ""

                        var all_filter_state = {}
                        var new_one_filter_state = {}

                        const { oneFilterTotalValue } = store.getState()
                        const { initialOneFilterTotalValue } = store.getState()

                        // Cooresponding entities in dialogflow
                        if (parameter["comparison"]) {
                            comparison_operator = parameter["comparison"]["stringValue"]
                        }
                        console.log("---comparison_operator---", comparison_operator)
                        if (parameter["number"]) {
                            parameter_value = parameter["number"]["stringValue"]
                            if (parameter_value === "") {
                                parameter_value = []
                            } else {
                                parameter_value = parameter["number"]["numberValue"]
                                if (parameter_value === undefined) {
                                    parameter_value = parameter.number.listValue.values.map(function (x) { return x.numberValue })
                                } else {
                                    parameter_value = [parameter_value]
                                }
                            }
                        }

                        if (parameter["year"]) {
                            parameter_value = parameter["year"]["stringValue"]
                            if (parameter_value === undefined) {
                                parameter_value = parameter.year.listValue.values.map(function (x) { return parseInt(x.stringValue) })
                            } else {
                                parameter_value = [parseInt(parameter_value)]
                            }
                            if (comparison_operator === "") {
                                if (parameter_value.length === 1) {
                                    additional_para = "produced in " + parameter_value.toString()
                                } else if (parameter_value.length > 1) {
                                    additional_para = "produced in " + parameter_value.toString()
                                }
                            }

                        }

                        if (parameter["ratingValue"]) {
                            parameter_value = parameter["ratingValue"]["stringValue"]
                            if (parameter_value === undefined) {
                                parameter_value = parameter.ratingValue.listValue.values.map(function (x) { return parseFloat(x.stringValue) })
                            } else {
                                parameter_value = [parseFloat(parameter_value)]
                            }
                        }

                        // good satisfactory sufficient
                        // ~ big middle small
                        if (parameter["qualityLevel"]) {
                            parameter_quality_level = parameter["qualityLevel"]["stringValue"]
                            if (parameter_quality_level === undefined) {
                                parameter_quality_level = parameter.qualityLevel.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_quality_level = [parameter_quality_level]
                            }
                        }

                        if (parameter["measurement"]) {
                            parameter_measurement = parameter["measurement"]["stringValue"]
                        }

                        if (parameter["brands"]) {
                            parameter_brand = parameter["brands"]["stringValue"]
                            if (parameter_brand === undefined) {
                                parameter_brand = parameter.brands.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_brand = [parameter_brand]
                            }
                        }

                        if (parameter["cellular_technology"]) {
                            parameter_cellular_technologies = parameter["cellular_technology"]["stringValue"]
                            if (parameter_cellular_technologies === undefined) {
                                parameter_cellular_technologies = parameter.cellular_technology.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_cellular_technologies = [parameter_cellular_technologies]
                            }
                        }

                        if (parameter["colors"]) {
                            parameter_color = parameter["colors"]["stringValue"]
                            if (parameter_color === undefined) {
                                parameter_color = parameter.colors.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_color = [parameter_color]
                            }
                        }

                        if (parameter["wireless_carriers"]) {
                            parameter_wireless_carriers = parameter["wireless_carriers"]["stringValue"]
                            if (parameter_wireless_carriers === undefined) {
                                parameter_wireless_carriers = parameter.wireless_carriers.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_wireless_carriers = [parameter_wireless_carriers]
                            }
                        }

                        if (parameter["operating_system"]) {
                            parameter_operating_system = parameter["operating_system"]["stringValue"]
                            if (parameter_operating_system === undefined) {
                                parameter_operating_system = parameter.operating_system.listValue.values.map(function (x) { return x.stringValue })
                            } else {
                                parameter_operating_system = [parameter_operating_system]
                            }
                        }

                        console.log("---intent---", intent)
                        // Cooresponding intents in dialogflow
                        switch (intent) {

                            // checkbox
                            case "ram":
                                const { allRAMs } = oneFilterTotalValue
                                const { allRAMs: initial_allRAMs } = initialOneFilterTotalValue
                                new_one_filter_state["currentRAMs"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allRAMs, initial_allRAMs, "checkbox")
                                if (comparison_operator === "") {
                                    if (parameter_value.length === 1) {
                                        additional_para = "RAM with " + parameter_value[0].toString() + "GB"
                                    }
                                    else if (parameter_value.length === 2) {
                                        additional_para = "RAM between " + parameter_value[0].toString() + "GB and " + parameter_value[1].toString() + "GB"
                                    }
                                }

                                break;

                            case "rom":
                                const { allROMs } = oneFilterTotalValue
                                const { allROMs: initial_allROMs } = initialOneFilterTotalValue
                                new_one_filter_state["currentROMs"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allROMs, initial_allROMs, "checkbox")
                                if (comparison_operator === "") {
                                    if (parameter_value.length === 1) {
                                        additional_para = "ROM with " + parameter_value[0].toString() + "GB"
                                    }
                                    else if (parameter_value.length === 2) {
                                        additional_para = "ROM between " + parameter_value[0].toString() + "GB and " + parameter_value[1].toString() + "GB"
                                    }
                                }
                                break;

                            case "screen size":
                                const { totalScreenSizeRange } = oneFilterTotalValue
                                const { totalScreenSizeRange: initial_totalScreenSizeRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentScreenSizeRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value.map(function (x) { return parseFloat(x / 0.393701).toFixed(1) }), parameter_measurement, totalScreenSizeRange, initial_totalScreenSizeRange, "slider")
                                if (comparison_operator === "") {
                                    if (parameter_value.length === 1) {
                                        additional_para = "screen size around " + parameter_value[0].toString() + "inch"
                                    }
                                    else if (parameter_value.length === 2) {
                                        additional_para = "screen size between " + parameter_value[0].toString() + "inch and " + parameter_value[1].toString() + "inch"
                                    }
                                }
                                break;


                            case "model year":
                                const { allModelYears } = oneFilterTotalValue
                                const { allModelYears: initial_allModelYears } = initialOneFilterTotalValue
                                new_one_filter_state["currentModelYears"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allModelYears, initial_allModelYears, "checkbox")
                                break;

                            // string_checkbox
                            case "brand":
                                const { allBrands } = oneFilterTotalValue
                                const { allBrands: initial_allBrands } = initialOneFilterTotalValue
                                // new_one_filter_state["currentBrands"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_brand, parameter_measurement, allBrands, initial_allBrands, "string_checkbox")
                                var temp_brands = parameter_brand.filter(function (x) {
                                    if (allBrands.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                new_one_filter_state["currentBrands"] = temp_brands
                                if (temp_brands.length === 1) {
                                    additional_para = "brand with " + temp_brands.toString()
                                } else if (temp_brands.length > 1) {
                                    additional_para = "brand within " + temp_brands.toString()
                                }
                                break;

                            case "cellular technology":
                                const { allCellularTechnologies } = oneFilterTotalValue
                                const { allCellularTechnologies: initial_allCellularTechnologies } = initialOneFilterTotalValue
                                new_one_filter_state["currentCellularTechnologies"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_cellular_technologies, parameter_measurement, allCellularTechnologies, initial_allCellularTechnologies, "string_checkbox")
                                break;

                            case "color":
                                const { allColors } = oneFilterTotalValue
                                const { allColors: initial_allColors } = initialOneFilterTotalValue
                                // new_one_filter_state["currentColors"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_color, parameter_measurement, allColors, initial_allColors, "string_checkbox")
                                var temp_colors = parameter_color.filter(function (x) {
                                    if (allColors.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                new_one_filter_state["currentColors"] = temp_colors
                                if (temp_colors.length === 1) {
                                    additional_para = "color with " + temp_colors.toString()
                                } else if (temp_colors.length > 1) {
                                    additional_para = "color within " + temp_colors.toString()
                                }
                                break;

                            case "wireless carrier":
                                const { allWirelessCarriers } = oneFilterTotalValue
                                const { allWirelessCarriers: initial_allWirelessCarriers } = initialOneFilterTotalValue
                                new_one_filter_state["currentWirelessCarriers"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_wireless_carriers, parameter_measurement, allWirelessCarriers, initial_allWirelessCarriers, "string_checkbox")
                                break;

                            case "operating system":
                                const { allOperatingSystems } = oneFilterTotalValue
                                const { allOperatingSystems: initial_allOperatingSystems } = initialOneFilterTotalValue
                                // new_one_filter_state["currentOperatingSystems"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_operating_system, parameter_measurement, allOperatingSystems, initial_allOperatingSystems, "string_checkbox")
                                var temp_OS = parameter_operating_system.filter(function (x) {
                                    if (allOperatingSystems.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                new_one_filter_state["currentOperatingSystems"] = temp_OS
                                if (temp_OS.length === 1) {
                                    additional_para = "Operation System with " + temp_OS.toString()
                                } else if (temp_OS.length > 1) {
                                    additional_para = "Operation System within " + temp_OS.toString()
                                }
                                break;



                            // slider
                            case "price":
                                const { totalPriceRange } = oneFilterTotalValue
                                const { totalPriceRange: initial_totalPriceRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentPriceRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalPriceRange, initial_totalPriceRange, "slider")
                                if (comparison_operator === "" && parameter_value.length === 2) {
                                    additional_para = "price between " + parameter_value[0].toString() + " and " + parameter_value[1].toString()
                                }
                                break;


                            case "rating":
                                const { totalRatingRange } = oneFilterTotalValue
                                const { totalRatingRange: initial_totalRatingRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentRatingRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalRatingRange, initial_totalRatingRange, "slider")
                                break;


                            case "numrating":
                                const { totalNumRatingRange } = oneFilterTotalValue
                                const { totalNumRatingRange: initial_totalNumRatingRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentNumRatingRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalNumRatingRange, initial_totalNumRatingRange, "slider")
                                break;


                            // new features                            
                            case "camera_score":
                                const { totalCameraScoreRange } = oneFilterTotalValue
                                const { totalCameraScoreRange: initial_totalCameraScoreRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentCameraScoreRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalCameraScoreRange, initial_totalCameraScoreRange, "slider", -1)
                                break;
                            case "battery_score":
                                const { totalBatteryScoreRange } = oneFilterTotalValue
                                const { totalBatteryScoreRange: initial_totalBatteryScoreRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentBatteryScoreRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalBatteryScoreRange, initial_totalBatteryScoreRange, "slider", -1)
                                break;
                            case "Stability_score":
                                const { totalStabilityScoreRange } = oneFilterTotalValue
                                const { totalStabilityScoreRange: initial_totalStabilityScoreRange } = initialOneFilterTotalValue
                                new_one_filter_state["currentStabilityScoreRange"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, totalStabilityScoreRange, initial_totalStabilityScoreRange, "slider", -1)
                                break;
                            case "surfing_rating":
                                const { allSurfingRating } = oneFilterTotalValue
                                const { allSurfingRating: initial_allSurfingRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentSurfingRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allSurfingRating, initial_allSurfingRating, "string_checkbox")
                                break;
                            case "backup_PC_rating":
                                const { allBackupPCRating } = oneFilterTotalValue
                                const { allBackupPCRating: initial_allBackupPCRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentBackupPCRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allBackupPCRating, initial_allBackupPCRating, "string_checkbox")
                                break;
                            case "computing_power_rating":
                                const { allComputingPowerRating } = oneFilterTotalValue
                                const { allComputingPowerRating: initial_allComputingPowerRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentComputingPowerRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allComputingPowerRating, initial_allComputingPowerRating, "string_checkbox")
                                break;
                            case "instruction_for_use_rating":
                                const { allInstructionForUseRating } = oneFilterTotalValue
                                const { allInstructionForUseRating: initial_allInstructionForUseRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentInstructionForUseRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allInstructionForUseRating, initial_allInstructionForUseRating, "string_checkbox")
                                break;
                            case "network_sensitivity_rating":
                                const { allNetworkSensitivityRating } = oneFilterTotalValue
                                const { allNetworkSensitivityRating: initial_allNetworkSensitivityRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentNetworkSensitivityRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allNetworkSensitivityRating, initial_allNetworkSensitivityRating, "string_checkbox")
                                break;
                            case "Headphone_jack_3mm_5":
                                const { allHeadphoneJack3mm5 } = oneFilterTotalValue
                                const { allHeadphoneJack3mm5: initial_allHeadphoneJack3mm5 } = initialOneFilterTotalValue
                                // new_one_filter_state["currentHeadphoneJack3mm5"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allHeadphoneJack3mm5, initial_allHeadphoneJack3mm5, "string_checkbox")
                                new_one_filter_state["currentHeadphoneJack3mm5"] = ["yes"].filter(function (x) {
                                    if (allHeadphoneJack3mm5.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                break;
                            case "biometric_unlock_rating":
                                const { allBiometricUnlockRating } = oneFilterTotalValue
                                const { allBiometricUnlockRating: initial_allBiometricUnlockRating } = initialOneFilterTotalValue
                                new_one_filter_state["currentBiometricUnlockRating"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allBiometricUnlockRating, initial_allBiometricUnlockRating, "string_checkbox")
                                break;
                            case "memory_card_slot":
                                const { allMemoryCardSlot } = oneFilterTotalValue
                                const { allMemoryCardSlot: initial_allMemoryCardSlot } = initialOneFilterTotalValue
                                // new_one_filter_state["currentMemoryCardSlot"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allMemoryCardSlot, initial_allMemoryCardSlot, "string_checkbox")
                                new_one_filter_state["currentMemoryCardSlot"] = ["yes"].filter(function (x) {
                                    if (allMemoryCardSlot.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                break;
                            case "dual_sim":
                                const { allDualSim } = oneFilterTotalValue
                                const { allDualSim: initial_allDualSim } = initialOneFilterTotalValue
                                // new_one_filter_state["currentDualSim"] = await this.modifying_current_filter_state(parameter_quality_level, comparison_operator, parameter_value, parameter_measurement, allDualSim, initial_allDualSim, "string_checkbox")
                                new_one_filter_state["currentDualSim"] = ["yes"].filter(function (x) {
                                    if (allDualSim.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                break;
                        }


                        all_filter_state = { ...new_one_filter_state }
                        // console.log("---all_filter_state---",all_filter_state)
                        store.dispatch(updateAllFilterState(all_filter_state))

                    } else {

                        var all_filter_state = {}
                        var new_one_filter_state = {}
                        const { oneFilterTotalValue } = store.getState()
                        switch (intent) {
                            case "Headphone_jack_3mm_5":
                                const { allHeadphoneJack3mm5 } = oneFilterTotalValue
                                new_one_filter_state["currentHeadphoneJack3mm5"] = ["yes"].filter(function (x) {
                                    if (allHeadphoneJack3mm5.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                additional_para = "with 3.5mm headphone jack"
                                break;
                            case "memory_card_slot":
                                const { allMemoryCardSlot } = oneFilterTotalValue
                                new_one_filter_state["currentMemoryCardSlot"] = ["yes"].filter(function (x) {
                                    if (allMemoryCardSlot.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                additional_para = "support SD card"
                                break;
                            case "dual_sim":
                                const { allDualSim } = oneFilterTotalValue
                                new_one_filter_state["currentDualSim"] = ["yes"].filter(function (x) {
                                    if (allDualSim.indexOf(x) > -1) {
                                        return x
                                    }
                                })
                                additional_para = "support dual SIM card"
                                break;
                        }

                        if (Object.keys(new_one_filter_state).length !== 0) {
                            all_filter_state = { ...new_one_filter_state }
                            store.dispatch(updateAllFilterState(all_filter_state))
                        }
                        // console.log("---all_filter_state---",all_filter_state)

                    }
                } catch (error) {
                    console.log("!!!---ERROR-Parsing parameters---!!!")
                }
                // include parameters

                return { intent, msg, additional_para }

            }
            // if there is not intent, which means Dialogflow can not found a matched intent
            else {
                // Treat it as chit-chat and linked into GPT3 to get response.
                console.log("---chitchat---")
                intent = "chitchat"
                return { intent, msg, additional_para }
            }

        } catch (error) {
            console.log(error)
        }
    }


    async_parse = async (message) => {

        // // auto-complete function
        // var parentNode = document.getElementsByClassName("react-chatbot-kit-chat-input-container")[0]
        // parentNode.setAttribute("style","flex-direction: column-reverse;")
        // var input = document.getElementsByClassName("react-chatbot-kit-chat-input")[0]
        // if(input){

        //     var ul = document.createElement('ul');
        //     // ul.setAttribute('id','proList');
        //     var li = document.createElement('li');
        //     // li.setAttribute('class','item');
        //     li.setAttribute("style", "background-color:red;");
        //     li.setAttribute("style", "z-index:2;");
        //     li.innerHTML=li.innerHTML + "test111111111111";
        //     ul.appendChild(li);

        //     parentNode.appendChild(ul);
        //     console.log(input.value)
        // }


        //real
        // console.log(typeof(message))
        // console.log(message)
        const { intent, msg, additional_para } = await this.dialogflow_response(message)
        // console.log(intent,msg)

        // var data=[
        //     {user_random_id: 125,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
        //     {user_random_id: 124,components_name: 'Test',components_context: 'Test',components_info: 'Test',intents: 'Test',intents_info: 'Test', local_timestamps: 123},
        // ];

        var one_interaction_data =
        {
            components_name: 'TYPING',
            components_context: 'chatbot',
            components_info: message,
            intents: intent,
            intents_info: 'None'
        }

        store.dispatch(addOneInteractionTrackAction(one_interaction_data))


        // Go back to main page
        // if (intent !== "chitchat" &&
        //     intent !== "thanks" &&
        //     intent !== "do not understand" &&
        //     intent !== "no_such_infomation" && 
        //     intent !== "reset" && 
        //     intent !== "clear" && 
        //     intent !== "greeting") {
        //         store.dispatch(setBackMainPageAction(true))
        // }


        //test
        // var intent = message
        // var msg = message


        // predefined question sequence
        // this.actionProvider.handle_Next_Question()



        // style 1: remind user to ask question   user-initiative
        // style 2: generate question via entropy  system-initiative
        if (store.getState().conversationStyleState.conversation_style === 2) {
            store.dispatch(update_conversation_style(1))
            let one_interaction_data_temp =
            {
                components_name: 'None',
                components_context: 'chatbot',
                components_info: 'None',
                intents: 'conversation style transfer',
                intents_info: 'style 2 to 1 (user-initiative)'
            }
            store.dispatch(addOneInteractionTrackAction(one_interaction_data_temp))

            // user initiative add 1 
            store.dispatch(updateMetaIntentsInfluenceStateAction({
                user_initiative_times: store.getState().metaIntentsInfluenceState.user_initiative_times + 1,
            }))
        }


        if (additional_para !== null) {
            let msg = "Got it: '" + additional_para + "'. Do you have other demands?"
            this.actionProvider.pureMessageResponse(msg);
        } else {
            // Help/Guide
            if (intent === "help" || intent === "do not understand") {
                // this.actionProvider.handleResponse(msg);
                // style 1: remind user to ask question
                // style 2: generate question via entropy
                if (store.getState().conversationStyleState.conversation_style === 1) {
                    store.dispatch(update_conversation_style(2))
                    let one_interaction_data_temp =
                    {
                        components_name: 'None',
                        components_context: 'chatbot',
                        components_info: 'None',
                        intents: 'conversation style transfer',
                        intents_info: 'style 1 to 2 (system-initiative)',
                    }
                    store.dispatch(addOneInteractionTrackAction(one_interaction_data_temp))

                    // system initiative add 1
                    store.dispatch(updateMetaIntentsInfluenceStateAction({
                        system_initiative_times: store.getState().metaIntentsInfluenceState.system_initiative_times + 1,
                    }))
                }
                this.actionProvider.handle_Next_Question()
            }
            else if (intent === "reset") {
                this.actionProvider.handleReset();
            }
            else if (intent === "clear") {
                this.actionProvider.handleClear();
            }
            else if (intent === "recommendation") {
                this.actionProvider.handleCritiquing(msg);
            }




            // Flexible
            else if (intent === "greeting") {
                this.actionProvider.handleResponse(msg);
            }
            else if (intent === "brand") {
                this.actionProvider.handleBrand();
            }
            else if (intent === "cellular technology") {
                this.actionProvider.handleCellularTechnology();
            }
            else if (intent === "color") {
                this.actionProvider.handleColor();
            }
            else if (intent === "model year") {
                this.actionProvider.handleModelYear();
            }
            else if (intent === "numrating") {
                this.actionProvider.handleNumRatingRange();
            }
            else if (intent === "operating system") {
                this.actionProvider.handleOperatingSystem();
            }
            else if (intent === "price") {
                this.actionProvider.handlePrice();
            }
            else if (intent === "ram") {
                this.actionProvider.handleRAM();
            }
            else if (intent === "rom") {
                this.actionProvider.handleROM();
            }
            else if (intent === "rating") {
                this.actionProvider.handleRatingRange();
            }
            else if (intent === "screen size") {
                this.actionProvider.handleScreenSize();
            }
            else if (intent === "wireless carrier") {
                this.actionProvider.handleWirelessCarrier();
            }

            // new product feature widgets from stiftungwaren test
            else if (intent === "camera_score") {
                this.actionProvider.handleCameraScoreRange();
            }
            else if (intent === "battery_score") {
                this.actionProvider.handleBatteryScoreRange();
            }
            else if (intent === "Stability_score") {
                this.actionProvider.handleStabilityScoreRange();
            }
            else if (intent === "surfing_rating") {
                this.actionProvider.handleSurfingRating();
            }
            else if (intent === "backup_PC_rating") {
                this.actionProvider.handleBackupPCRating();
            }
            else if (intent === "computing_power_rating") {
                this.actionProvider.handleComputingPowerRating();
            }
            else if (intent === "instruction_for_use_rating") {
                this.actionProvider.handleInstructionForUseRating();
            }
            else if (intent === "network_sensitivity_rating") {
                this.actionProvider.handleNetworkSensitivityRating();
            }
            else if (intent === "Headphone_jack_3mm_5") {
                this.actionProvider.handleHeadphoneJack3mm5();
            }
            else if (intent === "biometric_unlock_rating") {
                this.actionProvider.handleBiometricUnlockRating();
            }
            else if (intent === "memory_card_slot") {
                this.actionProvider.handleMemoryCardSlot();
            }
            else if (intent === "dual_sim") {
                this.actionProvider.handleDualSim();
            }

            else if (intent === "no_such_infomation") {
                this.actionProvider.handle_unknown_intents();
            }

            // else if (intent === "do not understand") {
            //     this.actionProvider.handle_unknown_intents();
            // }

            else if (intent === "thanks") {
                this.actionProvider.you_are_welcome();
            }



            else if (intent === "chitchat") {
                this.actionProvider.handle_unknown_intents();
            }

            else if (intent === "comparison") {
                this.actionProvider.handle_comparison();
            }

        }











        // if (intent.includes("dog")) {
        //     this.actionProvider.handleDog();
        // }

        // if (intent.includes("bike")) {
        //     this.actionProvider.whoAreYouShoppingFor();
        // }

        // if (intent.includes("recommendation")) {
        //     // this.actionProvider.inlineCritiquing();
        //     this.actionProvider.recommendation();
        // }

        // else {
        //     this.actionProvider.whoAreYouShoppingFor();
        // }
    }

    parse(message) {
        if (message.match(/^[ ]*$/)) {
            console.log("all space or empty");
            this.actionProvider.please_input_info();
        } else {
            this.async_parse(message)
        }
    }
}

export default MessageParser








