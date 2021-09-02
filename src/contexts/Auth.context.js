import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/Firebase';
import { get_user_data } from '../firebase/methods/User_Functions';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, set_user] = useState(false);
    const [user_data, set_user_data] = useState({});
    
    useEffect(() => {

        var unlisten = auth.onAuthStateChanged(async (user) => {
            if(user){
                const u_data = await get_user_data(user.uid);
                set_user(user.uid)   
                set_user_data(u_data); 
            } else {
                set_user(null);         
            }
    })
    }, [])
 


    return (
    <AuthContext.Provider value={{ user, user_data }}>
        {props.children}
    </AuthContext.Provider>
    );

}