import styles from '../../../styles/pages/Dashboard/Overview.module.scss';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Candidate_Preview from '../../../components/dashboard/Candidate_Preview';
import Candidate from '../../../components/dashboard/Candidate';

function Overview (props) {


    return (
        <main className={styles.main}>
            <Dashboard_Header back_handler={() => props.go_back()}>Lucidica - Software Developer</Dashboard_Header>
            <section className={styles.analytics}></section>
            <section className={styles.wrapper}>
                <div className={styles.candidates}>
                    {/* FILTERS  */}
                    <Candidate_Preview />
                    <Candidate_Preview />
                    <Candidate_Preview />
                    <Candidate_Preview />
                    <Candidate_Preview />
                    <Candidate_Preview />
                    <Candidate_Preview />
                </div>
                <div className={styles.candidate}>
                    <Candidate />
                </div>
            </section>
        </main>
    )

};

export default Overview;