const string_type_feature = ['brand', 'color_category', 'wireless_carrier',]
const critiquing_feature_list = ["price", "rating", "numRatings", "screen_size", "RAM", "ROM", "brand", "color_category", "model_year", "wireless_carrier"]

const temp = {
    "RAM": 0,
    "ROM": 128,
    "brand": "Samsung Electronics",
    "cellular_technology": "5G",
    "color_category": "black",
    "memory_storage_capacity": 128,
    "model_year": 2021,
    "numRatings": 549,
    "operating_system": "Android",
    "price": 399.99,
    "rating": 4.4,
    "screen_size": 6.6,
    "wireless_carrier": "All Carriers",
}

const to_satisfy_condition = (products, current_critiquing_key, current_critiquing_value, current_critiquing_operation) => {
    var filtered_products = {}
    // console.log(current_critiquing_key)
    //current_critiquing_key is not string type
    if (string_type_feature.indexOf(current_critiquing_key) === -1) {
        if (current_critiquing_operation === 1) {
            filtered_products = products.filter((element, index, array) => {

                if (element[current_critiquing_key] !== "None" &&
                    element[current_critiquing_key] !== "" &&
                    element[current_critiquing_key] !== null
                ) {
                    // console.log("------1111111112222")
                    // console.log(element[current_critiquing_key])
                    let number_type_value = Number(String(element[current_critiquing_key]).match(/\d+(\.\d+)?/g)[0])
                    return number_type_value > current_critiquing_value;
                }
            });
        } else {
            filtered_products = products.filter((element, index, array) => {
                if (element[current_critiquing_key] !== "None" &&
                    element[current_critiquing_key] !== "" &&
                    element[current_critiquing_key] !== null
                ) {
                    let number_type_value = Number(String(element[current_critiquing_key]).match(/\d+(\.\d+)?/g)[0])
                    return number_type_value < current_critiquing_value;
                }
            });
        }
    }

    //current_critiquing_key is string type
    else {
        filtered_products = products.filter((element, index, array) => {
            return element[current_critiquing_key] !== current_critiquing_value;
        });
    }



    return filtered_products
}


const calculate_distance = (rest_keys_of_critiqued_product, rest_keys_valueRange_of_critiqued_product, one_filtered_product, critiqued_product) => {
    // console.log("rest_keys_valueRange_of_critiqued_product", rest_keys_valueRange_of_critiqued_product)
    var distance = 0
    for (let index = 0; index < rest_keys_of_critiqued_product.length; index++) {
        let current_feature = rest_keys_of_critiqued_product[index];
        // float
        if (string_type_feature.indexOf(current_feature) === -1) {

            // console.log("--critiqued_product[current_feature]-", critiqued_product[current_feature])
            // console.log("--current_feature--", current_feature)
            // console.log("--critiqued_product--", critiqued_product)

            if (one_filtered_product[current_feature] !== "None" &&
                one_filtered_product[current_feature] !== "" &&
                one_filtered_product[current_feature] !== 0 &&
                one_filtered_product[current_feature] !== null &&
                critiqued_product[current_feature] !== "None" &&
                critiqued_product[current_feature] !== "" &&
                critiqued_product[current_feature] !== 0 &&
                critiqued_product[current_feature] !== null

            ) {
                // console.log("current_feature", current_feature)
                // console.log("one_filtered_product", one_filtered_product)
                let one_filtered_product_feature_value = Number(String(one_filtered_product[current_feature]).match(/\d+(\.\d+)?/g)[0])
                let critiqued_product_feature_value = Number(String(critiqued_product[current_feature]).match(/\d+(\.\d+)?/g)[0])
                distance += Math.abs((one_filtered_product_feature_value - critiqued_product_feature_value) / rest_keys_valueRange_of_critiqued_product[current_feature])
                // console.log("-------", Math.abs((one_filtered_product_feature_value - critiqued_product_feature_value) / rest_keys_valueRange_of_critiqued_product[current_feature]))
                // console.log("(one_filtered_product_feature_value - critiqued_product_feature_value)", (one_filtered_product_feature_value - critiqued_product_feature_value))
                // console.log("rest_keys_valueRange_of_critiqued_product[current_feature]", rest_keys_valueRange_of_critiqued_product[current_feature])
                // console.log("distance",distance)
            }

        }
        // string
        else {
            if (one_filtered_product[current_feature] !== critiqued_product[current_feature]) {
                distance += 1
            }
        }
    }

    // console.log("distance", distance)
    return distance
}




