import { useContext, useEffect, useState } from 'react';
import Check_Box from '../components/inputs/Check_Box';
import Job_Post from '../components/jobs/Job_Post';
import Job_Preview from '../components/jobs/Job_Preview';
import { AuthContext } from '../contexts/Auth.context';
import { ProfileContext } from '../contexts/Profile.context';
import { get_posts } from '../firebase/methods/Post_Functions';
import styles from '../styles/pages/Jobs.module.scss';
import { job_categories, job_hours, job_remote } from '../tools/global_variables';

function Jobs () {
    const { applications } = useContext(ProfileContext);
    const [selected, set_selected] = useState(0);
    const [jobs, set_posts] = useState([]);
    
    useEffect(() => {
        const fetch_data = async () => {
            const jobs_data = await get_posts();
            set_posts([...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data, ...jobs_data]);
        }
        fetch_data();
    }, []);

    const check_status = (post_id) => applications.some(item => item.post_id === post_id);

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
                                {job_remote.map(item => <Check_Box>{item}</Check_Box>)}
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
                        <h2>Meeko Job Board</h2>
                        <p>See the list of availbale Meeko positions below.</p>
                    </div>
                    <div className={styles.posts}>
                        {jobs.map((item, index) => <Job_Post data={item} applied={check_status(item.id)} selected={selected === index} select={() => set_selected(index)} />)}
                    </div>
                </section>
                <section className={styles.preview}>
                    {jobs.length === 0 ? null : <Job_Preview data={jobs[selected]} applied={check_status(jobs[selected].id)} />}
                </section>
            </section>
        </main>
        </>
    );
};

export default Jobs;