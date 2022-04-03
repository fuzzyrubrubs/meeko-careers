import styles from '../../../styles/components/dashboard/tasks/Attend_Interview.module.scss';
import { interview_duration, interview_types } from '../../../tools/global_variables';
import Button_Main from '../../items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import Calendar from '../../items/Calendar';

function Attend_Interview (props) {
    const data = props.data;
    console.log(data)

    const submit_handler = () => {

    };

    const get_dates = (selected, calendar) => {
       return selected.map(index => calendar[index]);
    };

    console.log(get_dates)

    return (
        <main className={styles.view_interview}>
            <section className={styles.form}>
                <div className={styles.form__info}>
                    <img src={data.manager.avatar} />
                    <h4 class="bold medium">{data.manager.name}</h4>
                    <h4 class="medium">Status: Pending</h4>
                    <h2>{interview_types[data.type]}</h2>
                    <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                    <h4 class="medium"><FaInfoCircle /> {data.contact}</h4>
                    <p>{data.message}</p>
                    <Button_Main action={submit_handler}>Schedule</Button_Main>
                </div>
                <h3 className={styles.form__header}><p>Please select a time and date that suits you</p></h3>
                <div className={styles.form__day}>
                   <Calendar rules={false} get_dates={get_dates} />
                </div>
                <div className={styles.form__time}>
                    
                </div>
            </section>

        </main>
    )
};

export default Attend_Interview;