import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Job_Status from '../../components/items/Job_Status';
import { Grid, Header, Row } from '../../components/styles/Containers';
import styles from '../../styles/pages/Dashboard/Company/Company.module.scss';
import Job from './Job';
import Analytics from './Company/Analytics';
import Employees from './Company/Employees';
import Create_Job from './Company/Create_Job';
import { FaChevronLeft } from "react-icons/fa";
import { MenuContext } from '../../contexts/Menu.context';

function Company (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;
    const [posts, set_posts] = useState(null);


    useEffect(() => {
        set_options(["Overview", "Employees", "Managers", "Onboarding", "Analytics", "Create Job"]);
        set_title(data.name)
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);

    if(data === undefined) return <h1>Not found</h1>

    console.log(data)

    const go_back = () => set_selected(0);


    const _item = (name, index) => (
        <div onClick={() => set_selected(index + 1)} className={styles.menu_item}>
            <div className={`shape_pink ${styles.menu_item__icon}`}></div>
            <p className={styles.menu_item__text}>{name}</p>
        </div>
    )

    // const items = companies.map(item => (
    //     <Link to={`/dashboard/${convert_name(item.name)}`} className={styles.box}>
    //         <div className={`shape_pink ${styles.box__box}`}></div>
    //         <h4 className={styles.box__text}>{item.name}</h4>
    //     </Link>
    // ))

    const list = ["Employees", "Managers", "Onboarding", "Analytics", "Create Job"];

    const select_handler = (index) => set_posts(index);

    const main = (
        <main className={styles.company}> 
            <Link to="/dashboard" className={styles.company__title}><FaChevronLeft /> <h2>{data.name}</h2></Link>
            <div className={styles.company__menu}>{list.map((item, index) => _item(item, index))}</div>
            <div className={styles.company__posts}>
                <Header>Job Posts</Header>
                <div>
                    {data.posts.map((item, index) => <Job_Status data={item} select={() => select_handler(index)} />)}
                </div>
            </div>
            <div></div>
            <div className={styles.company__posts}>
                <Header>Employee Tasks</Header>
                <div>
                    {data.posts.map((item, index) => <Job_Status data={item} select={() => select_handler(index)} />)}
                </div>
            </div>
            <div></div>
        </main>
    );

    const content = [
        main, 
        <Employees go_back={go_back} />, 
        <Employees go_back={go_back} />, 
        <Employees go_back={go_back} />,
        <Analytics go_back={go_back} />,
        <Create_Job go_back={go_back} />
    ]


    return posts === null ? content[selected] : <Job data={data.posts[posts]} go_back={() => set_posts(null)} />
}

export default Company;