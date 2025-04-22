import { axiosInstance } from ".";

export const RegisterUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/api/users/register", userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}