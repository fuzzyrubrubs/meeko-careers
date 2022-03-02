import styles from '../../styles/components/items/Job_Status.module.scss';
import { IoMdAnalytics } from "react-icons/io";
import { Link } from 'react-router-dom';


function Company_Preview (props) {

    const array1 = [1, 1, 1, 1, 1, 1, 1, 1, 1].slice(0, 2);
    const array2 = [1, 1, 1, 1, 1, 1, 1, 1, 1].slice(0, 5);


    return (
        <div className={styles.container}>

            <div className={styles.status}>
                <div className={styles.status__display}></div>
                <small>4 days ago</small>
            </div>


            <div className={styles.job}>
                <h5>Lucidica</h5>
                <p>4 open</p>
            </div>


            <div className={styles.applicants}>
                <div className={styles.applicants__wrapper}>
                    <div className={styles.applicants__list}>
                        {array1.map(person => <div className={styles.applicants__applicant}></div>)}
                    </div>
                    <div className={styles.applicants__list}>
                        {array2.map(person => <div className={styles.applicants__applicant}></div>)}
                        <small className={styles.applicants__end}>21</small>
                    </div>
                </div>
            </div>

            <div onClick={() => props.select()}>
                <h5>View</h5>
            </div>


            <div className={styles.analytics}>
                <div className={styles.analytics__icon}><IoMdAnalytics /></div>
                <small>Analytics</small>
            </div>

        </div>
    )

};

export default Company_Preview;