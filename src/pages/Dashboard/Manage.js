import styles from '../../styles/pages/Dashboard/Manage.module.scss';
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Job_Posts from './Manage/Job_Posts';
import Company_List from './Manage/Company_List';
import Create_Job from './Manage/Create_Job';
import Create_Company from './Manage/Create_Company';
import { get_companies } from '../../firebase/methods/Company_Functions';
import { get_jobs } from '../../firebase/methods/Job_Functions';
import Dashboard_Header from '../../components/UI/Dashboard_Header';

function Manage (props) {
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

    const go_back = () =>  set_selected(0);
    
    const menu = (
        <>
        <Dashboard_Header back_handler={() => props.go_home()}>Management</Dashboard_Header>
        <section className={styles.content}>
            <div className={styles.content__list}>
                <div onClick={() => set_selected(1)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>View Job Posts</h5></div>
                <div onClick={() => set_selected(2)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>View Companies</h5></div>
                <div onClick={() => set_selected(3)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>Create Job</h5></div>
                <div onClick={() => set_selected(4)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>Create Company</h5></div>
            </div>
            <div className={styles.content__image}></div>
        </section>
        </>
    )

    const content = [menu, <Job_Posts jobs={jobs} go_back={go_back} />, <Company_List companies={companies}  go_back={go_back} />, <Create_Job companies={companies}  go_back={go_back} />, <Create_Company  go_back={go_back} />]
    const display_name = ["Management", "Job Posts", "Company List", "Create Job", "Create Company"]

    return (
        <main className={styles.manage}>
            {content[selected]}
        </main>
    )
};

export default Manage;