import React, { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/Firebase';
import { get_applications } from "../firebase/methods/Applicant_Functions";
import { get_managements } from "../firebase/methods/Company_Functions";
import { get_employements } from "../firebase/methods/Employee_Functions";
import { get_recruitments } from "../firebase/methods/Post_Functions";
import { get_user_data } from '../firebase/methods/User_Functions';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, set_user] = useState();
    const [user_data, set_user_data] = useState({});
    const [applications, set_applications] = useState([]);
    const [jobs, set_jobs] = useState([]);
    const [posts, set_posts] = useState([]);
    const [companies, set_companies] = useState([]);
    
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
                set_jobs(e_data);
                set_posts(r_data);
                set_companies(m_data);
                set_user(user.uid)   
            } else {
                set_user(null);         
            }
    })
    }, []);



    return (
        <AuthContext.Provider value={{ user, user_data, applications, set_applications, jobs, posts, companies }}>
            {props.children}
        </AuthContext.Provider>
    );

}