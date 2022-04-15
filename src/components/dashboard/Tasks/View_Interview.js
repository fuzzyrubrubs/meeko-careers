import React, { useState, useEffect } from 'react';
import styles from '../../../styles/components/dashboard/tasks/View_Interview.module.scss';
import { interview_duration, interview_status, interview_types } from '../../../tools/global_variables';
import Button_Main from '../../items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaClock, FaInfoCircle } from "react-icons/fa";
import { delete_interview, update_interview, update_interview_contact } from '../../../firebase/methods/Applicant_Functions';
import Edit_Icon from '../../items/Edit_Icon';
import Edit_Area from '../../inputs/Edit_Area';
import Edit_Input from '../../items/Edit_Input';
import { get_date, get_time } from '../../../tools/DateTime_Methods';
import moment from 'moment';

function View_Interview (props) {
    const user_data = props.user_data;
    const data = props.data;
    const [edit_contact, set_edit_contact] = useState(false);
    const [contact, set_contact] = useState(data.contact);

    const now = moment();
    const last_slot = moment.unix(Math.max(...data.slots));
    const expired = last_slot.isBefore(now);


    useEffect(() => {
        if(data.status === 2 && expired === true) { update_interview(data.application_id, data.id, "status", 1) }
        if(data.status === 3 && moment.unix(data.time).isBefore(now)) { update_interview(data.application_id, data.id, "status", 4) }
    }, [])


    const delete_handler = () => {
        delete_interview(data.application_id, data.id)
    }

    const save_handler = () => {
        update_interview_contact(data.application_id, data.id, contact)
    }


    const default_screen = (
        <main className={styles.view_interview}>
            <div>
                <img src={user_data.avatar} />
                <h4 class="bold medium">{user_data.name}</h4>
            </div>
            <h2>{interview_types[data.type]}</h2>

            <h4 class="medium">Status: {interview_status[data.status]}</h4>

            <div>
                <h4 class="medium"><FaClock /> {get_date(data.time)}</h4>
                <h4 class="medium"><FaClock /> {get_time(data.time)}</h4>
                <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                <h4 class="medium"><FaInfoCircle /> {edit_contact ? <Edit_Input save={save_handler} value={contact} placeholder={contact} input={set_contact} name="contact" /> : contact} <Edit_Icon value={edit_contact} toggle={set_edit_contact} /></h4>
            </div>

            <p>{data.message}</p>
            <Button_Main action={delete_handler}>Delete</Button_Main>
        </main>
    );

    const finished_screen = (
        <main className={styles.view_interview}>
            <div>
                <img src={user_data.avatar} />
                <h4 class="bold medium">{user_data.name}</h4>
            </div>
            <h2>{interview_types[data.type]}</h2>

            <h4 class="medium">Status: {interview_status[data.status]}</h4>

            <div>
                <h4 class="medium"><FaClock /> {get_date(data.time)}</h4>
                <h4 class="medium"><FaClock /> {get_time(data.time)}</h4>
                <h4 class="medium"><FaClock /> {interview_duration[data.duration]}</h4>
                <h4 class="medium"><FaInfoCircle /> {edit_contact ? <Edit_Input save={save_handler} value={contact} placeholder={contact} input={set_contact} name="contact" /> : contact} <Edit_Icon value={edit_contact} toggle={set_edit_contact} /></h4>
            </div>

            <p>{data.message}</p>
            <Button_Main action={delete_handler}>Complete</Button_Main>
            <Button_Main action={delete_handler}>Reschedule</Button_Main>
        </main>
    );


    const content = [default_screen, default_screen, default_screen, default_screen, finished_screen, finished_screen];

    return content[4];

};

export default View_Interview;