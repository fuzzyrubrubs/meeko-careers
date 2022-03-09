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
import { get_jobs } from '../firebase/methods/Job_Functions';
import { Route, useParams } from 'react-router-dom';
import Post from './Dashboard/Post';
import Application from './Dashboard/Application';
import Job from './Dashboard/Job';
import Tasks from './Dashboard/Main/Tasks';
import Messages from './Dashboard/Main/Messages';



function Dashboard (props) {
    const params = props.match.params.name;
    //const params = useParams();
    const { user_data, all_ids, manager_data, recruiter_data, employement_data, applications } = useContext(AuthContext);
    const [selected, set_selected] = useState(null);
    const [loader, set_loader] = useState(true);
    const [tasks, set_tasks] = useState([]);
    const [panel, set_panel] = useState(true);
    const [companies, set_companies] = useState([]);
    const [posts, set_posts] = useState([]);
    const [jobs, set_jobs] = useState([]);



    useEffect(() => {
        const fetch_data = async () => {  
            const company_data = manager_data.length > 0 ? await get_companies(manager_data) : [];
            const post_data = recruiter_data.length > 0 ? await get_jobs(recruiter_data) : [];
            set_companies(company_data);
            set_posts(post_data);
            set_loader(false);
        };
        fetch_data();
    }, []);    

    console.log(employement_data)

    if(loader) return <Item_Loader />
    
    const go_home = () =>  set_selected(0);

    const selected_company = companies.find(company => convert_name(company.name) === params);

    console.log(selected_company)
    console.log(posts)
    console.log(params)

    console.log(applications)


    return (
        <main className={styles.dashboard}>
            <div className={styles.container}>
                <Nav />
                <section className={styles.main}>
                    <Route exact path="/dashboard" render={(props) => <Main companies={companies} posts={posts} jobs={employement_data} applications={applications}  /> } /> 
                    <Route exact path="/dashboard/tasks" render={(props) => <Tasks /> } />
                    <Route exact path="/dashboard/messages" render={(props) => <Messages /> } /> 
                    <Route exact path="/dashboard/company/:name" render={(props) => <Company data={companies.find(company => convert_name(company.name) === params)} /> } /> 
                    <Route exact path="/dashboard/posts/:id" render={(props) => <Post data={posts.find(post => post.job_id === params)} /> } /> 
                    <Route exact path="/dashboard/applications/:id" render={(props) => <Application data={applications.find(post => post.job_id === params)} /> } /> 
                    <Route exact path="/dashboard/jobs/:id" render={(props) => <Job data={employement_data.find(job => convert_name(job.company_data.name) === params)} /> } /> 
                </section>
            </div>
            <Panel params={params} user_data={user_data} companies={companies} posts={posts} jobs={employement_data} applications={applications} />
        </main>
    )
}

export default Dashboard;


