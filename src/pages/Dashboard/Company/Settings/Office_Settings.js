import React, { useState } from 'react';
import Check_box from '../../../../components/inputs/Check_Box';
import Text_Input_Alt from '../../../../components/inputs/Text_Input_Alt';
import Button_Main from '../../../../components/items/Button_Main';
import styles from '../../../../styles/pages/Dashboard/Company/Settings.module.scss';
import { form_header, form_selectable } from '../../../../tools/global_components';

function Office_Settings (props) {
    const data = props.data;
    const [type, set_type] = useState(null);
    const [address, set_address] = useState("");
    const [panel, set_panel] = useState(false);
    const [monday, set_monday] = useState({open: "9:00", close: "17:00"})

    return (
        <main className={styles.modal}>
            <h2>Office</h2>
            <p class="bold">Office settings enable you to set office hours and an office rota.</p>
            {form_header("Office Address", "Fill in your Office's address.")}
            <Text_Input_Alt value={address} input={set_address}>Address</Text_Input_Alt>
            {form_header("Office Rota", "Select whether employees can add and remove themselves from the rota.")}
            <div className={styles.grid__column}>
                {form_selectable(type, 0, "Allow", set_type )}
                {form_selectable(type, 1, "Deny", set_type )}
            </div>
            {form_header("Reminders", "Do you want to send reminders each week?")}
            <Check_box>Reminders</Check_box>
            {form_header("Office Hours", "Set when the office opens and closes.")}
            <div className={styles.grid__column}>
                {form_selectable(type, 0, "Monday", set_type )}
                {form_selectable(type, 1, "Tuesday", set_type )}
                {form_selectable(type, 1, "Wednesday", set_type )}
                {form_selectable(type, 1, "Thursday", set_type )}
                {form_selectable(type, 1, "Friday", set_type )}
                {form_selectable(type, 1, "Saturday", set_type )}
                {form_selectable(type, 1, "Sunday", set_type )}
            </div>
            <Button_Main>Save</Button_Main>
        </main>
    )
}

export default Office_Settings;
