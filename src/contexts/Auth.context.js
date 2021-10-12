import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/Firebase';
import { get_applications, get_user_data } from '../firebase/methods/User_Functions';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, set_user] = useState(null);
    const [user_data, set_user_data] = useState({});
    const [applications, set_applications] = useState([]);
    
    useEffect(() => {
        var unlisten = auth.onAuthStateChanged(async (user) => {
            if(user){
                const u_data = await get_user_data(user.uid);
                const a_data = await get_applications(user.uid);
                set_user_data(u_data); 
                set_applications(a_data);
                set_user(user.uid)   
            } else {
                set_user(null);         
            }
    })
    }, [])


    return (
        <AuthContext.Provider value={{ user, user_data, applications, set_applications }}>
            {props.children}
        </AuthContext.Provider>
    );

}