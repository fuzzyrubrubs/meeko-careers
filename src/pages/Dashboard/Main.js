import styles from '../../styles/pages/Dashboard/Main.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convert_name } from '../../tools/global_functions';
import Company from './Main/Create_Company';
import { IoIosAdd } from "react-icons/io";
import Create_Company from './Main/Create_Company';
import Create_Job from './Main/Create_Job';
import Pie_Chart from '../../components/items/Pie_Chart';
import Modal from '../../components/UI/Modal';
import { useHistory } from 'react-router-dom';
import Join_Company from './Main/Join_Company';


function Main (props) {
    const [selected, set_selected] = useState(0);
    const [manager, set_manager] = useState(true);
    const [options, set_options] = useState(false);
    const companies = props.companies;
    const posts = props.posts;
    const jobs = props.jobs;
    const applications = props.applications;
    const history = useHistory()


    const _add = () => {
        set_options(true);
    };

    const options_grid = (
        <section className={styles.grid}>
            <h3 onClick={() => history.push('/jobs')}>Find Job</h3>
            <h3 onClick={() => set_selected(3)}>Join Company</h3>
            <h3 onClick={() => set_selected(1)}>Create Company</h3>
            <h3 onClick={() => set_selected(2)}>Create Job</h3>
        </section>
    )
    
    const company_items = companies.map(item => (
        <Link to={`/dashboard/company/${convert_name(item.name)}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.name}</h4>
            <small>Company</small>
        </Link>
    ));

    const post_items = posts.map(item => (
        <Link to={`/dashboard/posts/${item.job_id}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.title}</h4>
            <small>Post</small>
        </Link>
    ));
    const job_items = jobs.map(item => (
        <Link to={`/dashboard/jobs/${item.id}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.name}</h4>
            <small>Job</small>
        </Link>
    ));
    const application_items = applications.map(item => (
        <Link to={`/dashboard/applications/${item.id}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.job_data.title}</h4>
            <small>Application</small>
        </Link>
    ));



    const main = (
    <main className={styles.content}>
        <section className={styles.content__section_1}>
           {company_items}
           {post_items}
           {job_items}
           {application_items}
            <div className={styles.content__item} onClick={() => _add()}>
                <div className={styles.content__item__box_outline}><IoIosAdd /></div>
                <h4 className={styles.content__item__text}></h4>
            </div>
        
        </section>
        {options ? <Modal close={() => set_options(false)}>{options_grid}</Modal> : null}
    </main>
    )

    const content = [main, <Create_Company />, <Create_Job />, <Join_Company />]

    return content[selected]
};

export default Main;