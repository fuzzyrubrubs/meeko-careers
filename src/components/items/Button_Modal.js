import React, { useState } from 'react';
import styles from '../../styles/components/items/Button_Main.module.scss';
import Item_Loader from '../UI/Item_Loader';
import Modal from '../UI/Modal';
import Button_Main from './Button_Main';
import { IoAddOutline } from "react-icons/io5";

function Button_Modal(props){
    const [open_task, set_open_task] = useState(false);
    const type = props.type;
    const data = props.data;

    const content = [
        <Button_Main action={() => set_open_task(true)}>{props.name}</Button_Main>, 
        <div className={styles.icon} onClick={() => set_open_task(true)}><IoAddOutline /></div>
    ];

    return (
        <>
        {content[type]}
        {open_task ? <Modal close={() => set_open_task(false)}>{props.children}</Modal> : null}
        </>
    )
}


export default Button_Modal;