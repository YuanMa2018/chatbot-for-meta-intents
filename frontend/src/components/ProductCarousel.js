import React from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import {getTopProductsAction} from '../actions/productActions.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import { TOP_PRODUCT_LSIT_REQUEST,PRODUCT_LSIT_REQUEST } from '../constants/productConstants'



function ProductCarousel() {    
    const dispatch = useDispatch()
    const topProducts_data = useSelector((state)=>state.topProducts)
    const {loading, topProducts, error} = topProducts_data

    useEffect(() => {
        dispatch(getTopProductsAction())
    }, [])
    //////dispatch//////////

    return (loading
        ? (<Loader></Loader>)
        :error
            ?(<Message>error</Message>)
            :(<Carousel pause='hover' className='bg-dark'>
                {topProducts.map(
                    (product) => (
                        <CarouselItem key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <Image 
                                //  src={product.image}
                                //  src={"http://localhost:5001/staticL/"+product.image}
                                //  src={process.env.REACT_APP_root_image_path + product.image}
                                 src={process.env.REACT_APP_root_image_path + product.amazon_image}
                                 alt={product.name} 
                                 fluid></Image>
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.brand} {product.model_name}</h2>
                                </Carousel.Caption>
                            </Link>
                        </CarouselItem>
                    )
                )}
            </Carousel>))
}

export default ProductCarousel
