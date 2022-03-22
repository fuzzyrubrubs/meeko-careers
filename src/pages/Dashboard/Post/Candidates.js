import styles from '../../../styles/pages/Dashboard/Candidates.module.scss';
import Candidate from './Candidate';
import { useState } from 'react';
import { interview_types } from '../../../tools/global_variables';
import { time_since } from '../../../tools/DateTime_Methods';
import Job_Process from '../../../components/dashboard/Job_Process';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Header from '../../../components/headers/Header';
import Check_Box from '../../../components/inputs/Check_Box';

function Candidates (props) {
    const data = props.data;
    const [selected, set_selected] = useState(false);

    const select_handler = (data) => set_selected(data);
    const go_back = () => set_selected(false);

    console.log(data)

    const stages = ["New", "Applied", "Qualified", "Interviews", "Accepted"]

    const categories = ["New", "Reviewed", "Shortlisted", "Interviews", "Offers"]

    // new, in review, shortlisted, interviews, offers

    const main = (
        <main className={styles.main}>
        <Header name="Post">Applicants</Header>
        <section className={styles.wrapper}>
            <div className={styles.menu}>
                <h5>Work type</h5>
                {categories.map(item => <Check_Box>{item}</Check_Box>)}
            </div>
            <div className={styles.candidates}>
                {/* FILTERS  */}
                <div>
                    {data.candidates.map(item => <Candidate_Preview data={item} stages={categories} select={select_handler} />)}
                </div>
            </div>
        </section>
    </main>
    )

    const display_content = selected ? <Candidate data={selected} job_data={data} stages={stages} go_back={go_back} /> : main;

    return display_content
};

export default Candidates;


function Candidate_Preview (props) {
    const data = props.data;
    const stages = props.stages;
    return (
        <div onClick={() => props.select(data)} className={styles.preview}>
            <span>
                <div className={styles.preview__image}></div>
                 <p class="bold">{data.user_data.name}</p>
            </span>
            <small>{stages[data.status]}</small>
            <p>1</p>
            <p>1</p>
            <small>{time_since(data.timestamp)}</small>
        </div>
    )
};