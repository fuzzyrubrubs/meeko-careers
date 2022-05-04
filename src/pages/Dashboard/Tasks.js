import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/headers/Header";
import Create_Invoice from '../../components/tasks/Create_Invoice';
import styles from '../../styles/pages/Dashboard/Tasks.module.scss';
import Click_Modal from '../../components/items/Click_Modal';
import Contract from '../../components/tasks/Contract';
import Task from '../../components/tasks/Task';
import { Column, Row } from '../../tools/global_components';

function Tasks (props) {
    const data = props.data;
    const location = useLocation();
    const [selected, set_selected] = useState(null);

    console.log(data)


    const task = (data) => {
        console.log(data)
        return (
            <div className={styles.task}>
                <p>{data.name} <span>3 days ago</span></p>
                <small>{data.message}</small>
            </div>
        );
    };

    const task_min = () => {
        const content = (
        <div className={styles.task_min}>
            <div>ICON</div>
            <div>
                <p className="bold">This is a task</p>
                <small>Here's some task information</small>
            </div>
        </div>
        )

        return (
            <Click_Modal content={content}>
                <Task />
            </Click_Modal>
            
        )
    }
    

    return (
        <>
       <Header name={location.state ? location.state.name : "All"} create={true} back={true}>Tasks</Header>
       <main className={styles.main}>
            <section className={styles.tasks}>
                <div className={styles.tasks__analytics}>
                    <div className={styles.tasks__analytics__item}></div>
                    <div className={styles.tasks__analytics__item}></div>
                </div>
                <Column gap={1.5}>
                    <h4>Recent Tasks</h4>
                    <Row gap={2}>
                        <small>Recent</small>
                        <small>Assigned</small>
                        <small>Productivity</small>
                        <small>History</small>
                    </Row>
                    <Column gap={1}>
                        {data.map(item => <Click_Modal content={task(item)}><Task /></Click_Modal>)}
                    </Column>
                </Column>
            </section>
            <section className={styles.today}>
                <h5>April 10, 2020</h5>
                <h4>Today's Tasks</h4>
                <Column gap={1}>
                    {task_min()}
                    {task_min()}
                    {task_min()}
                    {task_min()}
                </Column>
            </section>
        </main>
        </>
    )
}

export default Tasks;
