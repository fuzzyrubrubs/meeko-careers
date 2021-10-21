import { useContext, useEffect, useState } from 'react';
import Check_Box from '../components/inputs/Check_Box';
import Job_Post from '../components/jobs/Job_Post';
import Job_Preview from '../components/jobs/Job_Preview';
import { AuthContext } from '../contexts/Auth.context';
import { get_jobs } from '../firebase/methods/Job_Functions';
import styles from '../styles/pages/Jobs.module.scss';
import { job_categories, job_hours, job_location } from '../tools/global_variables';

function Jobs () {
    const { applications } = useContext(AuthContext);
    const [selected, set_selected] = useState(null);
    const [jobs, set_jobs] = useState([]);
    
    useEffect(() => {
        const fetch_data = async () => {
            const jobs_data = await get_jobs();
            set_jobs([...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data]);
        }
        fetch_data();
    }, []);

    const check_status = (job_id) => applications.some(item => item.job_id === job_id);

    return (
        <>
        <main className={styles.jobs}>
            <section className={styles.body}>
                <section className={styles.category}>
                    <div className={styles.category__list}>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Work type</p>
                                {job_hours.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Location</p>
                                {job_location.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                        <div className={styles.category__list__item}>
                            <div>
                                <p className={styles.category__list__item__name}>Category</p>
                                {job_categories.map(item => <Check_Box>{item}</Check_Box>)}
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.main}>
                    <div className={styles.header}>
                        <h2>Lorem ipsum</h2>
                        <p>Ut tristique eros ut elit dignissim placerat. Fusce feugiat ante augue. r in Aenean vel porttitor purue.</p>
                    </div>
                    <div className={styles.posts}>
                        {jobs.map((item, index) => <Job_Post data={item} applied={check_status(item.id)} selected={selected === index} select={() => set_selected(index)} />)}
                    </div>
                </section>
                <section className={styles.preview}>
                    {selected === null ? null : <Job_Preview data={jobs[selected]} applied={check_status(jobs[selected].id)} />}
                </section>
            </section>
        </main>
        </>
    );
};

export default Jobs;