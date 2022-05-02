import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/headers/Header";
import Create_Invoice from '../../components/tasks/Create_Invoice';
import styles from '../../styles/pages/Dashboard/Tasks.module.scss';
import Click_Modal from '../../components/items/Click_Modal';
import Contract from '../../components/tasks/Contract';

function Tasks (props) {
    const data = props.data;
    const location = useLocation();
    const [selected, set_selected] = useState(null);


    const task = (data) => {
        console.log(data)
        return (
            <div className={styles.task}>
                <p>Create Invoice <span>3 days ago</span></p>
                <small>Advently have sent your their monthly request to send them an invoice</small>
            </div>
        );
    };
    

    return (
        <>
       <Header name={location.state ? location.state.name : "All"} back={true}>Tasks</Header>
       <main className={styles.main}>
            <section className={styles.tasks}>
                <div className={styles.tasks__list}>
                    {data.map(item => <Click_Modal content={task(item)}><Create_Invoice /></Click_Modal>)}
                </div>
            </section>
        </main>
        </>
    )
}

export default Tasks;
