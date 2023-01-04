import React, { useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap';
import { useQuery } from 'react-query';

import '../Assets/css/style.css'
import { API } from '../config/api/Api';


function Home() {
    const [search, setSearch] = useState('');


    let { data: getAllData } = useQuery('getAllDatasCache', async () => {
        const response = await API.get("/articles")
        return response.data.data
    })


    return (
        <Container>
            <div className="search d-flex justify-content-end mb-5">
                <Form className='w-25 rounded' style={{ border: "1px solid blue" }}>
                    <Form.Control
                        type='text'
                        placeholder='search data...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>

            </div>
            <div className="article mb-5 d-flex gap-5 flex-wrap justify-content-center justify-content-md-start">
                {getAllData?.filter((item) => {
                    return search === ''
                        ? item
                        : item.title.toLowerCase().includes(search.toLocaleLowerCase());
                }).map((item, index) => (
                    <Card style={{ width: '15rem' }} key="index" className='card' data-aos="fade-up" data-aos-duration="1500">
                        <Card.Img variant="top" src={item?.image} />
                        <Card.Body>
                            <Card.Title>{item?.title}</Card.Title>
                            <Card.Text>
                                {item?.body.slice(0, 50)}
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    )
}

export default Home;