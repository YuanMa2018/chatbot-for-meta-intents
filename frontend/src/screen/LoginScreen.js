import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button, Row,Col,Container, FormLabel} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch();
    const userLogin = useSelector((state)=>state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search? location.search.split('=')[1]:'/'
    // console.log(location)

    useEffect(() => {

        if(userInfo){
            navigate(redirect)
        }

    }, [redirect,navigate, userInfo])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(userLoginAction(email,password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {
                error && <Message>{error}</Message>
            }
            {
                loading && <Loader></Loader>
            }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button className='m-3' type='submit' variant='primary'>Sign In</Button>

                <Row className='py-3'>
                    <Col>
                        New Custemer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
