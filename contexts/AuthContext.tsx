import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "@/services/authService";

interface AuthContextProps {
    user: any | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps| null>(null);

export const AuthProvider: React.FC<({ children: React.ReactNode })> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         fetchUser();
    }, []);

    const fetchUser = async () => {
        const response = await authService.getCurrentUser();
        console.log('fetchUser', response);
        if (!response.error) {
            setUser(response);
        }else {
            setUser(null);
        }
        setLoading(false);
    }

    const login = async (email: string, password: string) => {
        console.log("login email ", email, " password ", password);
        const response = await authService.login(email, password);
        console.log('login', response);
        if (!response.error) {
            setUser(response);
        }

        // await fetchUser();
        return response;
    }

    const register = async (email: string, password: string) => {
        console.log("login email ", email, " password ", password);
        const response = await authService.createAccount(email, password);
        console.log('register', response);
        if (!response.error) {
            setUser(response);
        }

        // login(email, password); // login after registration
        return response;
    }

    const logout = async () => {
        const response = await authService.logout();
        console.log('logout', response);
        if (!response.error) {
            setUser(null);
        }
        return response;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);