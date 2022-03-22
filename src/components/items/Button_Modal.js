import React, { useState } from 'react';
import styles from '../../styles/components/items/Button_Main.module.scss';
import Item_Loader from '../UI/Item_Loader';
import Modal from '../UI/Modal';

function Button_Modal(props){
    const [open_task, set_open_task] = useState(false);
    const data = props.data;

    // const content = [<Create_Task data={data} />, <Task data={data} />]
    
    return (
        <>
        <button className={styles.button} onClick={() => set_open_task(true)}>{props.name}</button>
        {open_task ? <Modal close={() => set_open_task(false)}>{props.children}</Modal> : null}
        </>
    )
}


export default Button_Modal;