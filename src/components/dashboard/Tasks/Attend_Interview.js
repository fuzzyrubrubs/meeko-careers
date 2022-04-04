import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/components/dashboard/tasks/Attend_Interview.module.scss';
import { interview_duration, interview_types } from '../../../tools/global_variables';
import Button_Main from '../../items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import Calendar from '../../items/Calendar';
import Times_List from '../../lists/Times_List';
import moment from 'moment';
import { update_interview } from '../../../firebase/methods/Applicant_Functions';
import { interview_status } from '../../../tools/global_variables';
import { get_date, get_time } from '../../../tools/DateTime_Methods';

function Attend_Interview (props) {
    const [date_selected, set_date_selected] = useState(null);
    const [time_selected, set_time_selected] = useState(null);
    const data = props.data;

    const now = moment();
    const last_slot = moment.unix(Math.max(...data.slots));
    const expired = last_slot.isBefore(now);


    useEffect(() => {
        if(data.status === 2 && expired === true) { update_interview(data.application_id, data.id, "status", 1) }
        if(data.status === 3 && moment.unix(data.time).isBefore(now)) { update_interview(data.application_id, data.id, "status", 4) }
    }, [])



    const times_list = [... new Set(data.slots.map(time => moment.unix(time).format('hh:mm a')))];

    const schedule_handler = () => {
        const converted_date = date_selected.format('YYYY-MM-DD');
        const converted_time = times_list[time_selected];
        const combined = (`${converted_date} ${converted_time}`);
        const seconds = moment(combined, 'YYYY-MM-DD hh:mm a').format("X");
        update_interview(data.application_id, data.id, "status", 3);
        update_interview(data.application_id, data.id, "time", seconds);
    };



    const default_screen = (
        <main className={styles.expired}>
            <section className={styles.form__info}>
                <img src={data.manager.avatar} />
                <h4 class="bold medium">{data.manager.name}</h4>
                <h2>{interview_types[data.type]}</h2>
                <h4 class="medium">Status: {interview_status[data.status]}</h4>
                <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                {/* <h4 class="medium"><FaInfoCircle /> {data.contact}</h4> */}
                <p>{data.message}</p>
            </section>
        </main>
    );

    
    const pending_screen = (
        <main className={styles.pending}>
            <section className={styles.form}>
                <div className={styles.form__info}>
                    <img src={data.manager.avatar} />
                    <h4 class="bold medium">{data.manager.name}</h4>
                    <h2>{interview_types[data.type]}</h2>
                    <h4 class="medium">Status: {interview_status[data.status]}</h4>
                    <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                    <h4 class="medium"><FaInfoCircle /> {data.contact}</h4>
                    <p>{data.message}</p>
                    <div>
                        <Button_Main action={schedule_handler}>Schedule</Button_Main>
                    </div>
                </div>
         
                <h3 className={styles.form__date_header}>Select a time and date</h3>
                <div className={styles.form__day}>
                   <Calendar rules={false} schedule={true} available={data.slots} set_date_selected={set_date_selected} />
                </div>

                <h5 className={styles.form__time_header}>{date_selected ? date_selected.format('MMMM Do') : null}</h5>
                <div className={styles.form__time}>
                    <Times_List list={times_list} array={false} selector={(e) => set_time_selected(e)} selected={time_selected} />
                </div>
            </section>
        </main>
    );

    const scheduled_screen = (
        <main className={styles.expired}>
            <section className={styles.form__info}>
                <img src={data.manager.avatar} />
                <h4 class="bold medium">{data.manager.name}</h4>
                <h2>{interview_types[data.type]}</h2>
                <h4 class="medium">Status: {interview_status[data.status]}</h4>
                <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                <h4 class="medium"><FaInfoCircle /> {data.contact}</h4>
                <h4 class="medium"><FaClock /> {get_time(data.time)}</h4>
                <h4 class="medium"><FaClock /> {get_date(data.time)}</h4>
                <p>{data.message}</p>
                {/* <Button_Main action={schedule_handler}>Cancel Interview</Button_Main> */}
            </section>
        </main>
    );

    const finished_screen = (
        <main className={styles.expired}>
            <section className={styles.form__info}>
                <img src={data.manager.avatar} />
                <h4 class="bold medium">{data.manager.name}</h4>
                <h2>{interview_types[data.type]}</h2>
                <h4 class="medium">Status: {interview_status[data.status]}</h4>
                <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                <h4 class="medium"><FaInfoCircle /> {data.contact}</h4>
                <h4 class="medium"><FaClock /> {get_time(data.time)}</h4>
                <h4 class="medium"><FaClock /> {get_date(data.time)}</h4>
                <p>{data.message}</p>
                {/* <Button_Main action={schedule_handler}>Cancel Interview</Button_Main> */}
            </section>
        </main>
    );

    const content = [default_screen, default_screen, pending_screen, scheduled_screen, finished_screen, finished_screen];


    return content[data.status]
};

export default Attend_Interview;