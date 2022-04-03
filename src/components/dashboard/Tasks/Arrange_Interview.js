import { useEffect, useState, useContext, forwardRef, useRef, useImperativeHandle } from 'react';
import styles from '../../../styles/components/dashboard/tasks/Arrange_Interview.module.scss';
import Button_Main from '../../../components/items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { interview_duration, interview_types } from '../../../tools/global_variables';
import Button_Modal from '../../../components/items/Button_Modal';
import { populate_24_hours, populate_30_days } from '../../../tools/DateTime_Methods';
import Dates_List from '../../../components/lists/Dates_List';
import Times_List from '../../../components/lists/Times_List';
import moment from 'moment';
import Text_Input from '../../../components/inputs/Text_Input';
import { AuthContext } from '../../../contexts/Auth.context';
import generatePushID from '../../../tools/IDGenerator';
import { create_interview, update_application_message, update_application_status } from '../../../firebase/methods/Applicant_Functions';
import Calendar from '../../items/Calendar';


function Arrange_Interview (props) {
    const job_data = props.job_data;
    const application_data = props.application_data;
    const applicant_data = props.user_data;
    const { user_data } = useContext(AuthContext);
    const [selected, set_selected] = useState(0);
    const [type, set_type] = useState(0);
    const [duration, set_duration] = useState(0);
    const [message, set_message] = useState("");
    const [contact, set_contact] = useState("");
    const [date_selected, set_date_selected] = useState([]);
    const [time_selected, set_time_selected] = useState([]);
    const next_24_hours = populate_24_hours();
    const calender_ref = useRef();

    const toggle_time_selected = (e) => time_selected.includes(e) ? set_time_selected(time_selected.filter(item => item !== e)) : set_time_selected([...time_selected, e]);

    const _get_dates = () => {

        const calender_dates = (() => calender_ref.current.get_dates())();

        const total = calender_dates.map(date => {
            const items = [];
            const converted_date = date.format('YYYY-MM-DD');
            
            time_selected.forEach(time => {
                const converted_time = next_24_hours[time];
                const combined = (`${converted_date} ${converted_time}`);
                const seconds = moment(combined, 'YYYY-MM-DD hh:mm a').format("X");
                items.push(seconds);

            });
            return items;
        });

        return total.flat();
    };


    const submit_handler = () => {

        const interview_id = generatePushID();
        const slots = _get_dates();

        const interview_item = {
            managers: user_data.id,
            id: interview_id,
            type: type,
            application_id: application_data.application_id,
            applicant: applicant_data.id,
            duration: duration,
            post_id: job_data.post_id,
            company_id: job_data.company_id,
            contact: contact, 
            message: message,
            slots: slots
        };



        try {
            create_interview(interview_item);
            update_application_status(application_data.application_id, 3)
            update_application_message(application_data.application_id, job_data.templates.interviews);
            set_selected(5);
        } catch(error) {
            alert("Error");
        };
    
    };

    

    const _type = (
        <>
        <section className={styles.grid}>
            {interview_types.map((item, index) => <h3 onClick={() => {set_type(index); set_selected(1)}}>{item}</h3>)}
        </section>
        </>
    );

    const _duration = (
        <>
        <section className={styles.grid}>
            {interview_duration.map((item, index) => <h3 onClick={() => {set_duration(index); set_selected(2)}}>{item}</h3>)}
        </section>
        </>
    );
    
    const names = ["Phone Number", "URL", "Address", "URL"];

    const _contact = (
        <section className={styles.form}>
            <Text_Input value={contact} input={set_contact}>{names[type]}</Text_Input>
            <Button_Main action={() => set_selected(3)}>Next</Button_Main>
        </section>
    )

    const _message = (
        <section className={styles.form}>
            <Text_Input value={message} input={set_message}>Information</Text_Input>
            <Button_Main action={() => set_selected(4)}>Next</Button_Main>
        </section>
    );


    const select_all_handler = () => {
        if(time_selected.length === 32) { set_time_selected([]) } else { set_time_selected([...Array(next_24_hours.length).keys()]) }
    };


    const _date = (
        <section className={styles.date}>
            <div className={styles.date__info}>
                <img src={applicant_data.avatar} />
                <h4 class="bold medium">{applicant_data.name}</h4>
                <h2>{interview_types[type]}</h2>
                <h4 class="medium"><FaClock /> {interview_duration[duration]}</h4>
                <h4 class="medium"><FaInfoCircle /> {contact}</h4>
                <p>{message}</p>
                <Button_Main action={submit_handler}>Schedule</Button_Main>
            </div>
            <h3 className={styles.date__header}>Select dates and times</h3>
            <div className={styles.date__day}>
                <Calendar rules={true} ref={calender_ref} schedule={true} />
                {/* <Dates_List list={next_30_days} array={true} selector={(e) => toggle_date_selected(e)} selected={date_selected} /> */}
            </div>
            <div className={styles.date__time}>
                <small onClick={select_all_handler}>Select all</small>
                <Times_List list={next_24_hours} array={true} selector={(e) => toggle_time_selected(e)} selected={time_selected} />
            </div>
        </section>
    );

    const _sent = (
        <section className={styles.form}>
            <h5>Sent</h5>
        </section>
    );

    const content = [_type, _duration, _contact, _message, _date, _sent];


    return (
        <main className={styles.arrange_interview}>
            {content[selected]}
        </main>
    )
};

export default Arrange_Interview;




