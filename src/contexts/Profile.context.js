import React, { createContext, useState, useEffect, useContext } from "react";
import { db, auth } from '../firebase/Firebase';
import { get_applicant_messages, get_applicant_tasks, get_applications, get_application_interviews, get_interviews, get_post_applicants } from "../firebase/methods/Applicant_Functions";
import { get_company, get_company_messages, get_company_rota, get_company_tasks, get_managements } from "../firebase/methods/Company_Functions";
import { get_company_employees, get_employee_messages, get_employee_tasks, get_employements } from "../firebase/methods/Employee_Functions";
import { get_companies_posts, get_post, get_post_messages, get_post_tasks, get_recruiters, get_recruitments } from "../firebase/methods/Post_Functions";
import { get_user_data } from '../firebase/methods/User_Functions';
import { AuthContext } from './Auth.context';

export const ProfileContext = createContext();

export function ProfileProvider(props) {
    const { user, manager_ids, recruiter_ids } = useContext(AuthContext)
    const [user_data, set_user_data] = useState({});
    const [applications, set_applications] = useState(null);
    const [jobs, set_jobs] = useState(null);
    const [offers, set_offers] = useState(null);
    const [posts, set_posts] = useState(null);
    const [companies, set_companies] = useState(null);
    const [tasks, set_tasks] = useState(null);
    const [loader, set_loader] = useState(true);


    const usesplit = (data) => [data.filter(item => item.accepted === true), data.filter(item => item.accepted === false)];
    
    useEffect(() => {
        const fetch_data = async () => {

            db.collection("applicant").where('user_id', '==', user).onSnapshot(async (querySnapshot) => {
                const data =  await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const interviews = await get_application_interviews(data.application_id);
                    const job_data = await get_post(data.post_id);
                    const tasks = await get_applicant_tasks(data.application_id)
                    const messages = await get_applicant_messages(data.application_id)
                    return {...data, interviews, job_data, tasks, messages}
                }))
                set_applications(data);
            });


            db.collection("employee").where("user_id", "==", user).onSnapshot(async (querySnapshot) => {
                const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const company_data = await get_company(data.company_id);
                    const tasks = await get_employee_tasks(data.employee_id);
                    const messages = await get_employee_messages(data.employee_id);
                    return {...data, company_data, tasks, messages}
                }));
                const [j_data, o_data] = usesplit(data)
                set_jobs(j_data);
                set_offers(o_data);
            });
        };
        if(user) { fetch_data(); }
        
    }, [user]);

    useEffect(() => {
        const fetch_data = async () => {

            db.collection("company").where('id', 'in', manager_ids).onSnapshot(async (querySnapshot) => {
                const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const employees = await get_company_employees(data.id);
                    const posts = await get_companies_posts(data.id);
                    const rota = await get_company_rota(data.id);
                    const tasks = await get_company_tasks(data.id)   
                    const messages = await get_company_messages(data.id)   
                    return {...data, employees, posts, rota, tasks, messages}
                }));
                console.log(data)
                set_companies(data);
            });
        };
        if(manager_ids) { fetch_data(); }
        
    }, [manager_ids]);
    
    useEffect(() => {
        const fetch_data = async () => {

            db.collection("posts").where('post_id', 'in', recruiter_ids).onSnapshot(async (querySnapshot) => {
                const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const post = await get_post(data.post_id);
                    const candidates = await get_post_applicants(data.post_id);
                    const managers = await get_recruiters(data.post_id);
                    const interviews = await get_interviews(data.post_id);
                    const tasks = await get_post_tasks(data.post_id);
                    const messages = await get_post_messages(data.post_id);
                    return {...post, candidates, managers, interviews, tasks}      
                }));
                set_posts(data);
            });
        };
        if(recruiter_ids) { fetch_data(); }
        
    }, [recruiter_ids]);


    useEffect(() => {
        const fetch_data = async () => {
            db.collection("tasks").where('id', 'in', [user, ...manager_ids, ...recruiter_ids]).onSnapshot(async (querySnapshot) => {
                const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    return {...data}      
                }));
                set_tasks(data);
            });
        };
        if(user) { fetch_data(); }
        
    }, [recruiter_ids, manager_ids, user]);



    if(applications !== null && jobs !== null && posts !== null && companies !== null && offers !== null && loader) { set_loader(false) }


    return (
        <ProfileContext.Provider value={{ loader, applications, jobs, posts, companies, offers, tasks }}>
            {props.children}
        </ProfileContext.Provider>
    );

}