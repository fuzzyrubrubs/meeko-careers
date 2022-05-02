import React, { useState } from 'react';
import Text_Input_Alt from '../../../../components/inputs/Text_Input_Alt';
import Button_Main from '../../../../components/items/Button_Main';
import styles from '../../../../styles/pages/Dashboard/Company/Settings.module.scss';
import { form_header, form_selectable } from '../../../../tools/global_components';

function Invoice_Settings (props) {
    const data = props.data;
    const [frequency, set_frequency] = useState(null);
    const [availability, set_availability] = useState(null);
    const [message, set_message] = useState(null);
    const [selected, set_selected] = useState([]);

    //standard work station 
    //list of equipment array, see equipment they have on profile, employee request equipment 

    return (
        <main className={styles.modal}>
            <h2>Invoices</h2>
            <p class="bold">This will allow you to request and recieve invoices from your employees to view under the Invoices tab.</p>
            {form_header("Send to", "Select which of your employees you would like to be able to send you invoices.")}
            <div className={styles.grid__column}>
                {form_selectable(availability, 0, "All Employees", set_availability )}
                {form_selectable(availability, 1, "Select", set_availability )}
            </div>

            {availability === 1 ? <div className={styles.grid__row}>{data.employees.map(item => <Employeee data={item} />)}</div> : null}

            {form_header("Schedule", "We'll send out automatic requests at the end of each week/month if you'd like.")}
            <div className={styles.grid__column}>
                {form_selectable(frequency, 0, "Monthly", set_frequency )}
                {form_selectable(frequency, 1, "Weekly", set_frequency )}
                {form_selectable(frequency, 2, "Never", set_frequency )}
            </div>
            {form_header("Message", "We'll add this message on to every invoice request.")}
            <Text_Input_Alt value={message} input={message}>Message</Text_Input_Alt>

            <Button_Main>Save</Button_Main>
        </main>
    )
}

export default Invoice_Settings;


const Employeee = (props) => {
    const [select, set_selected] = useState(false);
    const data = props.data;

    const select_handler = () => {

    };

    return (
        <div className={styles.employee}>
            <p onClick={select_handler} class={data.invoice ? "bold" : null}>{data.user_data.name}</p>
        </div>
    )
}