import { Container, Row, Col, Image, Form, ButtonGroup } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RatingStar from '../../components/RatingStar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail, createReviewAction } from '../../actions/productActions'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { List, Rating } from '@mui/material'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Typography from '@mui/material/Typography';
import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
// import { Card } from 'react-bootstrap'

import PriceRangeSlider from '../../components/filters/PriceRangeSlider'
import BrandCheckBox from '../../components/filters/BrandCheckBox'
import ColorCheckBox from '../../components/filters/ColorCheckBox'
import OperatingSystemCheckBox from '../../components/filters/OperatingSystemCheckBox'
import ModelYearCheckBox from '../../components/filters/ModelYearCheckBox'
import RAMCheckBox from '../../components/filters/RAMCheckBox'
import ROMCheckBox from '../../components/filters/ROMCheckBox'
import CellularTechnologyCheckBox from '../../components/filters/CellularTechnologyCheckBox'
import ScreenSizeCheckBox from '../../components/filters/ScreenSizeCheckBox'
import WirelessCarrierCheckBox from '../../components/filters/WirelessCarrierCheckBox'
import RatingRangeSlider from '../../components/filters/RatingRangeSlider'
import NumRatingRangeSlider from '../../components/filters/NumRatingRangeSlider'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import update_critiqued_item from '../../algorithms/critiquing_algorithm'

import { getNewCritiquedProduct, initialCritiquedProduct } from '../../actions/critiquingActions.js'
import { display } from '@mui/system'
import { Button } from '@mui/material'

import { updateMetaIntentsInfluenceStateAction } from '../../actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../../actions/inteactionTrackActions';

