import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeProductInCart } from '../actions/cartActions'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { Button, Card, Col, Container, FormControl, Image, ListGroup, Row } from 'react-bootstrap'
import Message from '../components/Message'

function CartScreen() {

    const dispatch = useDispatch();

    const { id } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();
    const qty = search ? Number(search.split('=')[1]) : 1
    const { cartItems } = useSelector(state => state.cart)
    // console.log(cartItems)
    useEffect(() => {
        dispatch(addToCart(id, qty))
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeProductInCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }



    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>Your cart is empty <Link to="/">
                            Go Back
                        </Link></Message>
                    ) :
                        <ListGroup variant="flush">
                            {
                                cartItems.map((cartItem) =>
                                    <ListGroup.Item key={cartItem.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    // src={cartItem.image} 
                                                    // src={"http://localhost:5001/static/" + cartItem.image}
                                                    src={process.env.REACT_APP_root_image_path + cartItem.amazon_image}
                                                    alt={cartItem.name}
                                                    fluid
                                                    rounded>
                                                </Image>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${cartItem.product}`}>{cartItem.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${cartItem.price}
                                            </Col>
                                            <Col md={2}>
                                                <FormControl as="select" value={cartItem.qty} onChange={(e) => dispatch(addToCart(cartItem.product, Number(e.target.value)))}>
                                                    {[...Array(cartItem.countInStock).keys()].map((i) =>
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                                                </FormControl>
                                            </Col>
                                            <Col md={2}>
                                                <Button type="button" variant="light" onClick={() => {
                                                    removeFromCartHandler(cartItem.product)
                                                }}>
                                                    <i className='fa fa-trash'></i>
                                                </Button>

                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }

                        </ListGroup>

                    }

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>PROCEED TO CHECKOUT</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
