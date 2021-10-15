import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/items/Application.module.scss';

function Application (props) {
    const data = props.data;
    const [status, set_status] = useState(0);

    return (
        <div className={styles.application}>

            <div className={styles.job}>
                <h5>Software Developer</h5>
                <p>Lucidica</p>
                {/* <Link to="/portfolio" class="small_button">View</Link> */}
            </div>

            <div className={styles.steps}>
                <div className={`${styles.steps__step} ${status >= 0 ? styles.steps__active : null}`}><p class="bold">1</p><small>Applied</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 1 ? styles.steps__active : null}`}><p class="bold">2</p><small>Review</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 2 ? styles.steps__active : null}`}><p class="bold">3</p><small>Interview</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 3 ? styles.steps__active : null}`}><p class="bold">4</p><small>Processing</small></div>
                <div className={styles.steps__divider}></div>
                <div className={`${styles.steps__step} ${status >= 4 ? styles.steps__active : null}`}><p class="bold">5</p><small>Accepted</small></div>
            </div>
        </div>
    )
};

export default Application;