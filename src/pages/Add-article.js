import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import * as Icon from 'react-icons/fa'
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../config/api/Api';


function AddArticle() {
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        image: "",
        title: "",
        body: "",
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url)
        }
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("body", form.body);
            const data = await API.post("/articles", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });
            if (data.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1 fw-bold">
                        Article berhasil di upload
                    </Alert>
                )
                setMessage(alert);
                setPreview(null)
                setForm({
                    image: "",
                    title: "",
                    body: "",
                })

                const timer = setTimeout(navigates, 2000);

                function navigates() {
                    navigate("/admin");
                }


            }
        } catch (error) {

            console.log(error.data.data.message);
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.data.data.message}
                </Alert>
            )
            setMessage(alert);
        }
    })

    return (
        <>
            <Container>

                <div className="mt-5 d-md-flex align-items-center">
                    <p className="fs-5 fw-bold me-3"><Link to={`/Admin`} className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
                    <p className="fs-3 fw-bold"> Add Article</p>
                </div>
                <hr className='m-0' />
                {message && message}
                <div className="mt-5 d-md-flex justify-content-center">
                    <Form className='w-50 mb-5' onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className='w-100 mb-3' controlId="formBasicimage">
                            <Form.Label className="btn text-white" style={{
                                backgroundColor: "#0000ff"
                            }}>
                                Upload image &nbsp; <Icon.FaImage />
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleOnChange}
                                hidden
                            />
                        </Form.Group>
                        {preview && (
                            <div>
                                <img className='rounded mb-3'
                                    src={preview}
                                    style={{
                                        maxWidth: "150px",
                                        maxHeight: "150px",
                                        objectFit: "cover",
                                    }}
                                    alt={preview}
                                />
                            </div>
                        )}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="judul.."
                                name='title'
                                value={form.hastag}
                                onChange={handleOnChange}
                                required='required'
                                autocomplete='off'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control
                                type='text'
                                placeholder='deskripsi..'
                                name='body'
                                value={form.hastag}
                                onChange={handleOnChange}
                                required='required'
                                autocomplete='off'
                            />
                        </Form.Group>
                        <Button name='Simpan' type='submit'> Simpan</Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default AddArticle;