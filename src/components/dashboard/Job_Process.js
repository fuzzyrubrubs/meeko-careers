import { useState } from "react";
import styles from '../../styles/components/dashboard/Job_Process.module.scss';

function Job_Process (props) {
    const data = props.data;
    const [status, set_status] = useState(0);

    return (
            <div className={styles.steps}>
                <div className={`${styles.steps__step} ${status >= 0 ? styles.steps__active : null}`}><p class="bold">1</p><small>Applied</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 1 ? styles.steps__active : null}`}><p class="bold">2</p><small>Review</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 2 ? styles.steps__active : null}`}><p class="bold">3</p><small>Shortlisted</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 3 ? styles.steps__active : null}`}><p class="bold">4</p><small>Interview 1</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 4 ? styles.steps__active : null}`}><p class="bold">5</p><small>Interview 2</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 5 ? styles.steps__active : null}`}><p class="bold">6</p><small>Accepted</small></div>
            </div>
    )
};

export default Job_Process;