const get_most_similar_product = (rest_keys_of_critiqued_product, filtered_products, critiqued_product) => {
    var rest_keys_valueRange_of_critiqued_product = {}
    for (let index = 0; index < rest_keys_of_critiqued_product.length; index++) {
        let current_feature = rest_keys_of_critiqued_product[index];
        if (string_type_feature.indexOf(current_feature) === -1) {

            var arr = filtered_products.map((x) => {
                // console.log("--current_feature-",current_feature)
                // console.log("--x-",x)
                // console.log("---",x[current_feature])
                if (x[current_feature] !== "None") {
                    return Number(String(x[current_feature]).match(/\d+(\.\d+)?/g)[0])
                } else {
                    return temp[current_feature]
                }
            })
            // console.log("arr", arr)
            if (arr.length !== 1) {
                if (arr.length === 2 && arr[0] === arr[1]) {
                    rest_keys_valueRange_of_critiqued_product[current_feature] = 1
                } else {
                    const max_value = Math.max(...arr);
                    const min_value = Math.min(...arr);
                    rest_keys_valueRange_of_critiqued_product[current_feature] = max_value - min_value
                }

            } else {
                rest_keys_valueRange_of_critiqued_product[current_feature] = 1
            }

            // console.log("rest_keys_valueRange_of_critiqued_product",rest_keys_valueRange_of_critiqued_product)

        }
    }


    var all_product_distances = []

    for (let index = 0; index < filtered_products.length; index++) {
        const one_filtered_product = filtered_products[index];
        const one_product_distance = calculate_distance(rest_keys_of_critiqued_product, rest_keys_valueRange_of_critiqued_product, one_filtered_product, critiqued_product)
        // console.log("--one_product_distance-", one_product_distance)
        all_product_distances.push(one_product_distance)
    }
    // console.log("--all_product_distances-", all_product_distances)

    const smallest = Math.min(...all_product_distances)
    const index_smallest = all_product_distances.indexOf(smallest)
    const most_similar_product = filtered_products[index_smallest]
    // console.log("--index_smallest-", index_smallest)
    return most_similar_product
}


// critiquing_condition : {"price":[300, 1]} greater than
// critiquing_condition : {"price":[300, -1]} smaller than

const update_critiqued_item = (products, critiquing_condition, previous_critiquing_condition, critiqued_product) => {

    // console.log("critiquing_condition, previous_critiquing_condition", critiquing_condition, previous_critiquing_condition)
    // case 1, there are products meet all critiquing_conditions

    var previous_critiquing_keys = Object.keys(previous_critiquing_condition)
    var previous_critiquing_values_operations = Object.values(previous_critiquing_condition)

    var current_critiquing_key = Object.keys(critiquing_condition)[0]
    var current_critiquing_value = Object.values(critiquing_condition)[0][0]
    var current_critiquing_operation = Object.values(critiquing_condition)[0][1]

    var index = previous_critiquing_keys.indexOf(current_critiquing_key)
    // current critique condition has already happend in previous critiques, label it as "critiquing_condition",
    // and keep rest conditions(except new one) as previous conditions
    if (index > -1) {
        previous_critiquing_keys.splice(index, 1);
        previous_critiquing_values_operations.splice(index, 1);
    }

    var filtered_products = []
    //to satify current critique

    // console.log("---filtered_products len---", filtered_products.length)

    filtered_products = to_satisfy_condition(products, current_critiquing_key, current_critiquing_value, current_critiquing_operation)

    // console.log("---products", products)
    // console.log("---current_critiquing_key", current_critiquing_key)
    // console.log("---current_critiquing_value", current_critiquing_value)
    // console.log("---current_critiquing_operation", current_critiquing_operation)
    // console.log("---filtered_products len---", filtered_products.length)
    // meet current critiquing
    if (filtered_products.length !== 0) {

        //to satify previous critique

        for (let index = 0; index < previous_critiquing_keys.length; index++) {
            let critiquing_key = previous_critiquing_keys[index]
            let critiquing_value = previous_critiquing_values_operations[index][0]
            let critiquing_operation = previous_critiquing_values_operations[index][1]
            filtered_products = to_satisfy_condition(filtered_products, critiquing_key, critiquing_value, critiquing_operation)
        }

        // console.log("---previous_critiquing_condition---", previous_critiquing_condition)

        // meet previous critiquing
        if (filtered_products.length !== 0) {

            //to be similar with original critiqued product
            var critiqued_product_keys = Object.keys(critiqued_product)
            var critiqued_product_values = Object.values(critiqued_product)
            var critiquing_keys = previous_critiquing_keys.concat([current_critiquing_key])

            //差集
            var rest_keys_of_critiqued_product = critiqued_product_keys.filter(function (v) { return critiquing_keys.indexOf(v) === -1 })
            //交集
            rest_keys_of_critiqued_product = rest_keys_of_critiqued_product.filter(function (v) { return critiquing_feature_list.indexOf(v) > -1 })
            var new_critiqued_item = get_most_similar_product(rest_keys_of_critiqued_product, filtered_products, critiqued_product)

            return new_critiqued_item
        }
        return 0

    }
    return 0
}




export default update_critiqued_item;