import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/Firebase';
import { get_user_data, get_user_manager, get_user_recruiter } from '../firebase/methods/User_Functions';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, set_user] = useState();
    const [user_data, set_user_data] = useState({});
    const [recruiter_ids, set_recruiter_ids] = useState(null);
    const [manager_ids, set_manager_ids] = useState(null);

    useEffect(() => {
        var unlisten = auth.onAuthStateChanged(async (user) => {
            if(user){
                const u_data = await get_user_data(user.uid);
                const m_data = await get_user_manager(user.uid);
                const r_data = await get_user_recruiter(user.uid);
                set_recruiter_ids(r_data);
                set_manager_ids(m_data);
                set_user_data(u_data); 
                set_user(user.uid)   
            } else {
                set_user(null);         
            }
    })
    }, []);



    return (
        <AuthContext.Provider value={{ user, user_data, manager_ids, recruiter_ids }}>
            {props.children}
        </AuthContext.Provider>
    );

}