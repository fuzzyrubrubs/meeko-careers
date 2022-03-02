import { useState } from 'react';
import styles from '../../styles/pages/Dashboard/Create_Task.module.scss';
import { useHistory } from 'react-router-dom';
import { interview_types } from '../../tools/global_variables';
import Button_Main from '../items/Button_Main';

function Modal (props) {

    const close_modal = (e) => {
        if(e.target.className == "modal") {
            document.body.style.overflow = 'unset';
            props.close();
        };
    };


    return (
        <main className="modal" onClick={close_modal}>
            {props.children}
        </main>
    )
}

export default Modal;
