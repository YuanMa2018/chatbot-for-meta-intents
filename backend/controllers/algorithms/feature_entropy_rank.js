
// const get_num_products_according_to_one_value = (one_feature_specific_value, one_feature,products)=>{
//     var one_feature_value_nums_products = 0
//     return one_feature_value_nums_products
// }


//version 1
// feature entropy: H(x) = -sum log(x)
const get_one_feature_entropy = (one_feature_data) => {
    // console.log("one_feature_data---",one_feature_data)

    var total_entropy_value = 0
    var all_nums_products = one_feature_data.reduce((partialSum, a) => partialSum + a, 0);

    for (let index = 0; index < one_feature_data.length; index++) {
        let one_entropy_value = -Math.log2(one_feature_data[index]/all_nums_products)
        total_entropy_value = total_entropy_value + one_entropy_value
    }
    return (total_entropy_value/all_nums_products).toFixed(5)
}


//version 2
// feature entropy: H(x) = -sum p(x)*log(x)
const get_one_feature_entropy_2 = (one_feature_data) => {
    // console.log("one_feature_data---",one_feature_data)

    var total_entropy_value = 0
    var all_nums_products = one_feature_data.reduce((partialSum, a) => partialSum + a, 0);

    for (let index = 0; index < one_feature_data.length; index++) {
        let one_entropy_value = -Math.log2(one_feature_data[index]/all_nums_products)
        total_entropy_value = total_entropy_value + one_entropy_value
    }
    return (total_entropy_value/one_feature_data.length).toFixed(5)
}
// // critiquing_condition : {"price":[300, 1]} greater than
// // critiquing_condition : {"price":[300, -1]} smaller than


const feature_entropy_rank = (all_data) => {
    var feature_entropy = {}
    for (let index = 0; index < all_data.length; index++) {
        // console.log(Object.keys(all_data[index])[0])
        let one_feature_entropy = get_one_feature_entropy_2(Object.values(all_data[index])[0])
        feature_entropy[Object.keys(all_data[index])[0]]= one_feature_entropy
    }
    
    const entries = Object.entries(feature_entropy);

    entries.sort((a, b) => b[1] - a[1]);
    console.log(entries)
    return entries[0][0].slice(1)
}

export default feature_entropy_rank;



