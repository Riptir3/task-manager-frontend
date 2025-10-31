import api from "./api";

export const register = async (fullName, email,password) =>{
    const response = await api.post(`/Users/register`,{fullName,email,password});
    return response.data;
}

export const login = async (email,password) =>{
    const response = await api.post(`/Users/login`,{email,password});
    return response.data;
}