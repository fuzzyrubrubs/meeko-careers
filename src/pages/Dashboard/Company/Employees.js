import styles from '../../../styles/pages/Dashboard/Company/Employees.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import Hiree from './Employee';
import Doughnut_Chart from '../../../components/charts/Doughnut';
import Half_Doughnut_Chart from '../../../components/items/Half_Doughnut_Chart';
import Employee from './Employee';
import Click_Modal from '../../../components/items/Click_Modal';
import Add_Managers from '../../../components/dashboard/Add_Managers';
import Make_Offer from '../../../components/dashboard/Tasks/Make_Offer';
import Text_Input_Alt from '../../../components/inputs/Text_Input_Alt';
import Onboarding from '../../../components/dashboard/Company/Onboarding';

const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;


function Employees (props) {
    const data = props.data;
    console.log(data)
    const [profile, set_profile] = useState(false);
    const [selected, set_selected] = useState(null);
    const [positions, set_positions] = useState(props.data.employees)

    console.log(data)

    const select_handler = (data) => set_profile(data);
    const go_back = () => set_profile(false);

    

    const main = (
        <main className={styles.main}>
            <section className={styles.list}>
                {positions.map(item => item.accepted ? <Employee_Preview data={item} select={select_handler}  /> : <Pending_Preview  data={item}  /> )}
                {data.posts.map(item => <Recruit_Preview data={item} /> )}
                <Click_Modal content={<p>Add</p>}><Onboarding data={data} /></Click_Modal>
            </section>
            <section className={styles.display}>
                <h4>Task Analytics</h4>
                <div className={styles.display__chart}>
                   <Half_Doughnut_Chart data={[4, 2]} />
                </div>
                <div></div>
            </section>
        </main>
    );

    const content = profile ? <Employee data={profile} job_data={data} go_back={go_back} /> : main;

    return content

};

export default Employees;


function Employee_Preview (props) {
    const data = props.data;

    return (
        <div onClick={() => props.select(data)} className={styles.preview}>      
            <p class="bold">{data.position}</p>
            <div className={styles.preview__wrapper}>
                <div className={styles.preview__image} style={{"backgroundImage": `url(${data.user_data.avatar})`}}></div>
                <p class="bold">{data.user_data.name}</p>
                <p>Onboarding</p>
                <p>4 days ago</p>
                <p>{data.salary}</p>
                <p>6 Tasks pending</p>
                <p>Last Active: 54 mins</p>
            </div>
        </div>
    )
};

function Recruit_Preview (props) {
    const data = props.data;
    console.log(data)

    return (
        <div className={styles.preview}>
            <p class="bold">Software Developer</p>
            <div className={styles.preview__wrapper}>
                <p>Recruiting</p>
                <p>400 applicants</p>
                <p>4 days ago</p>
            </div>
        </div>
    )
};

function Pending_Preview (props) {
    const data = props.data;
    const post = props.post;
    console.log(post)

    return (
        <div className={styles.preview}>
            <p class="bold">Software Developer</p>
            <div className={styles.preview__wrapper}>
                <p>Recruiting</p>
                <p>400 applicants</p>
                <p>4 days ago</p>
            </div>
        </div>
    )
};