export default function CritiquingPanel(props) {

    const [critiquing_feature_list, setCritiquing_feature_list] = useState(["price", "rating", "numRatings", "screen_size", "RAM", "ROM", "brand", "color_category", "model_year"])
    const [critiquing_feature_rename, setCritiquing_feature_rename] = useState(["price", "rating", "reviews", "size", "ram", "storage capacity", "brand", "color", "model year",])
    const string_type_feature = ['brand', 'color', 'wireless carrier']

    const dispatch = useDispatch()

    const { id } = useParams();
    const [current_filter, setCurrent_filter] = useState('')
    const [critiquing_feature_values_obj, setCritiquing_feature_values_obj] = useState({})
    const [previous_critiquing_condition, setPrevious_critiquing_condition] = useState({})

    const { products } = useSelector(state => state.productList)
    const { error, loading, critiquedProduct: product } = useSelector(state => state.critiquedProduct)
    const { critiquing_oriented__adjust_feature_times } = useSelector(state => state.metaIntentsInfluenceState)


    const icon_sx = {
        opacity: "100%",
        borderRadius: "100%",
        borderColor: "rgba(0, 0, 255, 0.3)",
        borderStyle: "solid",
        borderWidth: "1px",
        size: "50%"
    }

    const ImageStyle = props.isCritiquingScreen
        ? { width: "auto", height: "auto", minHeight: "90px", maxHeight: "200px" }
        : { width: "70%", height: "auto", maxHeight: "150px", mx: 0 }

    const CardStyle = props.isCritiquingScreen
        ? { width: '40%' }
        : {}

    const CardClassName = props.isCritiquingScreen
        ? ''
        : 'my-3 p-3 rounded'

    const CritiquePanelHeight = props.isCritiquingScreen
        ? 280
        : 115

    const just_center = props.isCritiquingScreen
        ? 'd-flex justify-content-center'
        : ''

    const isCritiquingScreen = props.isCritiquingScreen


    useEffect(() => {
        dispatch(initialCritiquedProduct(props.critiquedProduct_id))
    }, [])


    useEffect(() => {
        if (product) {
            let temp_critiquing_feature_values_obj = {}

            for (let i = 0; i < critiquing_feature_list.length; i++) {
                let current_key = critiquing_feature_list[i]
                let current_value = product[current_key]

                if (current_value !== "None" &&
                    current_value !== "" &&
                    current_value !== 0
                ) {
                    if (critiquing_feature_rename[i] === "size") {
                        temp_critiquing_feature_values_obj[critiquing_feature_rename[i]] = parseFloat(current_value * 0.393701).toFixed(1)
                        // temp_critiquing_feature_values_obj[critiquing_feature_rename[i]] = current_value
                    } else {
                        temp_critiquing_feature_values_obj[critiquing_feature_rename[i]] = current_value
                    }
                }
            }
            setCritiquing_feature_values_obj(temp_critiquing_feature_values_obj)
        }
    }, [product, critiquing_feature_list])



    const applying_critiquing = async (index, operation) => {
        let critiquing_key = Object.keys(critiquing_feature_values_obj)[index]
        let true_critiquing_key = critiquing_feature_list[critiquing_feature_rename.indexOf(critiquing_key)]
        let true_critiquing_value = 0

        //current_critiquing_key is not string type
        if (string_type_feature.indexOf(critiquing_key) === -1) {
            // console.log('critiquing_key', critiquing_key)
            // console.log('true_critiquing_key', true_critiquing_key)
            // console.log('critiquing_feature_values_obj', critiquing_feature_values_obj)
            // console.log('critiquing_feature_values_obj[critiquing_key]', critiquing_feature_values_obj[critiquing_key])
            // console.log(String(critiquing_feature_values_obj[critiquing_key]).match(/\d+(\.\d+)?/g)[0])
            true_critiquing_value = Number(String(critiquing_feature_values_obj[critiquing_key]).match(/\d+(\.\d+)?/g)[0])
        } else {
            true_critiquing_value = critiquing_feature_values_obj[critiquing_key]
        }
        let critiquing_condition = {}
        if (critiquing_key === "size") {
            critiquing_condition[true_critiquing_key] = [parseFloat(true_critiquing_value / 0.393701).toFixed(1), operation]
        } else {
            critiquing_condition[true_critiquing_key] = [true_critiquing_value, operation]
        }
        // console.log("-----1---previous_critiquing_condition---", previous_critiquing_condition)
        let critiqued_product_id = product['_id']

        // let new_critiqued_item = update_critiqued_item(products, critiquing_condition, previous_critiquing_condition, product)

        dispatch(getNewCritiquedProduct(critiquing_condition, previous_critiquing_condition, critiqued_product_id))

        //add current critiquing on previous_critiquing_condition
        let temp_var = previous_critiquing_condition
        temp_var[true_critiquing_key] = [true_critiquing_value, operation]
        setPrevious_critiquing_condition(temp_var)

        // change the order of critiquing_feature_list
        set_the_feature_to_be_first_of_both_2_list(critiquing_key)

        // record critique feature times
        dispatch(updateMetaIntentsInfluenceStateAction({
            critiquing_oriented__adjust_feature_times: critiquing_oriented__adjust_feature_times + 1
        }))
    }

    const set_the_feature_to_be_first_of_both_2_list = (critiquing_key) => {
        let dispaly_list = critiquing_feature_rename
        let real_list = critiquing_feature_list
        let delete_index = dispaly_list.indexOf(critiquing_key)
        let add_key_display = critiquing_key
        let add_key_real = real_list[delete_index]

        dispaly_list.splice(delete_index, 1);
        dispaly_list.splice(0, 0, add_key_display);
        real_list.splice(delete_index, 1);
        real_list.splice(0, 0, add_key_real);

        setCritiquing_feature_rename(dispaly_list)
        setCritiquing_feature_list(real_list)
        // console.log("--------")
        // console.log(critiquing_feature_rename)
        // console.log(critiquing_feature_list)
    }

    const transfer_feature_name_from_real_to_display = (real_name) => {
        let display_name = critiquing_feature_rename[critiquing_feature_list.indexOf(real_name)]
        return display_name
    }

    const transfer_feature_name_from_display_to_real = (display_name) => {
        let real_name = critiquing_feature_list[critiquing_feature_rename.indexOf(display_name)]
        return real_name
    }

    const show_filter_component = (index) => {
        setCurrent_filter(Object.keys(critiquing_feature_values_obj)[index])
    }

    const reset_critiquing_condition = () => {
        setPrevious_critiquing_condition({})
        setCurrent_filter("")
    }

    const renderRow = (props) => {
        const { index, style, data } = props;

        return (
            <ListItem className={just_center} style={style} key={index} component="div" onClick={(e) => { show_filter_component(index) }}>

                <IconButton color="primary" onClick={() => applying_critiquing(index, -1)}>
                    <RemoveIcon sx={
                        previous_critiquing_condition[transfer_feature_name_from_display_to_real(Object.keys(data)[index])]
                            ? previous_critiquing_condition[transfer_feature_name_from_display_to_real(Object.keys(data)[index])][1] === -1
                                ? icon_sx
                                : {}
                            : {}} color="primary" />
                </IconButton>

                {isCritiquingScreen ? <div className='mui-scroll d-flex' sx={{ backgroundColor: "green" }} >
                    <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: 'bold', }} noWrap >
                        {`${Object.keys(data)[index]}`}
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        {":"}
                        <span>&nbsp;&nbsp;&nbsp;</span>
                    </Typography>

                    <Typography sx={{ fontSize: 15, textAlign: "center" }} noWrap >
                        {` ${Object.values(data)[index]}`}
                    </Typography>
                </div> : <div>
                    <Typography sx={{ fontSize: 15, textAlign: "center" }} noWrap >
                        {`${Object.keys(data)[index]}: ${Object.values(data)[index]}`}
                    </Typography>
                </div>}



                <IconButton color="primary" onClick={() => applying_critiquing(index, 1)}>
                    <AddIcon sx={
                        previous_critiquing_condition[transfer_feature_name_from_display_to_real(Object.keys(data)[index])]
                            ? previous_critiquing_condition[transfer_feature_name_from_display_to_real(Object.keys(data)[index])][1] === 1
                                ? icon_sx
                                : {}
                            : {}} color="primary" />
                </IconButton>

            </ListItem>
        );
    }




    return (
        <Container >
            {!loading ?
                <div className={just_center}>
                    <Card style={CardStyle} className={CardClassName} >

                        <Row className='d-flex justify-content-center mt-3'>

                            <Link to={`/products/${product?._id}`} className='d-flex justify-content-center'>
                                <Image
                                    // src={process.env.REACT_APP_root_image_path + product.image}
                                    src={process.env.REACT_APP_root_image_path + product?.amazon_image}
                                    lat={product?.name}
                                    fluid
                                    style={ImageStyle}
                                // style={{ width: "70%", height: "auto", maxHeight: "150px",mx: 0 }}
                                // style={{ width: "auto", height: "auto", minHeight: "90px", maxHeight: "150px" }}
                                ></Image>
                            </Link>
                        </Row>
                        
                        <div className='d-flex justify-content-center mt-2'><strong>
                                    {product?.brand + " "}  {product?.name}
                                </strong></div>

                        <div><hr /></div>

                        {
                            (Object.keys(previous_critiquing_condition).length !== 0)
                                ?
                                <Row className='mb-2'>
                                    {/* <div className={just_center}> */}
                                    <Button variant="outlined" onClick={reset_critiquing_condition}>Reset Critiquing</Button>
                                    {/* </div> */}
                                </Row>
                                : null}

                        <Row className="d-flex ">

                            <FixedSizeList

                                height={CritiquePanelHeight}
                                // width={360}
                                itemSize={30}
                                itemCount={Object.keys(critiquing_feature_values_obj).length}
                                overscanCount={Object.keys(critiquing_feature_values_obj).length}
                                itemData={critiquing_feature_values_obj}
                            >
                                {renderRow}
                            </FixedSizeList>
                        </Row>

                        <div><hr /></div>
                        {isCritiquingScreen
                            ? <div></div>
                            : <Row>
                                {
                                    // ["price", "rating", "reviews", "size", "ram", "rom", "brand", "color", "model year", "wireless carrier"]
                                    current_filter === "price"
                                        ? <div className='mt-4'><PriceRangeSlider hide_title={true} /></div>
                                        :
                                        current_filter === "rating"
                                            ? <div className='mt-4'><RatingRangeSlider hide_title={true} /></div>
                                            :
                                            current_filter === "reviews"
                                                ? <div className='mt-4'><NumRatingRangeSlider hide_title={true} /></div>
                                                :
                                                current_filter === "size"
                                                    ? <div className='mb-4'><ScreenSizeCheckBox isInline hide_title={true} /></div>
                                                    :
                                                    current_filter === "ram"
                                                        ? <RAMCheckBox isInline hide_title={true} />
                                                        :
                                                        current_filter === "rom"
                                                            ? <ROMCheckBox isInline hide_title={true} />
                                                            :
                                                            current_filter === "brand"
                                                                ? <BrandCheckBox isInline hide_title={true} />
                                                                :
                                                                current_filter === "color"
                                                                    ? <ColorCheckBox isInline hide_title={true} />
                                                                    :
                                                                    current_filter === "model year"
                                                                        ? <ModelYearCheckBox isInline hide_title={true} />
                                                                        :
                                                                        current_filter === "wireless carrier"
                                                                            ? <WirelessCarrierCheckBox isInline hide_title={true} />
                                                                            : <div></div>

                                }

                            </Row>
                        }
                    </Card>

                </div>

                :
                <Box height={500}>
                    <Box height={100}></Box>
                    <Loader className="my-5"></Loader>
                    <Box height={100}></Box>
                </Box>
            }
        </Container >
    )
}







