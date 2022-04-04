import styles from '../../styles/components/dashboard/Calendar_Preview.module.scss';
import { get_time } from '../../tools/DateTime_Methods';
import { colors, interview_types } from '../../tools/global_variables';
import View_Interview from './Tasks/View_Interview';
import Click_Modal from '../items/Click_Modal';

function Calendar_Preview (props) {
    const data = props.data;
    const applicant = props.applicant;

    const content = (
        <div className={styles.calendar__item}>
            <h4>{get_time(data.time)}</h4>
            <span style={{backgroundColor: colors[data.type]}}></span>
            <div>
                <small>{interview_types[data.type]}</small>
                <p>{applicant.user_data.name}</p>
            </div>
        </div>
    )


   return <Click_Modal content={content}><View_Interview data={data} user_data={applicant.user_data} /></Click_Modal>
};

export default Calendar_Preview;