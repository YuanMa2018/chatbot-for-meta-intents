import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import RatingStar from './RatingStar'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button as MuiButton, Checkbox, FormControlLabel, FormControl, FormGroup, Typography } from '@mui/material'
import { updateMetaIntentsInfluenceStateAction } from '../actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../actions/inteactionTrackActions';
import { useEffect } from 'react'
import Form from 'react-bootstrap/Form';


function Product({ product }) {

    const comparison_list_length = 4
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch()
    const location = useLocation()

    const {
        scope_of_choice__show_more__state,
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,
        comparison_oriented__add_item_times,
        comparison_oriented__remove_item_times,
        // critique times
        critiquing_oriented__critiquing_state,
        critiquing_oriented__critiquing_times, } = useSelector(state => state.metaIntentsInfluenceState)

    const {
        MI_profile_Interest_In_Detail,
        MI_profile_Scope_Of_Choice,
        MI_profile_Dialog_Initiation,
        MI_profile_Comparison_Orientation,
        MI_profile_Explanation_Orientation, } = useSelector(state => state.metaIntentsProfileState)

    // 
    // comparison_oriented__comparison_list

    useEffect(() => {
        if (comparison_oriented__comparison_list?.map(one => one._id).includes(product?._id)) {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [comparison_oriented__comparison_list, MI_profile_Interest_In_Detail])

    const handleChange = (judge) => {
        // add
        if (judge) {
            if (comparison_oriented__comparison_list.length < comparison_list_length) {
                const temp = comparison_oriented__comparison_list.slice()
                temp.push(product)
                dispatch(updateMetaIntentsInfluenceStateAction({
                    comparison_oriented__comparison_list: temp,
                    comparison_oriented__add_item_times: comparison_oriented__add_item_times + 1
                }))
            }
        }
        // remove
        else {
            const temp = comparison_oriented__comparison_list.filter(function (element) {
                return element._id !== product._id;
            });
            dispatch(updateMetaIntentsInfluenceStateAction({
                comparison_oriented__comparison_list: temp,
                comparison_oriented__remove_item_times: comparison_oriented__remove_item_times + 1
            }))
        }
    };


    return (
        // <Card className='my-1 p-1 rounded'  bg={'light'}>

        <Card className='my-1 p-1 rounded' >
            {/* checkbox  : "choose to compare" */}
            {/* {comparison_oriented__comparison_state === 1 && <FormControlLabel
                label="choose to compare"
                control={<Checkbox checked={checked} onChange={(event) => {
                    if (comparison_oriented__comparison_list.length < comparison_list_length) {
                        handleChange(event.target.checked)
                    }
                }} />}
            />} */}


            {/* {critiquing_oriented__critiquing_state === 1 && <Button className="mt-2 mb-2" size="small" variant="outlined" >click to critique</Button>} */}


            <div style={{ margin: "0 auto" }}>
                <Link to={`/products/${product._id}`}>
                    <Card.Img
                        style={{ width: "auto", height: "auto", minHeight: "100px", maxHeight: "100px", maxWidth: "100%" }}
                        // src={process.env.REACT_APP_root_image_path + product.image}>
                        src={process.env.REACT_APP_root_image_path + product.amazon_image}>
                    </Card.Img>
                </Link>
            </div>

            <Card.Body>
                <Link style={{ textDecoration: 'none', fontSize: "large" }}
                    to={`/products/${product._id}`}
                >
                    {/* <Card.Header>{product.brand + " " + product.name}</Card.Header> */}
                    <Card.Title className='mb-1 fs-6' style={{ minHeight: "28px" }} >{product.brand + " " + product.name}</Card.Title>
                    {/* <Card.Subtitle as="div"> */}
                    {MI_profile_Interest_In_Detail == "1"
                        ? <Card.Text className="fs-6">
                            <div >
                                {product.model_year}
                            </div>
                            <div>
                                {product.weight + " " + product.weight_unit.toLowerCase()}
                            </div>
                            <div>
                                {parseFloat(product.screen_size * 0.393701).toFixed(1) + " inches"}
                            </div>
                            <div>
                                {product.RAM}GB + {product.ROM}GB
                            </div>
                        </Card.Text>
                        : <Card.Text className="fs-6">
                            <div>
                                {parseFloat(product.screen_size * 0.393701).toFixed(1) + " inches"}
                            </div>
                        </Card.Text >}
                </Link>

                <Card.Subtitle>
                    <div className='my-2'>
                        {/* {product.rating} from {product.numRatings} reviews */}
                        {MI_profile_Interest_In_Detail == "1"
                            ? <RatingStar rating={product.rating} numRatings={product.numRatings}></RatingStar>
                            : <RatingStar rating={product.rating} ></RatingStar>}
                    </div>
                </Card.Subtitle>

                <Card.Subtitle as={"h6"}>
                    €{product.price}
                </Card.Subtitle>
            </Card.Body>

            {/* //checkbox version             */}


            <FormControlLabel
                className="d-flex  justify-content-center"
                labelPlacement="start"
                control={
                    <Checkbox checked={checked} onChange={() => { handleChange(!checked) }} />
                }
                label={
                    <Typography sx={{ fontSize: 10 }}>
                        included in comparison list
                    </Typography>

                }
            />

            {/* <Form.Check
                    style={{ fontSize: "12px" }}
                    reverse
                    checked={checked}
                    type={'checkbox'}
                    label={'included in comparison'}
                    onChange={() => { handleChange(!checked) }}
                /> */}





            {/* //button verision */}
            {/* <Button variant="outline-primary" size="sm" onClick={() => {

                handleChange(!checked)
            }

            }>
                {checked ? "remove from comparison list" : "add to comparison"}
            </Button> */}
        </Card>
    )
}

export default Product

