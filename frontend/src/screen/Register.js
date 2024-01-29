import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [remindingMessage, setRemindingMessage] = useState(null)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const { loading, userInfo, error } = useSelector(state => state.register)

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!password | !repeatPassword | !name | !email){
            setRemindingMessage("Please enter infomation!")
        } else {
            if (password !== repeatPassword) {
                setRemindingMessage("Please repeat same password!")
                console.log("not identical")
            } else {
                setRemindingMessage(null)
                dispatch(register(email, name, password))
            }
        }
    }

    return (
        <FormContainer>
            <h1 className="my-3">Registeration</h1>
            {
                remindingMessage && <Message>{remindingMessage}</Message>
            }
            {
                loading && (<Loader>loading</Loader>)
            }
            {
                error && (<Message>{error}</Message>)
            }
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='userName'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='repeatPassword'>
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Repeat Password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className='m-3' type='submit' variant='primary'>Register</Button>

                <Row>
                    <Col>
                        Have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    )
}

export default Register
