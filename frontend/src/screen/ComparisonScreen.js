import React, { lazy } from 'react'
import { Container, Row, Col, Image, Form } from 'react-bootstrap'
import { Card, Button } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import RatingStar from '../components/RatingStar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail, createReviewAction } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { List, Rating } from '@mui/material'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { keys } from '@mui/system'
import OptionsRadio from '../components/OptionsRadio'
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AssessmentTables from '../components/AssessmentTable'
import { submitInteractionTrackAction } from '../actions/inteactionTrackActions'
import { setBackMainPageAction } from '../actions/backMainPageActions'
import { setInMainPageAction, setInComparisonPageAction } from '../actions/inMainPageActions'

import Box from '@mui/material/Box';
import { Button as MuiButton } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { updateMetaIntentsInfluenceStateAction } from '../actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../actions/inteactionTrackActions';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function ComparisonScreen() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const [open, setOpen] = React.useState(false);

    const [descriptionOpen, setDescriptionOpen] = React.useState(false);
    const [questionAnswerOpen, setQuestionAnswerOpen] = React.useState(false);
    const [reviewsOpen, setReviewsOpen] = React.useState(false);
    const [assessmentOpen, setAssessmentOpen] = React.useState(false);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const [differentFeatureNames, setDifferentFeatureNames] = React.useState([]);

    const { id } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    // console.log("id:" + id)
    // console.log("search:" + search)


    const dispatch = useDispatch();
    const productDetail_data = useSelector((state) => state.productDetail)
    const userLogin_data = useSelector((state) => state.userLogin)
    const createProductReview_data = useSelector((state) => state.createProductReview)
    const {
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,

        // critique times
        critiquing_oriented__critiquing_state,
        critiquing_oriented__critiquing_times,

        // interest in details times
        interest_in_detail__state,
        interest_in_detail__times,
        interest_in_detail__show_more_times,
        interest_in_detail__show_less_times,

    } = useSelector(state => state.metaIntentsInfluenceState)

    const metaIntentsInfluenceState = useSelector(state => state.metaIntentsInfluenceState)



    const {
        MI_profile_Interest_In_Detail,
        MI_profile_Scope_Of_Choice,
        MI_profile_Dialog_Initiation,
        MI_profile_Comparison_Orientation,
        MI_profile_Explanation_Orientation, } = useSelector(state => state.metaIntentsProfileState)

    const { userIndex } = useSelector((state) => state.userIndexState)
    const { userRG01 } = useSelector((state) => state.userRG01State)
    const { gp_back } = useSelector((state) => state.backMainPageState)
    const { is_in_main_page } = useSelector((state) => state.inMainPageState)



    useEffect(() => {
        dispatch(setInMainPageAction(false))
        dispatch(setInComparisonPageAction(true))
        if (MI_profile_Interest_In_Detail == 1) {
            //feature details
            setOpen(true)
            setDescriptionOpen(true)
            setQuestionAnswerOpen(true)
            setReviewsOpen(true)
            setAssessmentOpen(true)
        }
    }, []);

    useEffect(() => {
        if (comparison_oriented__comparison_list.length > 1) {
            var feature_Names = Object.getOwnPropertyNames(comparison_oriented__comparison_list[0])
            var new_differentFeatureNames = []
            for (let feature_index = 0; feature_index < feature_Names.length; feature_index++) {
                let current_feature__differebt_obj_values = []
                for (let index = 0; index < comparison_oriented__comparison_list.length; index++) {
                    let current_feature_value = comparison_oriented__comparison_list[index][feature_Names[feature_index]]
                    current_feature__differebt_obj_values.push(current_feature_value);
                }

                const all_same = current_feature__differebt_obj_values.every(el => el === current_feature__differebt_obj_values[0])

                if (all_same) {
                    continue
                } else {
                    new_differentFeatureNames.push(feature_Names[feature_index])
                }
            }
            handleUpdateDifferentFeatureNames(new_differentFeatureNames)
            // console.log(new_differentFeatureNames)

        } else {
            handleUpdateDifferentFeatureNames([])
        }
    }, [comparison_oriented__comparison_list]);

    useEffect(() => {
        dispatch(setInMainPageAction(false))
        // adding event listeners on mount here
        if (gp_back) {
            navigate("/?user_index=" + userIndex + "&RG01=" + userRG01)
            dispatch(setBackMainPageAction(false))
        }
    }, [gp_back]);


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }


    const handleClick = () => {
        if (!open) {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_more_times=' + interest_in_detail__show_more_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_more_times: interest_in_detail__show_more_times + 1
            }))
        } else {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_less_times=' + interest_in_detail__show_less_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_less_times: interest_in_detail__show_less_times + 1
            }))
        }
        setOpen(!open);
    };
    const handleClickDescription = () => {
        if (!descriptionOpen) {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_more_times=' + interest_in_detail__show_more_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_more_times: interest_in_detail__show_more_times + 1
            }))
        } else {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_less_times=' + interest_in_detail__show_less_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_less_times: interest_in_detail__show_less_times + 1
            }))
        }
        setDescriptionOpen(!descriptionOpen);
    };

    const handleClickQuestionAnswer = () => {
        if (!questionAnswerOpen) {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_more_times=' + interest_in_detail__show_more_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_more_times: interest_in_detail__show_more_times + 1
            }))
        } else {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_less_times=' + interest_in_detail__show_less_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_less_times: interest_in_detail__show_less_times + 1
            }))
        }
        setQuestionAnswerOpen(!questionAnswerOpen);
    };

    const handleClickReviews = () => {
        if (!reviewsOpen) {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_more_times=' + interest_in_detail__show_more_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_more_times: interest_in_detail__show_more_times + 1
            }))
        } else {
            submit_interaction_track(
                dispatch,
                false,
                'show more details in product page',
                'previous interest_in_detail__show_less_times=' + interest_in_detail__show_less_times,
                'None',
                'Relevant MI:  interest in details',
            );
            dispatch(updateMetaIntentsInfluenceStateAction({
                interest_in_detail__show_less_times: interest_in_detail__show_less_times + 1
            }))
        }
        setReviewsOpen(!reviewsOpen);
    };

    const handleClickAssessment = () => {
        setAssessmentOpen(!assessmentOpen);
    };


    const handleUpdateDifferentFeatureNames = (new_list) => {
        setDifferentFeatureNames(new_list);
    };

    return (
        <div>
            <Link to={"/?user_index=" + userIndex + "&RG01=" + userRG01} >
                <Button variant="outline-dark" className='m-3'>
                    Back to recommendations
                </Button>
            </Link>


            {<Row >
                <Col xs={11} >
                    <Row className='d-flex justify-content-center'>
                        {comparison_oriented__comparison_list?.map((product, id) => (
                            <Col key={id} xs={3}>
                                <Meta title={product.name}></Meta>
                                <Row>
                                    <Col>
                                        <div className='d-flex justify-content-center'>
                                            {product.amazon_image &&
                                                <Link to={`/products/${product._id}`}>
                                                    <Image
                                                        // src={"http://localhost:5001/staticL/" + product.image}
                                                        // src={process.env.REACT_APP_root_image_path + product.image}
                                                        src={process.env.REACT_APP_root_image_path + product.amazon_image}
                                                        lat={product.name}
                                                        fluid
                                                        // style={{ width: "auto", height: "auto", maxHeight: "700px", maxWidth: "100%" }}
                                                        style={{ width: "auto", height: "auto", minHeight: "90px", maxHeight: "150px", maxWidth: "100%" }}
                                                        loading="lazy"
                                                    >
                                                    </Image>
                                                </Link>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item >
                                                {product.brand + " " + product.name}
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('rating') ? 'success' : ''}>
                                                <RatingStar
                                                    rating={product.rating}
                                                    numRatings={product.numRatings}>
                                                </RatingStar>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('price') ? 'success' : ''}>
                                                Price : {product.price} Euros
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('brand') ? 'success' : ''}>
                                                Brand : {product.brand}
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('model_year') ? 'success' : ''}>
                                                Model year : {product.model_year}
                                            </ListGroup.Item>


                                            <ListGroup.Item className='fs-6'>
                                                {/* Color : {product.colour} */}
                                                <div style={{ display: "grid" }}>
                                                    <div style={{ overflow: "scroll", whiteSpace: "nowrap" }}>
                                                        <OptionsRadio feature_name={"Color"} options={product.colour_options} currentValue={product.color_category}
                                                            unit={''} product={product} />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('weight') ? 'success' : ''}>
                                                Weight : {product.weight + " " + product.weight_unit}
                                            </ListGroup.Item>
                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('screen_size') ? 'success' : ''}>
                                                {/* Screen size : {product.screen_size + " " + product.screen_size_unit} */}
                                                Screen size : {parseFloat(product.screen_size * 0.393701).toFixed(1) + " inches" + " / " + product.screen_size + " " + product.screen_size_unit}
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('RAM') ? 'success' : ''}>

                                                <div style={{ display: "grid" }}>
                                                    <div style={{ overflow: "scroll", whiteSpace: "nowrap" }}>
                                                        <OptionsRadio feature_name={"RAM"} options={product.RAM_options} currentValue={product.RAM}
                                                            unit={'GB'} product={product} />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('ROM') ? 'success' : ''}>
                                                <div style={{ display: "grid" }}>
                                                    <div style={{ overflow: "scroll", whiteSpace: "nowrap" }}>
                                                        <OptionsRadio feature_name={"Storage"} options={product.ROM_options} currentValue={product.ROM}
                                                            unit={'GB'} product={product} />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>


                                            <ListItemButton onClick={handleClick}>
                                                <ListItemText primaryTypographyProps={{ fontSize: '12px' }} primary="show more features" className='d-flex justify-content-center fs-6' />
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            <Collapse in={open} timeout="auto" unmountOnExit >
                                                <ListGroup variant='flush'>

                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('fingerprint_unlock') ? 'success' : ''}>
                                                        Bio unlock : {product.fingerprint_unlock === "yes"
                                                            ? "fingerprint"
                                                            : product.fingerprint_unlock === "face_unlock"
                                                                ? "faceID"
                                                                : "None"}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('back_camera_numbers') ? 'success' : ''}>
                                                        Main camera numbers : {product.back_camera_numbers}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('main_camera_resolution') ? 'success' : ''}>
                                                        Main camera resolution : {product.main_camera_resolution + " " + product.main_camera_resolution_unit}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' style={{ minHeight: "53px" }} variant={differentFeatureNames.includes('front_camera_resolution') ? 'success' : ''}>
                                                        Front camera resolution : {product.front_camera_resolution + " " + product.front_camera_resolution_unit}
                                                    </ListGroup.Item>

                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('WN_5G') ? 'success' : ''}>
                                                        Cellular Technology : {(product.WN_5G === "yes" || product.WN_5G === "yes") ? "5G" : "4G"}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('os_version') ? 'success' : ''}>
                                                        Operating system : {product.operating_system + " " + product.os_version}
                                                    </ListGroup.Item>


                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('dual_sim') ? 'success' : ''}>
                                                        Dual sim : {product.dual_sim}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('bluetooth_version') ? 'success' : ''}>
                                                        Bluetooth version : {product.bluetooth_version}
                                                    </ListGroup.Item>

                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('operating_time_comparable_brightness') ? 'success' : ''}>
                                                        Standby time : {product.operating_time_comparable_brightness + " " + product.operating_time_comparable_brightness_unit}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('charging_time') ? 'success' : ''}>
                                                        Charging time : {product.charging_time + " " + product.charging_time_unit}
                                                    </ListGroup.Item>


                                                </ListGroup>
                                            </Collapse>


                                        </ListGroup>


                                    </Col>
                                </Row>



                                {/* Assessment */}

                                <Row>
                                    <Col>
                                        <h5 className='my-3'>Assessment</h5>
                                        <ListItemButton onClick={handleClickAssessment}>
                                            <ListItemText primaryTypographyProps={{ fontSize: '12px' }} primary="show assessments        (lower is better)" className='d-flex justify-content-center' />
                                            {assessmentOpen ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={assessmentOpen} timeout="auto" unmountOnExit >
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item className='fs-6' >
                                                    Test rating : {product.total_rating + " (" + product.total_score + ")"}
                                                </ListGroup.Item>
                                                {product.display_score

                                                    ? <ListGroup variant='flush'>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('Basic_function_rating') ? 'success' : ''} >Basic function : {product.Basic_function_rating + " (" + product.Basic_function_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('camera_rating') ? 'success' : ''} >Camera : {product.camera_rating + " (" + product.camera_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('display_rating') ? 'success' : ''} >Screen : {product.display_rating + " (" + product.display_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('battery_rating') ? 'success' : ''} >Battery : {product.battery_rating + " (" + product.battery_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('handling_rating') ? 'success' : ''} >Handling : {product.handling_rating + " (" + product.handling_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('Stability_rating') ? 'success' : ''} >Stability : {product.Stability_rating + " (" + product.Stability_score + ")"}</ListGroup.Item>
                                                    </ListGroup>
                                                    : <ListGroup variant='flush'>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('phone_rating') ? 'success' : ''} >Telefon: {product.phone_rating + " (" + product.phone_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('internet_pc_rating') ? 'success' : ''} >Internet: {product.internet_pc_rating + " (" + product.internet_pc_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('camera_rating') ? 'success' : ''} >Camera: {product.camera_rating + " (" + product.camera_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('location_navigation_rating') ? 'success' : ''} >Location: {product.location_navigation_rating + " (" + product.location_navigation_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('music_player_rating') ? 'success' : ''} >Music: {product.music_player_rating + " (" + product.music_player_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('battery_rating') ? 'success' : ''} >Battery: {product.battery_rating + " (" + product.battery_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('handling_rating') ? 'success' : ''} >Handling: {product.handling_rating + " (" + product.handling_score + ")"}</ListGroup.Item>
                                                        <ListGroup.Item className='fs-6' variant={differentFeatureNames.includes('Stability_rating') ? 'success' : ''} >Stability: {product.Stability_rating + " (" + product.Stability_score + ")"}</ListGroup.Item>
                                                    </ListGroup>}

                                            </ListGroup>
                                        </Collapse>
                                    </Col>
                                </Row>




                                {true &&
                                    <Row className='my-2'>
                                        <h5 className='my-2'>Stock Status</h5>
                                        <Col >
                                            <ListGroup variant='flush'>
                                                <Card>
                                                    <ListGroup.Item className='fs-6' >
                                                        <Row>
                                                            <Col>Price:</Col>
                                                            <Col>
                                                                <strong>€{product.price}</strong>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item className='fs-6' >

                                                        <Row>
                                                            <Col>Status:</Col>
                                                            <Col>
                                                                <span>
                                                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    {
                                                        product.countInStock > 0 ? (
                                                            <ListGroup.Item className='fs-6' >
                                                                <Row>
                                                                    <Col>Qty</Col>
                                                                    <Col>
                                                                        <Form.Control className='fs-6' as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                            {[...Array(product.countInStock).keys()].map(
                                                                                (i) => (<option key={i + 1} value={i + 1} >{i + 1}</option>)
                                                                            )}
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        ) : null
                                                    }


                                                    <ListGroup.Item className='d-flex fs-6'>
                                                        <div className='me-auto'></div>
                                                        <Button className="btn-block me-auto fs-6" type="button" onClick={() => {
                                                            submit_interaction_track(
                                                                dispatch,
                                                                false,
                                                                "metaIntentsInfluenceState",
                                                                JSON.stringify(metaIntentsInfluenceState),
                                                                'None',
                                                                'None'
                                                            )
                                                            dispatch(submitInteractionTrackAction());
                                                            // addToCartHandler();
                                                            handleOpen();
                                                        }} disabled={product.countInStock === 0}>
                                                            Add to Cart
                                                        </Button>
                                                    </ListGroup.Item>
                                                </Card>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                }


                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>


            }



            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thanks!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please go back to questionnaire and finish the last few questions.
                    </Typography>
                </Box>
            </Modal>
        </div >

    )
}

export default ComparisonScreen
