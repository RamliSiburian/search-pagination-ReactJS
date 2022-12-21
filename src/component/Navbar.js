import React, { useContext, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User-context';
import Login from './modal/auth/Login';



function Navbars() {
    const [showLogin, setShowLogin] = useState(false);
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    function Logout() {
        dispatch({
            type: "AUTH_ERROR",
        });
        navigate("/");
        setShowLogin(true);

    }

    return (
        <div id='navbar'>
            <Navbar expand="lg" className="navbar shadow mb-4" style={{ background: "#AAC4FF" }} >
                <Container>
                    <Navbar.Brand>
                        <p className="fs-1 fw-bold">CRUD Data</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end fw-bold'>
                        <Nav className="me-end gap-3">
                            {state.isLogin ? (
                                <Button className='last fw-bold' onClick={Logout} style={{ cursor: "pointer" }}>LogOut</Button>
                            ) : (
                                <Button className='last fw-bold' onClick={() => setShowLogin(true)}>Sign In</Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} setShow={setShowLogin} />
        </div>
    )
}

export default Navbars;