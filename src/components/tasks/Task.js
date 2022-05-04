import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/headers/Header";
import Create_Invoice from '../../components/tasks/Create_Invoice';
import styles from '../../styles/components/tasks/tasks.module.scss';
import Click_Modal from '../../components/items/Click_Modal';
import Contract from '../../components/tasks/Contract';
import { Modal } from '../../tools/global_components';
import Button_Main from '../items/Button_Main';

function Task (props) {
    const data = props.data;
    const location = useLocation();
    const [selected, set_selected] = useState(null);
    

    return (
        <Modal>
            <h2 className={styles.task__header}>Task Name</h2>
            <h4>Status: Pending</h4>
            <p>Schedule: 24/05/2022 17:00</p>
            <p>This is the task message and it may be quite long.</p>
            <h4>1 Steps:</h4>
            <div className={styles.task__item}>
                <p>1.</p><p>This is the first step</p><p>Mark complete</p>
            </div>
            <p>Expires: in 4 days</p>
            <Button_Main>Complete</Button_Main>
        </Modal>
    )
}

export default Task;
