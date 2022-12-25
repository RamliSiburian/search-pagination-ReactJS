import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { API } from '../config/api/Api';
import { Button, Container, Form, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { UserContext } from '../context/User-context'
import { Link } from 'react-router-dom';

function Admin() {
    const [state, dispatch] = useContext(UserContext)
    const user_id = state.user.id
    const [fetchData, setFetchData] = useState()

    let { data: getDataByUserId } = useQuery('getDataByUserIdCache', async () => {
        const response = await API.get("/articlesByuser/" + user_id)
        return response.data
    })

    const searchMovie = async (q) => {
        const response = await API.get("articlesearch/" + q)
        return response.data
    }

    const search = async (q) => {
        if (q.length > 0) {
            const query = await searchMovie(q)
            setFetchData(query)
        } else {
            setFetchData(getDataByUserId)
        }
    }

    useEffect(() => {
        setFetchData(getDataByUserId)
    }, [getDataByUserId])

    //pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = fetchData?.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];
    const totalPosts = fetchData?.length;

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
                        onChange={({ target }) => search(target.value)}
                    />
                </Form>
                <Link to="/Add-article" className='btn btn-primary'><Icon.FaPlus /> Tambah Data</Link>
            </div>
            <div className="mt-4 mb-2">
                <u>Total data : {fetchData?.length} from {pageNumbers.length} Pages</u>
            </div>
            <Table striped bordered hover variant='primary' size='lg' >
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Gambar</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts?.map((item, index) => (
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
            <div className="d-flex justify-content-center mt-4 mb-5">
                <ul className="text-dark d-flex gap-1">
                    {/* {currentPage <= 1 ? (
                        <></>
                    ) : (
                        <li onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} className="list-pagination">
                            prev
                        </li>
                    )} */}
                    {pageNumbers.slice(0, 5)?.map((number) => (
                        <li key={number} onClick={() => paginate(number)} className="list-pagination">
                            {number}
                        </li>
                    ))}
                    {/* {currentPage >= pageNumbers.length ? (
                        <></>
                    ) : (
                        <li onClick={() => currentPage < pageNumbers.length && setCurrentPage(currentPage + 1)} className="list-pagination">
                            next
                        </li>
                    )} */}
                </ul>
            </div>
        </Container >
    )
}

export default Admin;