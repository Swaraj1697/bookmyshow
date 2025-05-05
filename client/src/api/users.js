import { axiosInstance } from ".";

export const RegisterUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/api/users/register", userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const LoginUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/api/users/login", userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/currentUser");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const ForgetPassword = async (userData) => {
    try {
        const response = await axiosInstance.patch("/api/users/forgetpassword", userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const ResetPassword = async (userData, id) => {
    try {
        const response = await axiosInstance.patch(`/api/users/resetpassword/${id}`, userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

