import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../api/movies";
import { message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = () => {
    const [movies, setMovies] = useState(null);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.loaders);

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            message.error(err.message);
            dispatch(HideLoading());
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        console.log(searchText);
    };

    return (
        <>
            <Row className="justify-content-center w-100">
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Input
                        placeholder="Type here to search for movies"
                        onChange={handleSearch}
                        prefix={<SearchOutlined />}
                    />
                    <br />
                    <br />
                    <br />
                </Col>
            </Row>
            <Row
                className="justify-content-center"
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                {movies &&
                    movies
                        .filter((movie) =>
                            movie.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((movie) => (
                            <Col
                                className="gutter-row mb-5"
                                key={movie._id}
                                span={{
                                    xs: 24,
                                    sm: 24,
                                    md: 12,
                                    lg: 10,
                                }}
                            >
                                <div className="text-center">
                                    <img
                                        onClick={() => {
                                            navigate(
                                                `/movie/${movie._id}?date=${moment().format(
                                                    "YYYY-MM-DD"
                                                )}`
                                            );
                                        }}
                                        className="cursor-pointer"
                                        src={movie.poster}
                                        alt="Movie Poster"
                                        width={200}
                                        style={{
                                            borderRadius: "8px",
                                            height: "180px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <h3
                                        onClick={() => {
                                            navigate(
                                                `/movie/${movie._id}?date=${moment().format(
                                                    "YYYY-MM-DD"
                                                )}`
                                            );
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {movie.name}
                                    </h3>
                                </div>
                            </Col>
                        ))}
            </Row>
        </>
    );
};

export default Home;