import React, { useState } from 'react';
import Text_Input_Alt from '../../../components/inputs/Text_Input_Alt';
import Toggle from '../../../components/inputs/Toggle';
import Button_Main from '../../../components/items/Button_Main';
import Click_Modal from '../../../components/items/Click_Modal';
import styles from '../../../styles/pages/Dashboard/Company/Settings.module.scss';
import Contract_Settings from './Settings/Contract_Settings';
import Equipment_Settings from './Settings/Equipment_Settings';
import Event_Settings from './Settings/Event_Settings';
import Invoice_Settings from './Settings/Invoice_Settings';
import Office_Settings from './Settings/Office_Settings';

function Settings (props) {
    const data = props.data;

    const update_handler = (change) => {
        // (data.id, change)
    };

    const add_handler = (data) => {
        console.log(data)
    }



    return (
        <main className={styles.settings}> 
            <section className={styles.settings__section}>
                <h3>Features</h3>
                <Toggle id={data.id} name="office" value={data.office}><Office_Settings /></Toggle>
                <Toggle id={data.id} name="contracts" value={data.contracts}><Contract_Settings /></Toggle>
                <Toggle id={data.id} name="invoices" value={data.invoices}><Invoice_Settings data={data} /></Toggle>
                <Toggle id={data.id} name="events" value={data.events}><Event_Settings /></Toggle>
                <Toggle id={data.id} name="equipment" value={data.equipment}><Equipment_Settings /></Toggle>
                {/* <Toggle id={data.id} name="equipment" value={data.equipment} data={data.equipment_data}><Equipment_Settings /></Toggle> */}
                {/* <Toggle id={data.id} name="Sick Leave" value={data.equipment} data={data.equipment_data}></Toggle>  */}
            </section>

            <section className={styles.settings__section}> 
                <h3>Employee Form</h3>
                <Toggle id={data.id} name="address" value={data.rota} data={data.rota_data}>Rota</Toggle>
                <Toggle id={data.id} name="bank information" value={data.equipment}></Toggle>
                <Toggle id={data.id} name="Tax Number" value={data.equipment}></Toggle>
                <Toggle id={data.id} name="Medical Insurance" value={data.equipment}>Medical Insurance</Toggle>
                <Click_Modal content={<p>Add</p>}><Add_Info action={add_handler} /></Click_Modal>
            </section>
        </main>
    );
};

export default Settings;


const Add_Info = (props) => {
    const [name, set_name] = useState("");
    const [type, set_type] = useState(null);
    const [options, set_options] = useState(null);

    return (
        <section className={styles.modal}>
            <h5>Create Employee Information</h5>
            <div>
                <p onClick={() => set_type(0)}>Text</p>
                <p onClick={() => set_type(1)}>Selection</p>
                <p onClick={() => set_type(2)}>Toggle</p>
            </div>
            {type === null ? null : <Text_Input_Alt value={name} input={set_name}>Name</Text_Input_Alt>}
            {type === 1 ? <p>Options</p> : null}
            {type === null ? null : <Button_Main action={() => props.action({name, type, options})}>Create</Button_Main>}
        </section>
    );
};
