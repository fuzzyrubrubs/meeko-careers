import styles from '../styles/pages/Dashboard.module.scss';
import Profile from './Dashboard/Profile';
import Menu from './Dashboard/Menu';
import { useState, useEffect } from 'react';
import Job_Posts from './Dashboard/Job_Posts';
import Company_List from './Dashboard/Company_List';
import Create_Job from './Dashboard/Create_Job';
import Create_Company from './Dashboard/Create_Company';
import { get_companies } from '../firebase/methods/Company_Functions';
import { get_jobs } from '../firebase/methods/Job_Functions';


function Dashboard () {
    const [selected, set_selected] = useState(0);
    const [companies, set_companies] = useState([]);
    const [jobs, set_jobs] = useState([]);
    const [loader, set_loader] = useState(true);
    
    useEffect(() => {
        const fetch_data = async () => {
            const companies = await get_companies();
            const jobs = await get_jobs();
            set_companies(companies);
            set_jobs(jobs);
            set_loader(false);
        }
        fetch_data();
    }, []);
    
    const content = [<Job_Posts jobs={jobs} />, <Company_List companies={companies} />, <Create_Job companies={companies} />, <Create_Company />];

    return (
        <main className={styles.dashboard}>
            <section className={styles.menu}><Menu selected={selected} select={set_selected} /></section>
            <section className={styles.content}>{content[selected]}</section>
            <section className={styles.profile}><Profile /></section>
        </main>
    )
}

export default Dashboard;