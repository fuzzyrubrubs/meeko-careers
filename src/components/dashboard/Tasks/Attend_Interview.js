import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/components/dashboard/tasks/Attend_Interview.module.scss';
import { interview_duration, interview_types } from '../../../tools/global_variables';
import Button_Main from '../../items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import Calendar from '../../items/Calendar';
import Times_List from '../../lists/Times_List';
import moment from 'moment';

function Attend_Interview (props) {
    const [date_selected, set_date_selected] = useState(null);
    const [time_selected, set_time_selected] = useState(null);
    const data = props.data;

    const times_list = [... new Set(data.slots.map(time => moment.unix(time).format('hh:mm a')))];

    const submit_handler = () => {
        const converted_date = date_selected.format('YYYY-MM-DD');
        const converted_time = times_list[time_selected];
        const combined = (`${converted_date} ${converted_time}`);
        const seconds = moment(combined, 'YYYY-MM-DD hh:mm a').format("X");

        console.log(combined)
        console.log(seconds)
    };

       

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
                   <Calendar rules={false} schedule={true} available={data.slots} set_date_selected={set_date_selected} />
                </div>
                <div className={styles.form__time}>
                    <Times_List list={times_list} array={false} selector={(e) => set_time_selected(e)} selected={time_selected} />
                </div>
            </section>

        </main>
    )
};

export default Attend_Interview;