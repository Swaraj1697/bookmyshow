import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put("api/movies/update-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.delete("api/movies/delete-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`api/movies/movie/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}



