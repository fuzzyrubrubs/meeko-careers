import styles from '../../styles/pages/Dashboard/Profile.module.scss';
import { FaRegBuilding } from "react-icons/fa";


function Status () {
    return (
        <div className={styles.status}>
            <div className={styles.status__image}><FaRegBuilding /></div>
            <h5>Lucidica</h5>
            <small>Employee</small>
            <div className={styles.status__wrapper}>
                <div className={styles.status__tasks}>
                    <p>Tasks</p>
                    <h5>5</h5>
                </div>
                <div className={styles.status__tasks}>
                    <p>Completed</p>
                    <h5>3</h5>
                </div>
            </div>
        </div>
    )
}

export default Status;