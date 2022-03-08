import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/Firebase';
import { get_applications, get_employements, get_managements, get_recruitments, get_user_data } from '../firebase/methods/User_Functions';
import { concat_ids } from "../tools/global_functions";

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, set_user] = useState();
    const [user_data, set_user_data] = useState({});
    const [applications, set_applications] = useState([]);
    const [employement_data, set_employment_data] = useState([]);
    const [recruiter_data, set_recruiter_data] = useState([]);
    const [manager_data, set_manager_data] = useState([]);
    
    useEffect(() => {
        var unlisten = auth.onAuthStateChanged(async (user) => {
            if(user){
                const u_data = await get_user_data(user.uid);
                const a_data = await get_applications(user.uid);
                const e_data = await get_employements(user.uid);
                const r_data = await get_recruitments(user.uid);
                const m_data = await get_managements(user.uid);
                set_user_data(u_data); 
                set_applications(a_data);
                set_employment_data(e_data);
                set_recruiter_data(r_data);
                set_manager_data(m_data);
                set_user(user.uid)   
            } else {
                set_user(null);         
            }
    })
    }, [])

    const all_ids = concat_ids(user_data.id, recruiter_data, manager_data);


    return (
        <AuthContext.Provider value={{ user, user_data, applications, set_applications, employement_data, recruiter_data, manager_data, all_ids }}>
            {props.children}
        </AuthContext.Provider>
    );

}