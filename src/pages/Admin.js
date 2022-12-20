import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { API } from '../config/api/Api';
import { Button, Container, Form, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { UserContext } from '../context/User-context'
import { Link } from 'react-router-dom';

function Admin() {
    const [state, dispatch] = useContext(UserContext)
    const [search, setSearch] = useState('');
    // const user_id = state.user.id
    // console.log("ini user id", user_id);

    // let { data: getDataById } = useQuery('getDataByIdCache', async () => {
    //     const response = await API.get("/articlesByuser/1")
    //     return response.data.data
    // })
    // console.log("ini data id", getDataById);
    let { data: getAllData } = useQuery('getAllDatasCache', async () => {
        const response = await API.get("/articles")
        return response.data.data
    })
    console.log(getAllData);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = getAllData?.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];
    const totalPosts = getAllData?.length;

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <Container>
            <p className="fs-1 fw-bold mt-5 mb-0">List Data</p>
            <hr className='mt-0 mb-4' />

            <div className="search d-flex justify-content-between">
                <Form className='w-25'>
                    <Form.Control
                        type='text'
                        placeholder='search...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
                <Link to="/Add-article" className='btn btn-primary'><Icon.FaPlus /> Tambah Data</Link>
            </div>
            <Table striped bordered hover variant='primary' size='lg' className='mt-4' >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts?.filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.title.toLowerCase().includes(search);
                    }).map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="align-middle">
                                <img
                                    src={item?.image}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "2px",
                                    }}
                                    alt={item?.title}
                                />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <div className="d-flex justify-content-center mt-4">
                <ul className="text-dark d-flex gap-3">
                    <li onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} className="list-pagination">
                        prev
                    </li>
                    {pageNumbers?.map((number) => (
                        <li key={number} onClick={() => paginate(number)} className="list-pagination">
                            {number}
                        </li>
                    ))}
                    <li onClick={() => { setCurrentPage((prev) => prev < pageNumbers.length ? prev + 1 : prev) }} className="list-pagination">
                        next
                    </li>
                </ul>
            </div>
        </Container>
    )
}

export default Admin;