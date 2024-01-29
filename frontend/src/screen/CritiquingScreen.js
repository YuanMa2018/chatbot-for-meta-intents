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
import { setBackMainPageAction } from '../actions/backMainPageActions'
import { setInMainPageAction,setInComparisonPageAction } from '../actions/inMainPageActions'

import Box from '@mui/material/Box';
import { Button as MuiButton } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CritiquingPanel from '../components/critiquing/CritiquingPanel'

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


function CritiquingScreen() {
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

    const { id } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    const { products } = useSelector(state => state.productList)

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

    useEffect(() => {
        dispatch(setInMainPageAction(false))
        dispatch(setInComparisonPageAction(false))
    }, []);

    // useEffect(() => {
    //     dispatch(setInMainPageAction(false))
    //     // adding event listeners on mount here
    //     if (gp_back) {
    //         navigate("/?user_index=" + userIndex + "&RG01=" + userRG01)
    //         dispatch(setBackMainPageAction(false))
    //     }
    // }, [gp_back]);







    return (
        <div> 
            <Link to={`/products/${product._id}`} >
                <Button variant="outline-dark" className='m-3'>
                Back to product page
                </Button>
            </Link>


            {loading ? (<Loader>Loading</Loader>)
                : error ? (<Message variant="danger">{error}</Message>)
                    : 
                    (<CritiquingPanel isCritiquingScreen={true} critiquedProduct_id={id}>
                    </CritiquingPanel>)
            }

        </div >

    )
}

export default CritiquingScreen

