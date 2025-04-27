import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movie/get-all-movies");
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movie/add-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movie/update-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movie/delete-movie", values);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}


