import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail, updateUserDetailAction } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


function ProfileScreen() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [remindingMessage,setRemindingMessage] = useState("")

    const LoginUserInfo = useSelector(state => state.userLogin).userInfo
    const {loading, error, userInfo} = useSelector(state=>state.userDetail)
    const navigator = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!LoginUserInfo){
            navigator("/login")
        }else{
            if(!userInfo){
                // console.log("no userInfo",userInfo)
                dispatch(getUserDetail(LoginUserInfo._id))
            }else{
                // console.log("has userInfo",userInfo)
                // console.log("has LoginUserInfo",LoginUserInfo)
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, LoginUserInfo, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!password | !repeatPassword | !name | !email){
            setRemindingMessage("Please enter infomation!")
        }else{
            if (password !== repeatPassword) {
                setRemindingMessage("Please repeat same password!")
            } else {
                setRemindingMessage(null)
                dispatch(updateUserDetailAction(email,name,password))
            }
        }
        
        
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h1 className='my-5'>My Profile</h1>
                    {remindingMessage && (<Message variant="warning">{remindingMessage}</Message>)}
                    {loading && <Loader>Loading</Loader>}
                    {error && (<Message variant="danger">{error}</Message>)}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button variant="primary" className="my-3" type='submit'>Update Information</Button>
                    </Form>
                </Col>

                <Col md={9}>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
