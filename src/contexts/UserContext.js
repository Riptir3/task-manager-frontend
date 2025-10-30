import {  createContext, useState } from "react";

export const UserContext = createContext(); // global state

export const UserProvider = ({ children }) =>{
    const[user,setUser] = useState(()=>{
        const token = localStorage.getItem("token");
        return token ? {token} : null
    });

    const login = (token) =>{
        localStorage.setItem("token",token);
        setUser({token});
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    );
}