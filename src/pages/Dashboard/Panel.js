import { useContext, useState } from "react";
import styles from '../../styles/pages/Dashboard/Panel/Panel.module.scss';
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks, FaChevronDown, FaChevronLeft, FaCog } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useHistory, useLocation } from "react-router-dom";
import { convert_name } from "../../tools/global_functions";
import { MenuContext } from "../../contexts/Menu.context";
import { NotificationContext } from "../../contexts/Notification.context";


function Panel (props) {
    const history = useHistory();
    const location = useLocation();
    const { options, selected, set_selected, title } = useContext(MenuContext);
    const { display_notes } = useContext(NotificationContext);
    const [display_applications, set_display_applications] = useState(true);
    const [display_companies, set_display_companies] = useState(true);
    const [display_jobs, set_display_jobs] = useState(true);
    const [display_posts, set_display_posts] = useState(true);


    const user_data = props.user_data;
    const company_data = props.companies;
    const post_data = props.posts;
    const job_data = props.jobs;
    const application_data = props.applications;


    const list = (
        <>
        {application_data.length === 0 ? null :
        <section className={styles.panel__category}>
            <div onClick={() => set_display_applications(!display_applications)}><p>Applications</p> <FaChevronDown /></div>
            {display_applications === true ? application_data.map(item => <Link to={`/dashboard/applications/${item.post_id}`}><li><p>{item.job_data.title}</p></li></Link>) : null}
        </section>
        }
        {job_data.length === 0 ? null :
        <section className={styles.panel__category}>
            <div onClick={() => set_display_jobs(!display_jobs)}><p>Jobs</p> <FaChevronDown /></div>
            {display_jobs === true ? job_data.map(item => <Link to={`/dashboard/jobs/${convert_name(item.company_data.name)}`}><li><p>{item.company_data.name}</p></li></Link>) : null}
        </section>
        }
        {post_data.length === 0 ? null :
        <section className={styles.panel__category}>
            <div onClick={() => set_display_posts(!display_posts)}><p>Posts</p> <FaChevronDown /></div>
            {display_posts === true ? post_data.map(item => <Link to={`/dashboard/posts/${item.post_id}`}><li><p>{item.title}</p></li></Link>) : null}
        </section>
        }
        {company_data.length === 0 ? null :
        <section className={styles.panel__category}>
            <div onClick={() => set_display_companies(!display_companies)}><p>Companies</p> <FaChevronDown /></div>
            {display_companies === true ? company_data.map(item => <Link to={`/dashboard/company/${convert_name(item.name)}`}><li><p>{item.name}</p><p>{item.tasks.length}</p></li></Link>) : null}
        </section>
        }
        </>
    );

    const menu = (
        <>
        <div className={styles.menu__title}><div onClick={() => {history.push('/dashboard'); set_selected(0);}}><FaChevronLeft /></div> <h4>{title}</h4></div>
        <section className={styles.menu__list}>
            {options.map((item, index) => <div className={selected === index ? styles.active : null}><p onClick={() => set_selected(index)}>{item}</p></div>)}
        </section>
        </>
    );

    const main = (
        <main className={styles.panel}>
            <section className={styles.panel__user}>
                <img src={user_data.avatar} />
                <h5 class="bold">{user_data.name}</h5>
            </section>

            <section className={styles.panel__options}>
                <div className={location.pathname === "/dashboard" ? styles.panel__options_active : null} onClick={() => {history.push('/dashboard'); set_selected(0);}}><AiOutlineHome /><small>Home</small></div>
                <div className={location.pathname === "/dashboard/tasks" ? styles.panel__options_active : null} onClick={() => {location.pathname === "/dashboard/tasks" ? history.goBack() : history.push('/dashboard/tasks')}}><FaTasks /><small>Tasks</small></div>
                <div className={location.pathname === "/dashboard/messages" ? styles.panel__options_active : null} onClick={() => {location.pathname === "/dashboard/messages" ? history.goBack() : history.push('/dashboard/messages')}}><FiMessageSquare /><small>Messages</small></div>
            </section>

            <section className={styles.menu}>
                {options.length === 0 ? list : menu}
            </section>
    
            <section className={styles.actions}>
                <div><IoMdLogOut /></div>
                <div><FaCog /></div>
            </section>
        </main>
    );

    const notification = (
        <main className={styles.notes}>
            <div className={styles.notes__title}>
                <h2>Notifications</h2>
            </div>
            <div><p>You've applied for UX Designer</p></div>
        </main>
    );



    return display_notes ? notification : main;
};

export default Panel;