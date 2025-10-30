import axios from "axios";

const API_URL = "https://localhost:5001/api/Users";

export const register = async (fullName, email,password) =>{
    const response = await axios.post(`${API_URL}/Registration`,{fullName,email,password});
    return response.data;
}

export const login = async (email,password) =>{
    const response = await axios.post(`${API_URL}/Login`,{email,password});
    return response.data;
}