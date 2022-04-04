import styles from '../../../styles/pages/Dashboard/Post/Candidates.module.scss';
import Candidate from './Candidate';
import { useState } from 'react';
import { candidate_status, interview_types } from '../../../tools/global_variables';
import { time_since } from '../../../tools/DateTime_Methods';
import Job_Process from '../../../components/dashboard/Job_Process';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Header from '../../../components/headers/Header';
import Check_Box from '../../../components/inputs/Check_Box';

function Candidates (props) {
    const data = props.data;
    const [profile, set_profile] = useState(false);
    const [selected, set_selected] = useState(null);

    const select_handler = (data) => set_profile(data);
    const go_back = () => set_profile(false);

    console.log(data)


    // new, in review, shortlisted, interviews, offers

    const filter_handler = (selected) => {
        if(selected === null) return data.candidates;
        return data.candidates.filter(item => item.status === selected)
    }

    const main = (
        <main className={styles.main}>
            <section className={styles.menu}>
                {candidate_status.map((item, index) => <div className={`${styles.menu__item} ${selected === index ? styles.menu__item__active : null}`} onClick={() => set_selected(index)}><p>{item}</p>{filter_handler(index).length > 0 ? <p className={styles.menu__item__icon}>{filter_handler(index).length}</p> : null }</div>)}   
            </section>
            <section className={styles.candidates}>
                <h2>{selected === null ? "All" : candidate_status[selected]}</h2>
                <div className={styles.candidates__list}>
                    {filter_handler(selected).map(item => <Candidate_Preview data={item} stages={candidate_status} select={select_handler} />)}
                </div>
            </section>
        </main>
    )

    const display_content = profile ? <Candidate data={profile} job_data={data} stages={candidate_status} go_back={go_back} /> : main;

    return display_content
};

export default Candidates;


function Candidate_Preview (props) {
    const data = props.data;
    const stages = props.stages;
    return (
        <div onClick={() => props.select(data)} className={styles.preview}>
            <span>
                <div className={styles.preview__image} style={{"backgroundImage": `url(${data.user_data.avatar})`}}></div>
                 <p class="bold">{data.user_data.name}</p>
            </span>
            <small>{stages[data.status]}</small>
            <p>1</p>
            <p>1</p>
            <small>{time_since(data.timestamp)}</small>
        </div>
    )
};