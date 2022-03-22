import { useState } from 'react';
import styles from '../../styles/components/portfolio/Portfolio_Entry.module.scss';
import Date_Input from '../inputs/Date_Input';
import Text_Input from '../inputs/Text_Input';
import Button_Main from '../items/Button_Main';

function Portfolio_Add_Entry (props) {
    const data = props.data;
    const [job, set_post] = useState("");
    const [company, set_company] = useState("");
    const [years, set_years] = useState("");
    const [months, set_months] = useState("");

    const add_handler = () => {
        props.input({...props.value, [props.type]: [...props.value[props.type], {job, company, years, months}] })
        props.save({job, company, years, months});
        set_post("");
        set_company("");
        set_years("");
        set_months("");
    }

    return (
        <>
        <div className={styles.form}>
            <Text_Input value={job} input={set_post}>Job title</Text_Input>
            <Text_Input value={company} input={set_company}>Company</Text_Input>
            <Date_Input years_value={years} years_input={set_years} months_value={months} months_input={set_months}>Duration</Date_Input>
        </div>
        <div className={styles.action}><Button_Main action={add_handler}>Add</Button_Main></div>
        </>
    )
}

export default Portfolio_Add_Entry;