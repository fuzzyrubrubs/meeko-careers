import styles from '../../../styles/pages/Dashboard/Candidates.module.scss';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Candidate from './Candidate';
import { useState } from 'react';

function Candidates (props) {
    const [filter, set_filter] = useState(0);
    const [selected, set_selected] = useState(false);

    const select_handler = () => set_selected(true);
    const go_back = () => set_selected(false);

    const main = (
        <main className={styles.main}>
        <Dashboard_Header back_handler={() => props.go_back()}>Candidates</Dashboard_Header>
        <section className={styles.wrapper}>
            <div>
                <p>Applied</p>
                <p>New</p>
                <p>Qualified</p>
                <p>Called</p>
                <p>Interviewed</p>
                <p>Closed</p>
            </div>
            <div className={styles.candidates}>
                {/* FILTERS  */}
                <div>
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                    <Candidate_Preview select={select_handler} />
                </div>
            </div>

            <div>

            </div>
        </section>
    </main>
    )

    const display_content = selected ? <Candidate id={selected} go_back={go_back} /> : main;

    return display_content
};

export default Candidates;


function Candidate_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <span>
                <div className={styles.preview__image}></div>
                 <p>Anna Taylor</p>
            </span>
            <small>Applied</small>
            <small>3 days ago</small>
        </div>
    )
};