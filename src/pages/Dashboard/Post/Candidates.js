import styles from '../../../styles/pages/Dashboard/Candidates.module.scss';
import Candidate from './Candidate';
import { useState } from 'react';
import { interview_types } from '../../../tools/global_variables';
import { time_since } from '../../../tools/DateTime_Methods';
import Job_Process from '../../../components/dashboard/Job_Process';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';

function Candidates (props) {
    const data = props.data;
    const [selected, set_selected] = useState(false);

    const select_handler = (data) => set_selected(data);
    const go_back = () => set_selected(false);

    console.log(data)

    const stages = ["New", "Applied", "Qualified", ...data.interview_template.map(item => interview_types[item.type]), "Accepted"]
    const _actions = ["Shortlist", ...data.interview_template.map(item => interview_types[item.type]), "Make Offer"]

    const main = (
        <main className={styles.main}>
        <Dashboard_Header back_handler={() => props.go_back()}>Candidates</Dashboard_Header>
        <section className={styles.wrapper}>
            <div className={styles.menu}>
                <Job_Process vertical={true} />
               {/* {stages.map(item => <p>{item}</p>)} */}
            </div>
            <div className={styles.candidates}>
                {/* FILTERS  */}
                <div>
                    {data.candidates.map(item => <Candidate_Preview data={item} stages={stages} select={select_handler} />)}
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
                 <small>{data.user_data.name}</small>
            </span>
            <small>{stages[data.status]}</small>
            <small>Messages</small>
            <small>Notes</small>
            <small>Action</small>
            <small>{time_since(data.timestamp)}</small>
        </div>
    )
};