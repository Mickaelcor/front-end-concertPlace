// Creation d'un contexte pour faire passer le login sur toute les pages

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    // Ready pour definir un status pret lorsque on à bien recuperer la data pour faire le redirect 
    const [ready, setReady] = useState(false);
    // On fait un useEffect pour garder le context lors d'un reload
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}