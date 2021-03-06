import styles from '../../styles/components/jobs/Job_Preview.module.scss';
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import { FaSortDown, FaSortUp  } from "react-icons/fa";
import { IoMdToday } from "react-icons/io";
import Button_Main from '../items/Button_Main';
import { useState } from 'react';
import { job_categories, job_hours, job_remote } from '../../tools/global_variables';
import Apply from '../forms/Apply';

function Job_Preview (props) {
    const [expand, set_expand] = useState(false);
    const [apply_open, set_apply_open] = useState(false);
    const data = props.data;

    const open_handler = (data) => {
        set_apply_open(true);
        document.body.style.overflow = "hidden";
    };
     
    return (
        <>
        <div className={styles.preview}>
            <div className={`${styles.details} ${styles.wrapper}`}>
                <div className={styles.details__image}><IoMdToday /></div>
                <small>{job_categories[data.category]}</small>
                <h3>{data.title}</h3>
                <ul className={styles.details__list}>
                    <p><FiCreditCard/> ${data.salary}k <small>/ year</small></p>
                    <p><FiBriefcase/> {job_hours[data.hours]}</p>
                    <p><GoLocation /> {job_remote[data.location]}</p>
                </ul>
            </div>
            <div className={expand ? styles.wrapper : null}>
                <h4>About the job</h4>
                <small>{data.about}</small>
            </div>
            {expand ? (
                <>
            <div className={styles.wrapper}>
                <h4>Minimum qualifications:</h4>
                <ul className={styles.list}>
                    {data.min_skills.map(item => <small>- {item}</small>)}
                </ul>
            </div>
            <div className={styles.wrapper}>
                <h4>Preferred qualifications:</h4>
                <ul className={styles.list}>
                    {data.pref_skills.map(item => <small>- {item}</small>)}
                </ul>
            </div>
            <div>
                <h4>Additional Information</h4>
                <small>{data.info}</small>
            </div>
            </>) : null}
            <small className={styles.expand} style={expand ? {alignItems: "flex-end"} : {alignItems: "flex-start"}} onClick={() => set_expand(!expand)}>{expand ? `Read Less` : `Read More`} {expand ? <FaSortUp /> : <FaSortDown />}</small>
            <div className={styles.action}>
            {props.applied ?<Button_Main hollow={true}>Applied</Button_Main> : <Button_Main action={open_handler}>Apply</Button_Main>}
            </div>
        </div>
        {apply_open ? <Apply data={data} close={() => set_apply_open(false)} /> : null}
        </>
    )
};

export default Job_Preview;