import React, { useState } from 'react';
import styles from '../../styles/pages/Dashboard/Application.module.scss';
import Header from '../../components/headers/Header';
import Job_Process from '../../components/dashboard/Job_Process';
import Button_Main from '../../components/items/Button_Main';
import { application_status } from '../../tools/global_variables';
import Click_Modal from '../../components/items/Click_Modal';
import Edit_Icon from '../../components/items/Edit_Icon';
import Edit_Area from '../../components/inputs/Edit_Area';
import { interview_icons } from '../../tools/global_variables';
import Attend_Interview from '../../components/dashboard/Tasks/Attend_Interview';
import Button_Modal from '../../components/items/Button_Modal';
import View_Offer from '../../components/dashboard/Tasks/Vew_Offer';

function Application (props) {
    const data = props.data;
    const [notes, set_notes] = useState("");
    const [edit, set_edit] = useState(false);





    const interview_item = (item) => (
        <div className={styles.interviews__items}>
            <div className={styles.interviews__item}>{interview_icons[item.type]}</div>
        </div>
    )

    const active_interview = data.interviews.find(item => item.completed === false);

    const offer_button = <Button_Modal type={0} name="View Offer"><View_Offer offer={data.offer} /></Button_Modal>;
    const interview_button =  <Button_Modal type={0} name={active_interview.status === 2 ? "Select time" : "View Interview"}><Attend_Interview data={active_interview} /></Button_Modal>;

    return (

            <>
            <Header name="Application" id={data.application_id} >{data.job_data.title}</Header>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div>
                        <h4 className={styles.header}>Status: <span class="bold dark">{application_status[data.status]}</span></h4>
                        <p>Hi, Anna! {data.message}</p>
                    </div>
                   {data.status === 3 ? interview_button : null }
                   {data.status === 4 ? offer_button : null }
                    
                    
                </section>
                <section className={styles.details}>
                    {data.status < 3 ? null : ( 
                        <div className={styles.interviews}>
                            <h4 className={styles.header}>Interviews</h4>
                            {data.interviews.map(item => <Click_Modal content={interview_item(item)}><Attend_Interview data={item} /></Click_Modal>)}       
                        </div>
                     )}
                    <div>
                        <h4 className={styles.header}>Job Details</h4>
                        <div className={styles.grid}>
                            <div><p class="bold">Salary</p></div>
                            <div><p>45k</p></div>
                            <div><p class="bold">Location</p></div>
                            <div><p>Kyiv</p></div>
                            <div><p class="bold">Remote</p></div>
                            <div><p>Yes</p></div>
                            <div><p class="bold">Hours</p></div>
                            <div><p>Full Time</p></div>
                            <div><p class="bold">Hiring Manager</p></div>
                            <div><p>Anna Taylor</p></div>
                            <div><p class="bold">Apply Date</p></div>
                            <div><p>25/02/2022</p></div>
                        </div>
                    </div>
                    <div>
                        <h4 className={styles.header}>Contact Details</h4>
                        <div className={styles.grid}>
                            <div><p class="bold">Phone</p></div>
                            <div><p>{data.phone}</p></div>
                            <div><p class="bold">Email</p></div>
                            <div><p>{data.email}</p></div>
                        </div>
                    </div>
                    {/* <div>
                        <h4>Personal Notes <Edit_Icon value={edit} toggle={set_edit} /></h4>
                        {edit ? <Edit_Area close={set_edit} save={save_handler} value={notes} input={set_notes} object={false}  /> : <p>{notes}</p>}  
                    </div> */}
                </section>
            </main>
        </>
    )
}

export default Application;