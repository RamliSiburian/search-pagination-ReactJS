import React, { useContext, useState } from 'react'
import { Alert, Button, Form, FormControl, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../config/api/Api';
import { UserContext } from '../../../context/User-context';

function Login({ show, setShow }) {
    const handleClose = () => setShow(false)
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    })
    const [message, setMessage] = useState(null)

    const handleOnChange = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name]: e.target.value
        })
    }

    const HandleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const dataLogin = await API.post("/Login", formLogin)
            const user = dataLogin.data.data

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            })

            const alert = (
                <Alert variant='success' className='py-1'>
                    Berhasil
                </Alert>
            )
            setMessage(alert)
            navigate("/Admin")
            setShow(false)
            navigate("/Admin")
        } catch (error) {
            const alert = (
                <Alert variant='danger' className='py-1' >
                    Username atau password salah
                </Alert>
            )
            setMessage(alert)
        }
    });

    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title fs-1 fw-bold text-primary' >Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                        <Form.Group className='mb-3'>
                            <FormControl
                                type='text'
                                name='username'
                                onChange={handleOnChange}
                                value={formLogin.username}
                                placeholder='Username'
                                required='required'
                                autoFocus='autofocus'
                                autoComplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <FormControl
                                type='password'
                                name='password'
                                onChange={handleOnChange}
                                value={formLogin.password}
                                placeholder='Password'
                                required='required'
                            />
                        </Form.Group>
                        <Button type='submit' className='btn text-white fw-bold link w-100 border-0 bg-primary' >Login</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login;