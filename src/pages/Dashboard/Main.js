import styles from '../../styles/pages/Dashboard/Main.module.scss';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { convert_name } from '../../tools/global_functions';
import Company from './Main/Create_Company';
import { IoIosAdd } from "react-icons/io";
import Create_Company from './Main/Create_Company';
import Create_Post from './Main/Create_Post';
import Pie_Chart from '../../components/items/Pie_Chart';
import Modal from '../../components/UI/Modal';
import { useHistory } from 'react-router-dom';
import Join_Company from './Main/Join_Company';
import { MenuContext } from '../../contexts/Menu.context';


function Main (props) {
    const { selected, set_selected } = useContext(MenuContext);
    // const [selected, set_selected] = useState(0);
    const [manager, set_manager] = useState(true);
    const [selector, set_selector] = useState(false);
    const companies = props.companies;
    const posts = props.posts;
    const jobs = props.jobs;
    const offers = props.offers;
    const applications = props.applications;
    const history = useHistory();

    console.log(jobs)

    useEffect(() => {
        return () => { 
            set_selected(0);
        };
    }, []);


    const _add = () => {
        set_selector(true);
    };

    const options_grid = (
        <section className={styles.grid}>
            <h3 onClick={() => history.push('/jobs')}>Find Job</h3>
            <h3 onClick={() => {set_selected(3); set_selector(false)}}>Join Company</h3>
            <h3 onClick={() => {set_selected(1); set_selector(false)}}>Create Company</h3>
            <h3 onClick={() => {set_selected(2); set_selector(false)}}>Create Job</h3>
        </section>
    )
    
    const company_items = companies.map(item => (
        <Link to={`/dashboard/company/${convert_name(item.name)}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.name}</h4>
            <small>Manager</small>
        </Link>
    ));

    const post_items = posts.map(item => (
        <Link to={`/dashboard/posts/${item.post_id}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.title}</h4>
            <small>Post</small>
        </Link>
    ));
    const job_items = jobs.map(item => (
        <Link to={`/dashboard/jobs/${convert_name(item.company_data.name)}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.company_data.name}</h4>
            <small>{item.title}</small>
        </Link>
    ));

    const application_items = applications.map(item => (
        <Link to={`/dashboard/applications/${item.post_id}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.job_data.title}</h4>
            <small>Application</small>
        </Link>
    ));

    const offer_items = offers.map(item => (
        <div className={styles.content__item}>
             <div className={`shape_pink ${styles.content__item__box}`}>
                <IoIosAdd />
             </div>5
            <h4 className={styles.content__item__text}>{item.title}</h4>
            <small>Offer</small>
        </div>
    ));



    const main = (
    <main className={styles.content}>
        <section className={styles.content__section_1}>
           {company_items}
           {post_items}
           {job_items}
           {application_items}
           {offer_items}
            <div className={styles.content__item} onClick={() => _add()}>
                <div className={styles.content__item__box_outline}><IoIosAdd /></div>
                <h4 className={styles.content__item__text}></h4>
            </div>
        
        </section>
        {selector ? <Modal close={() => set_selector(false)}>{options_grid}</Modal> : null}
    </main>
    )

    const content = [main, <Create_Company />, <Create_Post companies={companies} />, <Join_Company />]

    return content[selected]
};

export default Main;