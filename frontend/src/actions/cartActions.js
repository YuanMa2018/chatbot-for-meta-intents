import {CART_ADD_ITEM,CART_REMOVE_ITEM} from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id,qty) => async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            amazon_image: data.amazon_image,
            price: data.price,
            countInStock: data.countInStock,
            qty:qty
        }
    })

    localStorage.setItem(`cartItems`,JSON.stringify(getState().cart.cartItems))
}

export const removeProductInCart = (id) => async(dispatch,getState)=>{

    dispatch({
        type:CART_REMOVE_ITEM,
        payload:{
            product: id
        }
    })

    localStorage.setItem(`cartItems`,JSON.stringify(getState().cart.cartItems))
}