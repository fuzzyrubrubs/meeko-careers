import { useContext, useState } from "react";
import Profile from "./Dashboard/Panel/Profile";
import Tasks from "./Dashboard/Panel/Tasks";
import styles from '../styles/pages/Dashboard/Panel/Panel.module.scss';
import { IoMdLogOut, IoIosCheckmarkCircleOutline, IoMdCheckboxOutline, IoIosArrowDown } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { FaTasks, FaUsers, FaChevronDown } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useHistory, useParams } from "react-router-dom";
import { convert_name } from "../tools/global_functions";
import { MenuContext } from "../contexts/Menu.context";


function Panel (props) {
    const history = useHistory();
    const params = useParams();
    const { options, selected, set_selected, title } = useContext(MenuContext);
    const [display_applications, set_display_applications] = useState(true);
    const [display_companies, set_display_companies] = useState(true);
    const [display_posts, set_display_posts] = useState(true);

    console.log(history)
    console.log(params)

    const user_data = props.user_data;
    const company_data = props.companies;
    const job_data = props.posts;
    //const selected = props.selected;
    //const params = props.params;#



    console.log(company_data)

    console.log(job_data)

    console.log(params)


    const list = (
        <div>
            <section className={styles.panel__menu}>
                <div onClick={() => set_display_posts(!display_posts)}><IoMdCheckboxOutline /> <p>Applications</p> <FaChevronDown /></div>
                {display_applications === true ? job_data.map(item => <li><p>{item.title}</p></li>) : null}
            </section>

            <section className={styles.panel__menu}>
                <div onClick={() => set_display_posts(!display_posts)}><IoMdCheckboxOutline /> <p>Posts</p> <FaChevronDown /></div>
                {display_posts === true ? job_data.map(item => <li><p>{item.title}</p></li>) : null}
            </section>

            <section className={styles.panel__menu}>
                <div onClick={() => set_display_companies(!display_companies)}><IoMdCheckboxOutline /> <p>Companies</p> <FaChevronDown /></div>
                {display_companies === true ? company_data.map(item => <li><p>{item.name}</p></li>) : null}
            </section>
        </div>
    );

    const menu = (
        <>
        <p>{title}</p>
        <section className={styles.panel__menu}>
            {options.map((item, index) => <div className={selected === index ? styles.active : null}><p onClick={() => set_selected(index)}>{item}</p></div>)}
        </section>
        </>
    );



    return (
        <main className={styles.panel}>
            <section className={styles.panel__user}>
                <img src={user_data.avatar} />
                <p>{user_data.name}</p>
            </section>

            <section className={styles.panel__options}>
                <div><AiOutlineHome /></div>
                <div><FaTasks /></div>
                <div><FiMessageSquare /></div>
            </section>

            {options.length === 0 ? list : menu}
    
            <section>
                <IoMdLogOut />
                <small>Logout</small>
            </section>
        </main>
    )
};

export default Panel;