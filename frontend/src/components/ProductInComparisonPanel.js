import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import RatingStar from './RatingStar'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button as MuiButton, Checkbox, FormControlLabel } from '@mui/material'
import { updateMetaIntentsInfluenceStateAction } from '../actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../actions/inteactionTrackActions';
import { useEffect } from 'react'


function ProductInComparisonPanel({ product }) {

    const comparison_list_length = 4
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch()
    const location = useLocation()

    const { scope_of_choice__show_more__state,
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,
        // critique times
        critiquing_oriented__critiquing_state,
        critiquing_oriented__critiquing_times } = useSelector(state => state.metaIntentsInfluenceState)
    // const { loading, error, products } = useSelector(state => state.productList)

    // const product = products.filter((one_product) => { return one_product?._id === product_id }).at(0)

    useEffect(() => {

        if (comparison_oriented__comparison_list?.map(one => one._id).includes(product?._id)) {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [comparison_oriented__comparison_list])

    const handleChange = (judge) => {
        if (judge) {
            if (comparison_oriented__comparison_list.length < comparison_list_length) {
                const temp = comparison_oriented__comparison_list.slice()
                temp.push(product?._id)
                dispatch(updateMetaIntentsInfluenceStateAction({ comparison_oriented__comparison_list: temp }))
            }
        } else {
            const temp = comparison_oriented__comparison_list.filter(function (element) {
                return element._id !== product?._id;
            });
            dispatch(updateMetaIntentsInfluenceStateAction({ comparison_oriented__comparison_list: temp }))
        }
    };


    return (
        <Col>
            <Card className='my-1 py-1 rounded'>
                <Link to={`/products/${product?._id}`}>
                    <Card.Img
                        style={{ width: "auto", height: "40px", }}
                        // src={process.env.REACT_APP_root_image_path + product?.image}>
                        src={process.env.REACT_APP_root_image_path + product?.amazon_image}>
                    </Card.Img>
                </Link>


                <div className="mb-1 d-flex justify-content-center" style={{ minHeight: "22px", fontSize: "8px" }}>
                    {product?.name}
                </div>

                <i className='fa-solid fa-trash d-flex justify-content-center' onClick={() => {

                    handleChange(!checked)
                    // dispatch(updateMetaIntentsInfluenceStateAction({ comparison_oriented__comparison_state: 1 }))
                }}>
                </i>
            </Card>
        </Col>
    )
}

export default ProductInComparisonPanel
