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
import { updateCallFunctionInChatbotAction } from '../actions/callFunctionInChatbotActions'

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


function ProductScreen() {

    const comparison_list_length = 4
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const [open, setOpen] = React.useState(false);
    const [descriptionOpen, setDescriptionOpen] = React.useState(false);
    const [questionAnswerOpen, setQuestionAnswerOpen] = React.useState(false);
    const [reviewsOpen, setReviewsOpen] = React.useState(false);
    const [assessmentOpen, setAssessmentOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const { id } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    // console.log("id:" + id)
    // console.log("search:" + search)


    const dispatch = useDispatch();
    const productDetail_data = useSelector((state) => state.productDetail)
    const userLogin_data = useSelector((state) => state.userLogin)
    const createProductReview_data = useSelector((state) => state.createProductReview)
    const { userIndex } = useSelector((state) => state.userIndexState)
    const { userRG01 } = useSelector((state) => state.userRG01State)
    const { gp_back } = useSelector((state) => state.backMainPageState)
    const { is_in_main_page } = useSelector((state) => state.inMainPageState)

    const { loading, product, error } = productDetail_data
    const { userInfo } = userLogin_data
    const { loading: createProductReview_locading,
        success: createProductReview_success,
        error: createProductReview_error } = createProductReview_data


    const { scope_of_choice__show_more__state,
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,
        comparison_oriented__add_item_times,
        comparison_oriented__remove_item_times,

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

    const { chatbot_function__remind_comparison,
        chatbot_function__latest_checking_products_list } = useSelector(state => state.callFunctionInChatbotState)

    const {
        MI_profile_Interest_In_Detail,
        MI_profile_Scope_Of_Choice,
        MI_profile_Dialog_Initiation,
        MI_profile_Comparison_Orientation,
        MI_profile_Explanation_Orientation, } = useSelector(state => state.metaIntentsProfileState)


    useEffect(() => {
        if (comparison_oriented__comparison_list?.map(one => one._id).includes(product?._id)) {
            setChecked(true);
        } else {
            setChecked(false);
        }

    }, [comparison_oriented__comparison_list, product])

    useEffect(() => {
        //MI adaption
        if (MI_profile_Interest_In_Detail == 1) {
            //feature details
            setOpen(true)
            setDescriptionOpen(true)
            setQuestionAnswerOpen(true)
            setReviewsOpen(true)
            setAssessmentOpen(true)
        }

        dispatch(setInMainPageAction(false))
        dispatch(setInComparisonPageAction(false))

        submit_interaction_track(
            dispatch,
            false,
            'check product details',
            'previous interest_in_detail__times=' + interest_in_detail__times,
            'None',
            'Relevant MI:  interest in details',
        );
        dispatch(updateMetaIntentsInfluenceStateAction({
            interest_in_detail__times: interest_in_detail__times + 1,
            critiquing_oriented__critiquing_state: 1
        }));

        // triger reminding comparison in chatbot
        // successful loading   // current product is not in list
        if (product?._id
            && !chatbot_function__latest_checking_products_list?.map(one => one._id).includes(product?._id)
            && !comparison_oriented__comparison_list?.map(one => one._id).includes(product?._id)) {
            if (
                // have another product in list
                chatbot_function__latest_checking_products_list?.length >= 1
                && chatbot_function__remind_comparison == 0) {

                dispatch(updateCallFunctionInChatbotAction({
                    chatbot_function__remind_comparison: 1,
                    chatbot_function__latest_checking_products_list: [...chatbot_function__latest_checking_products_list, product]
                }))

            } else {
                dispatch(updateCallFunctionInChatbotAction({
                    chatbot_function__latest_checking_products_list: [...chatbot_function__latest_checking_products_list, product]
                }))
            }

        }
    }, [product]);

    useEffect(() => {
        dispatch(setInMainPageAction(false))
        // adding event listeners on mount here
        if (gp_back) {
            navigate("/?user_index=" + userIndex + "&RG01=" + userRG01)
            dispatch(setBackMainPageAction(false))
        }
    }, [gp_back]);

    useEffect(() => {
        // console.log(process.env.REACT_APP_root_image_path)
        // console.log(product)
        if (createProductReview_success) {
            setRating(0)
            setComment('')
        }

        if (!product?._id || createProductReview_success || product?._id !== id) {
            // console.log("effect!")
            // console.log("id,search:", id, search)
            dispatch(productDetail(id, search))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            // console.log(product)
        }

    }, [dispatch, id, createProductReview_success, search])



    const handleChange = (judge) => {
        // add
        if (judge) {
            if (comparison_oriented__comparison_list.length < comparison_list_length) {
                // const temp = comparison_oriented__comparison_list.slice()
                var temp = [...comparison_oriented__comparison_list]
                temp.push(product)
                dispatch(updateMetaIntentsInfluenceStateAction({
                    comparison_oriented__comparison_list: temp,
                    comparison_oriented__add_item_times: comparison_oriented__add_item_times + 1,
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
                comparison_oriented__remove_item_times: comparison_oriented__remove_item_times + 1,
            }))
        }
    };

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const reviewSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(createReviewAction(id, { rating, comment }))
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


    return (
        <div>
            <Link to={"/?user_index=" + userIndex + "&RG01=" + userRG01} >
                <Button variant="outline-dark" className='m-3'>
                    Back to recommendations
                </Button>
            </Link>


            {loading ? (<Loader>Loading</Loader>)
                : error ? (<Message variant="danger">{error}</Message>)
                    :
                    (<Container>
                        <Meta title={product.name}></Meta>
                        <Row >
                            <Col md={5} >
                                <div >
                                    {product.amazon_image && <Image
                                        // src={"http://localhost:5001/staticL/" + product.image}
                                        // src={process.env.REACT_APP_root_image_path + product.image}
                                        src={process.env.REACT_APP_root_image_path + product.amazon_image}
                                        lat={product.name}
                                        fluid
                                        style={{ width: "auto", height: "auto", maxHeight: "700px", maxWidth: "100%" }}
                                        loading="lazy"
                                    ></Image>}

                                </div>
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.brand + " " + product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <RatingStar
                                            rating={product.rating}
                                            numRatings={product.numRatings}>
                                        </RatingStar>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price : {product.price} Euros
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Brand : {product.brand}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Model year : {product.model_year}
                                    </ListGroup.Item>


                                    <ListGroup.Item>
                                        {/* Color : {product.colour} */}
                                        <OptionsRadio feature_name={"Color"} options={product.colour_options} currentValue={product.color_category}
                                            unit={''} product={product} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Weight : {product.weight + " " + product.weight_unit}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {/* Screen size : {product.screen_size + " " + product.screen_size_unit} */}
                                        Screen size : {parseFloat(product.screen_size * 0.393701).toFixed(1) + " inches" + " / " + product.screen_size + " " + product.screen_size_unit}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <OptionsRadio feature_name={"RAM"} options={product.RAM_options} currentValue={product.RAM}
                                            unit={'GB'} product={product} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <OptionsRadio feature_name={"Storage capacity"} options={product.ROM_options} currentValue={product.ROM}
                                            unit={'GB'} product={product} />
                                    </ListGroup.Item>



                                    <ListItemButton onClick={handleClick}>
                                        <ListItemText primary="show more features" className='d-flex justify-content-center' />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>

                                    <Collapse in={open} timeout="auto" unmountOnExit >
                                        <ListGroup variant='flush'>

                                            <ListGroup.Item>
                                                Bio unlock : {product.fingerprint_unlock === "yes"
                                                    ? "fingerprint"
                                                    : product.fingerprint_unlock === "face_unlock"
                                                        ? "faceID"
                                                        : "None"}
                                            </ListGroup.Item>
                                            <ListGroup.Item >
                                                Main camera numbers : {product.back_camera_numbers}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Main camera resolution : {product.main_camera_resolution + " " + product.main_camera_resolution_unit}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Front camera resolution : {product.front_camera_resolution + " " + product.front_camera_resolution_unit}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Cellular Technology : {(product.WN_5G === "yes" || product.WN_5G === "yes") ? "5G" : "4G"}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Operating system : {product.operating_system + " " + product.os_version}
                                            </ListGroup.Item>


                                            <ListGroup.Item>
                                                Dual sim : {product.dual_sim}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Bluetooth version : {product.bluetooth_version}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                Standby time : {product.operating_time_comparable_brightness + " " + product.operating_time_comparable_brightness_unit}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Charging time : {product.charging_time + " " + product.charging_time_unit}
                                            </ListGroup.Item>


                                        </ListGroup>
                                    </Collapse>


                                </ListGroup>


                            </Col>

                            <Col md={3}>
                                {/* // show the shopping cart or not */}
                                {false &&
                                    <ListGroup variant='flush'>
                                        <Card>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>€{product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>

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
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                    {[...Array(product.countInStock).keys()].map(
                                                                        (i) => (<option key={i + 1} value={i + 1} >{i + 1}</option>)
                                                                    )}
                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ) : null
                                            }


                                            <ListGroup.Item className='d-flex'>
                                                <div className='me-auto'></div>
                                                <Button className="btn-block me-auto" type="button" onClick={() => {
                                                    submit_interaction_track(
                                                        dispatch,
                                                        false,
                                                        "metaIntentsInfluenceState",
                                                        JSON.stringify(metaIntentsInfluenceState),
                                                        'None',
                                                        'None'
                                                    )
                                                    dispatch(submitInteractionTrackAction());
                                                    addToCartHandler();
                                                }} disabled={product.countInStock === 0}>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </Card>
                                    </ListGroup>
                                }
                            </Col>
                        </Row>


                        {/* two buttons: comparison and critique */}
                        <Button size='sm' variant="outline-dark" className='m-3' onClick={() => {
                            handleChange(!checked)
                        }
                        }>
                            {checked ? "removed from comparison list" : "add to comparison"}
                        </Button>

                        <Link to={`/critiquing/${product._id}`} >
                            <Button size='sm' variant="outline-dark" className='m-3' onClick={() => {
                                submit_interaction_track(
                                    dispatch,
                                    false,
                                    'critiquing products',
                                    'previous critiquing_oriented__critiquing_times=' + critiquing_oriented__critiquing_times,
                                    'None',
                                    'Relevant MI:  critiquing oriented',
                                );
                                dispatch(updateMetaIntentsInfluenceStateAction({
                                    critiquing_oriented__critiquing_times: critiquing_oriented__critiquing_times + 1,
                                    critiquing_oriented__critiquing_state: 1
                                }));

                            }}>Similar product with different features</Button>
                        </Link>


                        {/* Description */}
                        <Row>
                            {product.description?.length !== 0
                                ? <Col md={8}>
                                    <h2 className='my-3'>Description</h2>
                                    {/* <ListGroup variant='flush'> */}
                                    <ListGroup>
                                        {
                                            product.description?.length <= 1
                                                ? product.description.map((single_point, id) => {
                                                    return (
                                                        <ListGroup.Item key={id}>
                                                            {single_point}
                                                        </ListGroup.Item>)
                                                })
                                                : <div>
                                                    {
                                                        product.description?.slice(0, 1).map((single_point, index) =>
                                                            <ListGroup.Item key={index}>
                                                                {single_point}
                                                            </ListGroup.Item>
                                                        )
                                                    }
                                                    <ListItemButton onClick={handleClickDescription}>
                                                        <ListItemText primary="show more Descriptions " className='d-flex justify-content-center' />
                                                        {descriptionOpen ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItemButton>

                                                    <Collapse in={descriptionOpen} timeout="auto" unmountOnExit >{
                                                        product.description?.slice(1, product.description.length).map((single_point, index) => (
                                                            <ListGroup.Item key={index}>
                                                                {single_point}
                                                            </ListGroup.Item>
                                                        ))
                                                    }
                                                    </Collapse>
                                                </div>
                                        }
                                    </ListGroup>
                                </Col>
                                : <div />}
                        </Row>


                        {/* Questions & Answers */}
                        <Row>
                            <Col md={8}>
                                <h2 className='my-3'>Questions & Answers</h2>
                                {(!product.user_question_answers || product.user_question_answers.length === 0 || product.numQAs === 0) ? (<Message>No Reviews</Message>) : (
                                    <ListGroup>
                                        {product.user_question_answers?.length <= 1
                                            ? product.user_question_answers?.slice(0, product.numQAs).map((QA) => (
                                                <ListGroup.Item key={QA._id}>
                                                    <p>Question : {Object.values(QA)[0]}</p>
                                                    <p>Answer : {Object.values(QA)[1]}</p>
                                                </ListGroup.Item>
                                            ))
                                            : <div>
                                                {product.user_question_answers?.slice(0, 1).map((QA, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <p>Question : {Object.values(QA)[0]}</p>
                                                        <p>Answer : {Object.values(QA)[1]}</p>
                                                    </ListGroup.Item>
                                                ))}
                                                <ListItemButton onClick={handleClickQuestionAnswer}>
                                                    <ListItemText primary="show more Question&Answers " className='d-flex justify-content-center' />
                                                    {questionAnswerOpen ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>

                                                <Collapse in={questionAnswerOpen} timeout="auto" unmountOnExit >
                                                    {product.reviews?.slice(1, product.numComments).map((review, index) => (

                                                        <ListGroup.Item key={index}>
                                                            <div className='mt-3'><strong>{review.name}</strong>  </div>
                                                            <small className='mb-3'>{review.date}</small>
                                                            <RatingStar rating={review.rating} numRatings={review.number_of_isHelpful} isUseful={true}> </RatingStar>
                                                            <p>{review.comment}</p>
                                                        </ListGroup.Item>
                                                    ))}
                                                </Collapse>
                                            </div>
                                        }
                                    </ListGroup>)}

                            </Col>
                        </Row>


                        {/* Reviews */}
                        <Row>
                            <Col md={8}>
                                <h2 className='my-3'>Reviews</h2>
                                {(!product.reviews || product.reviews.length === 0 || product.numComments === 0) ? (<Message>No Reviews</Message>) : (
                                    <ListGroup>
                                        {product.reviews.length <= 1
                                            ? product.reviews?.slice(0, product.numComments).map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <div className='mt-3'><strong>{review.name}</strong>  </div>
                                                    <small className='mb-3'>{review.date}</small>
                                                    {/* <Rating value={review.rating}></Rating> {review.number_of_isHelpful} */}
                                                    <RatingStar rating={review.rating} numRatings={review.number_of_isHelpful} isUseful={true}> </RatingStar>
                                                    {/* <p>{review.createAt.substring(0,10)}</p> */}
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))
                                            : <div>
                                                {product.reviews?.slice(0, 1).map((review, index) => (

                                                    <ListGroup.Item key={index}>
                                                        <div className='mt-3'><strong>{review.name}</strong>  </div>
                                                        <small className='mb-3'>{review.date}</small>
                                                        <RatingStar rating={review.rating} numRatings={review.number_of_isHelpful} isUseful={true}> </RatingStar>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))}
                                                <ListItemButton onClick={handleClickReviews}>
                                                    <ListItemText primary="show more reviews" className='d-flex justify-content-center' />
                                                    {reviewsOpen ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>

                                                <Collapse in={reviewsOpen} timeout="auto" unmountOnExit >
                                                    {product.reviews?.slice(1, product.numComments).map((review, index) => (

                                                        <ListGroup.Item key={index}>
                                                            <div className='mt-3'><strong>{review.name}</strong>  </div>
                                                            <small className='mb-3'>{review.date}</small>
                                                            <RatingStar rating={review.rating} numRatings={review.number_of_isHelpful} isUseful={true}> </RatingStar>
                                                            <p>{review.comment}</p>
                                                        </ListGroup.Item>
                                                    ))}
                                                </Collapse>
                                            </div>

                                        }
                                    </ListGroup>)}
                                <ListGroup variant='flush' className='my-3'>
                                    <ListGroup.Item>
                                        {/* <h3>Write a Customer Review</h3> */}
                                        {
                                            userInfo
                                                ? (<Form onSubmit={reviewSubmitHandler} >
                                                    {createProductReview_locading && <Loader></Loader>}
                                                    {createProductReview_error && <Message variant='danger'>{createProductReview_error}</Message>}
                                                    {createProductReview_success && <Message>{createProductReview_success}</Message>}
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}>
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - poor</option>
                                                            <option value='2'>2 - fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>

                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            as='textarea'
                                                            placeholder='your comments'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}></Form.Control>
                                                    </Form.Group>
                                                    <Button className='m-3' type='submit' variant='primary'>Submit</Button>
                                                </Form>)
                                                : (<Message>
                                                    Please <Link to={'/login'}>Sign In</Link> to write a review .
                                                </Message>)
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>


                        {/* Assessment */}
                        <Row>
                            <Col md={8}>
                                <h2 className='my-3'>Assessment</h2>
                                <AssessmentTables product={product} />
                            </Col>
                        </Row>

                        {true &&
                            <Row className='my-5'>
                                <h2 className='my-3'>Stock Status</h2>
                                <Col md={8}>
                                    <ListGroup variant='flush'>
                                        <Card>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>€{product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>

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
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                    {[...Array(product.countInStock).keys()].map(
                                                                        (i) => (<option key={i + 1} value={i + 1} >{i + 1}</option>)
                                                                    )}
                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ) : null
                                            }

                                            <ListGroup.Item className='d-flex'>
                                                <div className='me-auto'></div>
                                                <Button className="btn-block me-auto" type="button" onClick={() => {
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
                    </Container>)
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

export default ProductScreen
