import styles from '../styles/pages/Dashboard.module.scss';
import { useState, useEffect, useContext } from 'react';
import { get_all_messages, get_all_notifications, get_all_tasks, get_applications, get_employements, get_managements, get_messages, get_recruitments, get_tasks } from '../firebase/methods/User_Functions';
import Item_Loader from '../components/UI/Item_Loader';
import { get_companies, get_manager_tasks } from '../firebase/methods/Company_Functions';
import { AuthContext } from '../contexts/Auth.context';
import Profile from './Dashboard/Panel/Profile';
import Nav from './Dashboard/Nav';
import Main from './Dashboard/Main';
import Company from './Dashboard/Company';
import { convert_name } from '../tools/global_functions';
import Panel from './Dashboard/Panel';
import { get_posts } from '../firebase/methods/Post_Functions';
import { Route, useParams } from 'react-router-dom';
import Post from './Dashboard/Post';
import Application from './Dashboard/Application';
import Job from './Dashboard/Job';
import Tasks from './Dashboard/Tasks';
import Messages from './Dashboard/Messages';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProfileContext } from '../contexts/Profile.context';
import Loader_Page from '../components/UI/Loader_Page';



function Dashboard (props) {
    const params = props.match.params.name;
    const { user, user_data } = useContext(AuthContext);
    const { companies, posts, jobs, applications, offers, loader, tasks } = useContext(ProfileContext);
    const [display, set_display] = useState(true);

    useEffect(() => {
        const fetch_data = async () => {
            const i = await fetch("https://firestore.googleapis.com/v1/projects/forage-212715/databases/(default)/documents/events")
            .then(response => response.json())
            .then(data => data.documents.map(item => item.fields));
    
            // console.log(i.filter(item => item.group_name.stringValue.toLowerCase() === "Lucidica".toLocaleLowerCase()))
        }
        fetch_data()
    }, [])


    if(loader) return <Loader_Page />
    

    return (
        <main className={`${styles.dashboard} ${display === false ? styles.dashboard__hidden : null}`}>
            <div onClick={() => set_display(!display)} className={styles.operator}>{display ? <FaChevronRight /> : <FaChevronLeft />}</div>
            <div className={styles.container}>
                <Nav />
                <section className={styles.main}>
                    <Route exact path="/dashboard" render={(props) => <Main companies={companies} posts={posts} jobs={jobs} applications={applications} offers={offers}  /> } /> 
                    <Route exact path="/dashboard/tasks" render={(props) => <Tasks data={tasks} /> } />
                    <Route exact path="/dashboard/messages" render={(props) => <Messages /> } /> 
                    <Route exact path="/dashboard/company/:name" render={(props) => <Company data={companies.find(company => convert_name(company.name) === params)} /> } /> 
                    <Route exact path="/dashboard/posts/:id" render={(props) => <Post data={posts.find(post => post.post_id === params)} /> } /> 
                    <Route exact path="/dashboard/applications/:id" render={(props) => <Application data={applications.find(post => post.post_id === params)} /> } /> 
                    <Route exact path="/dashboard/jobs/:id" render={(props) => <Job data={jobs.find(job => convert_name(job.company_data.name) === params)} /> } /> 
                </section>
            </div>
            {display ? <Panel params={params} user_data={user_data} companies={companies} posts={posts} jobs={jobs} applications={applications} /> : null}
        </main>
    )
}

export default Dashboard;


