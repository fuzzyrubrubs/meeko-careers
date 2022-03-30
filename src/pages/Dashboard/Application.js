import React, { useState } from 'react';
import styles from '../../styles/pages/Dashboard/Application.module.scss';
import Header from '../../components/headers/Header';
import Job_Process from '../../components/dashboard/Job_Process';
import { Grid, Grid_Header } from '../../components/styles/Containers';
import Button_Main from '../../components/items/Button_Main';
import { application_status } from '../../tools/global_variables';
import Click_Modal from '../../components/items/Click_Modal';
import Edit_Icon from '../../components/items/Edit_Icon';
import Edit_Area from '../../components/inputs/Edit_Area';
import { interview_icons } from '../../tools/global_variables';

function Application (props) {
    const data = props.data;
    const [notes, set_notes] = useState("");
    const [edit, set_edit] = useState(false);
    console.log(data)


    const _interview = (
        <div className={styles.interview}></div>
    );
    
    const save_handler = (name, entry) => {
        console.log(name)
        console.log(entry)
    };

    

    return (

            <>
            <Header name="Application" id={data.application_id} >{data.job_data.title}</Header>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div>
                        <h4>Status: <span class="bold dark">{application_status[data.status]}</span></h4>
                        <p>Hi, Anna! {data.message}</p>
                    </div>
                    <div className={styles.interviews}>
                        <h4>Interviews</h4>
                        <div className={styles.interviews__items}>
                            <div className={styles.interviews__item}>{interview_icons[0]}</div>
                        </div>
                    </div>
                </section>
                <section className={styles.details}>
                    <div>
                        <h4>Job Details</h4>
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
                        <h4>Contact Details</h4>
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