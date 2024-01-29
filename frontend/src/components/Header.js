import React from 'react';
import { Nav, Navbar, NavDropdown, Container, Form, FormControl, Button, LinkContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../actions/userActions';
import SearchBox from '../components/Searchbox.js'

function Header() {

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <div>
            <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    {/* <Navbar.Brand href="/">Crystal Smartphone Shop</Navbar.Brand> */}
                    <Navbar.Brand >Crystal Smartphone Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll">

                        <div className="me-auto">
                            {/* // show search box or not */}
                            {false && <SearchBox></SearchBox>}
                        </div>
                        <Nav className='mr-auto'>
                            <Nav.Link href="/cart/">
                                <i className='fas fa-shopping-cart'>
                                </i>
                                Cart
                            </Nav.Link>
                            {userInfo
                                ?
                                <NavDropdown title={userInfo.name}>
                                    <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                                :
                                <Nav.Link href="/login">
                                    <i className='fas fa-user'></i>
                                    Sign In
                                </Nav.Link>
                            }


                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
