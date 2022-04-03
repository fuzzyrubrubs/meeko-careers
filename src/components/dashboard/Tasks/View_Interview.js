import styles from '../../../styles/components/dashboard/tasks/View_Interview.module.scss';
import { interview_duration, interview_types } from '../../../tools/global_variables';
import Button_Main from '../../items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import { delete_interview } from '../../../firebase/methods/Applicant_Functions';

function View_Interview (props) {
    const user_data = props.user_data;
    const data = props.data;

    console.log(props)

    const delete_handler = () => {
        delete_interview(data.application_id, data.id)
    }

  
    return (
        <main className={styles.view_interview}>
            <section className={styles.form}>
                <div className={styles.form__info}>
                    <img src={user_data.avatar} />
                    <h4 class="bold medium">{user_data.name}</h4>
                    <h4 class="medium">Status: Pending</h4>
                    <h2>{interview_types[data.type]}</h2>
                    <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                    <h4 class="medium"><FaInfoCircle /> {data.contact}</h4>
                    <p>{data.message}</p>
                    <Button_Main action={delete_handler}>Delete</Button_Main>
                </div>
                <h3 className={styles.form__header}><p>Status: Pending</p></h3>
                <div className={styles.form__day}>
                   
                </div>
                <div className={styles.form__time}>
                    
                </div>
            </section>

        </main>
    )
};

export default View_Interview;