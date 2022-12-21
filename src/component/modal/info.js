import React from 'react'
import { Modal, Table } from 'react-bootstrap';

function InfoLogin({ show, setShow }) {
    const handleClose = () => setShow(false)

    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title fs-3 fw-bold text-primary' >Info Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                        <tr>
                            <td>Admin</td>
                            <td>admin123</td>
                        </tr>
                        <tr>
                            <td>Admin1</td>
                            <td>admin123</td>
                        </tr>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default InfoLogin;