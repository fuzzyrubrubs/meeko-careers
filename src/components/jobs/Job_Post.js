import styles from '../../styles/components/jobs/Job_Post.module.scss';
import Button_Main from '../items/Button_Main';
import { GoLocation } from "react-icons/go";
import { FiBriefcase, FiCreditCard } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { job_categories, job_hours, job_location } from '../../tools/global_variables';
import { time_since } from '../../tools/DateTime_Methods';
import { useState } from 'react';
import Apply from '../forms/Apply';



function Job_Post (props) {
    const data = props.data;
    const [apply_open, set_apply_open] = useState(false);

    const open_handler = (data) => {
        set_apply_open(true);
        document.body.style.overflow = "hidden";
    };

    return (
        <>
        <div className={`${styles.preview} ${props.selected ? styles.active : null}`} onClick={() => props.select()}>
            <div className="between-row">
                <small>{job_categories[data.category]}</small>
                <small>{time_since(data.timestamp.seconds)}</small>
            </div>
            <h3>{data.title}</h3>
            <div className={styles.preview__details}>
                <p><FiCreditCard/> ${data.salary}k <small>/ year</small></p>
                <p><FiBriefcase/> {job_hours[data.hours]}</p>
                <p><GoLocation /> {job_location[data.location]}</p>
            </div>
            <div>
                <small>{data.about}</small>
            </div>
            <div className={styles.preview__action}> 
                {props.applied ? <Button_Main hollow={true}>Applied</Button_Main> : <Button_Main action={open_handler}>Apply</Button_Main>}
                <h5><FaRegBookmark /></h5>
            </div>
        </div>
        {apply_open ? <Apply data={data} close={() => set_apply_open(false)} /> : null}
        </>
    )
}

export default Job_Post;