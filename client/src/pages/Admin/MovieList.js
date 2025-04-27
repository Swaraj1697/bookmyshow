import React, { useEffect } from 'react'
import { data } from 'react-router-dom'
import { Table, Button } from 'antd'
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import MovieForm from './MovieForm'
import DeleteMovieModal from './DeleteMovieModal'
import { getAllMovies } from '../../api/movies';
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/loaderSlice'
import { useState } from 'react'



function MovieList() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [movies, setMovies] = useState(fakeMovies);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formType, setFormType] = useState("add");
    const dispatch = useDispatch();

    const getData = async () => {
        dispatch(ShowLoading());
        const response = await getAllMovies();
        const allMovies = response.data;
        setMovies(allMovies.map(function (item) {
            return {
                ...item,
                key: item._id,
            }
        }));
        dispatch(HideLoading());
    }

    useEffect(() => {
        // getData();
    }, [])

    const fakeMovies = [
        {
            key: "1",
            poster: "https://via.placeholder.com/75x115",
            name: "Sabarmati Report",
            description: "Real Story of Sabarmati incident",
            duration: "2h 30m",
            genre: "Thriller",
            language: "Hindi",
            releaseDate: "12-11-2024",
        },
        {
            key: "2",
            poster: "https://via.placeholder.com/75x115",
            name: "Amaran",
            description: "Soldier Story",
            duration: "2h 30m",
            genre: "Action",
            language: "Hindi",
            releaseDate: "12-11-2024",
        },
    ]

    const [movies, setMovies] = useState(fakeMovies);

    const tableHeadings = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return (
                    <img src={data.poster} alt="poster" height="115" width="75" />
                )
            }
        },
        {
            title: "Movie Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text) => {
                return `${text} Min`
            }
        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Realease Date",
            dataIndex: "releaseDate",
            render: (text, data) => {

                return moment(data.releaseDate).format("MM-DD-YYYY")
            },
        },
        {
            title: "Action",
            render: (text, data) => {
                return (
                    <div>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            setSelectedMovie(data);
                            setFormType("edit")
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => { setIsDeleteModalOpen(true); setSelectedMovie(data) }} >
                            <DeleteOutlined />
                        </Button>
                    </div>
                )
            }
        },
    ]
    return (
        <div className='d-flex justify-content-end'>
            <Button onClick={() => {
                setIsModalOpen(true);
                setFormType("add")
            }} >Add Movie</Button>
            <Table dataSource={movies} columns={tableHeadings}></Table>
            {isModalOpen && (
                <MovieForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    formType={formType}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteMovieModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}
        </div>
    )
}

export default MovieList;
