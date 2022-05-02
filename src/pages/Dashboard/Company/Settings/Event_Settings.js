import React, { useState, useEffect } from 'react';
import Text_Input_Alt from '../../../../components/inputs/Text_Input_Alt';
import Button_Main from '../../../../components/items/Button_Main';
import styles from '../../../../styles/pages/Dashboard/Company/Settings.module.scss';
import { form_header, form_selectable } from '../../../../tools/global_components';

function Event_Settings (props) {
    const data = props.data;
    const [type, set_type] = useState(null);
    const [name, set_name] = useState("");
    const [groups, set_groups] = useState([]);

    useEffect(() => {
        const fetch_data = async () => {
            const i = await fetch("https://firestore.googleapis.com/v1/projects/forage-212715/databases/(default)/documents/groups")
            .then(response => response.json())
            .then(data => data.documents.map(item => item.fields));
            set_groups(i)
        }
        fetch_data()
    }, [])


    return (
        <main className={styles.modal}>
            <h2>Events</h2>
            <p class="bold">Events are integrated through Advently. After you post an event on Advently it will appear here on your calendar.</p>
            {form_header("Community Name", "Please enter the exact name of your Advently Community.")}
            <Text_Input_Alt value={name} input={set_name}>Name</Text_Input_Alt>

            <Button_Main>Save</Button_Main>
        </main>
    )
}

export default Event_Settings;
