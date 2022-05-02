import styles from '../../styles/components/previews/Recruitment.module.scss';
import { time_since } from '../../tools/DateTime_Methods';
import { Line } from '../../tools/global_components';



function Recruitment_Preview (props) {
    const data = props.data;
    return (
        <div className={styles.preview}>
            <div>
                <p className={styles.title}>Software Developer</p>
                <small>Recruiting</small>
            </div>

            <div className={styles.users}>
                <div className={styles.users__wrapper}>
                    <div className={styles.users__list}>
                        {data.candidates.map(item => <div className={styles.users__applicant} style={{ backgroundImage: `url(${item.user_data.avatar})` }}></div>).slice(0, 3)}
                        <small className={styles.users__end}>{data.candidates.length > 50 ? "50+" : data.candidates.length}</small>
                    </div>
                </div>
            </div>

            <p class="bold">{data.salary}k</p>

            <Line>90</Line>

            <small>{time_since(data.timestamp)}</small>
        </div>
    );
};

export default Recruitment_Preview;