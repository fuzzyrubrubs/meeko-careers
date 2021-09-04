import { useState } from 'react';
import styles from '../../styles/components/items/Portfolio_Entry.module.scss';
import Text_Input from './Text_Input';
import Button_Main from './Button_Main';

function Portfolio_Add_Entry (props) {
    const data = props.data;
    const [job, set_job] = useState("");
    const [company, set_company] = useState("");
    const [start_date, set_start_date] = useState("");
    const [end_date, set_end_date] = useState("");

    const add_handler = () => {
        props.input({...props.value, [props.type]: [...props.value[props.type], {job, company, start_date, end_date}] })
        props.save({job, company, start_date, end_date});
    }

    return (
        <>
        <div className={styles.entry}>
            <Text_Input value={job} input={set_job}>Job title</Text_Input>
            <Text_Input value={start_date} input={set_start_date}>Start date</Text_Input>
            <Text_Input value={company} input={set_company}>Company</Text_Input>
            <Text_Input value={end_date} input={set_end_date}>End date</Text_Input>
        </div>
        <div className={styles.action}><Button_Main action={add_handler}>Add</Button_Main></div>
        </>
    )
}

export default Portfolio_Add_Entry;