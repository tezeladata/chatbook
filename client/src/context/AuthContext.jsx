import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:3000/api"

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    
    const login = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj),
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setUser(result.data.user)
            navigate("/profile")
        } catch(err){
            alert(err.message)
        }
    }

    const signUp = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await res.json();

            alert(data.message)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{signUp, login, user}}>
            {children}
        </AuthContext.Provider>
    )
};