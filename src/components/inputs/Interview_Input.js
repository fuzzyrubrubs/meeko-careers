import styles from '../../styles/components/inputs/Inputs.module.scss';
import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import Modal from '../UI/Modal';
import Radio_Input from './Radio_Input';
import Button_Main from '../items/Button_Main';
import Textarea_Input from './Textarea_Input';
import Text_Input from './Text_Input';

function Interview_Input (props) {
    const data = props.value;
    const [open_create, set_open_create] = useState(false);
    const [type, set_type] = useState(0)
    const [duration, set_duration] = useState(0)
    const [contact, set_contact] = useState("")
    const [description, set_description] = useState("")

    const types = ["Phone Call", "Video Call", "In Person", "Apptitude"];
    const times = ["15", "30", "60"]

    const add_handler = async () => {
        const obj = {type: type, duration: duration, contact: contact, description: description}
        props.input([...data, obj]);
        set_open_create(false);
        set_duration(0);
        set_type(0);
        set_contact("");
        set_description("");
    };

    const create_interview = (
        <section className={styles.interviews__modal}>
            <div className={styles.interviews__display}>
                <h5>{types[type]}</h5>
                <h5>{times[duration]}</h5>
                <h5>{contact}</h5>
                <h5>{description}</h5>
            </div>
            <div className={styles.interviews__form}>
                <h5>Create Interview</h5>
                <Radio_Input value={type} input={set_type} options={types}>Type</Radio_Input>
                <Radio_Input value={duration} input={set_duration} options={times}>Duration</Radio_Input>
                <Text_Input value={contact} input={set_contact}>Contact</Text_Input>
                <Textarea_Input value={description} input={set_description}>Description</Textarea_Input>
                <Button_Main action={add_handler}>Add</Button_Main>
            </div>
        </section>
    );

    return (
        <div className={styles.wrapper}>
            <label>Add Interview</label>
            <div className={styles.interviews__icon} onClick={() => set_open_create(true)}><IoIosAdd /></div>
            {data.map(item => <p>{item.description}</p>)}
            {open_create ? <Modal close={() => set_open_create(false)}>{create_interview}</Modal> : null}
        </div>
    )
}

export default Interview_Input;

