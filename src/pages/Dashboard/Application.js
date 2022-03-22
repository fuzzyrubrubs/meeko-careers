import styles from '../../styles/pages/Dashboard/Application.module.scss';
import Header from '../../components/headers/Header';
import Job_Process from '../../components/dashboard/Job_Process';
import { Grid, Grid_Header } from '../../components/styles/Containers';
import Button_Main from '../../components/items/Button_Main';

function Application (props) {
    const data = props.data;
    console.log(data)

    return (

            <>
            <Header name="Application" >{data.job_data.title}</Header>
            <main className={styles.main}>
                <section className={styles.content}>
                    <h5>Status: <span class="bold">In Review</span></h5>
                    <p>Hi, Anna! Thanks for your application. We'll review it and get back to you shortly.</p>
                </section>
                <section className={styles.details}>
                    <div>
                        <h5>Job Details</h5>
                        <div className={styles.grid}>
                            <div><p class="bold">Salary</p></div>
                            <div><p>45k</p></div>
                            <div><p class="bold">Location</p></div>
                            <div><p>Kyiv</p></div>
                            <div><p class="bold">Remote</p></div>
                            <div><p>Yes</p></div>
                            <div><p class="bold">Hours</p></div>
                            <div><p>Full Time</p></div>
                            <div><p class="bold">Hiring Manager</p></div>
                            <div><p>Anna Taylor</p></div>
                            <div><p class="bold">Apply Date</p></div>
                            <div><p>25/02/2022</p></div>
                        </div>
                    </div>
                    <div>
                        <h5>Interviews</h5>
                        <div className={styles.interview}></div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Application;