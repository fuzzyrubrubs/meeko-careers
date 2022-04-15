import Toggle from '../../../components/inputs/Toggle';
import styles from '../../../styles/pages/Dashboard/Company/Settings.module.scss';

function Settings (props) {
    const data = props.data;

    const update_handler = (change) => {
        // (data.id, change)
    };

    const equipment_modal = (
        <section>
            <h1>Equipment</h1>
        </section>
    );

    return (
        <main className={styles.settings}> 
            <section>
                <h3>Features</h3>
                <Toggle id={data.id} name="rota" value={data.rota} data={data.rota_data}>Rota</Toggle>
                <Toggle id={data.id} name="equipment" value={data.equipment} data={data.equipment_data}>{equipment_modal}</Toggle>
                <Toggle id={data.id} name="contracts" value={data.equipment} data={data.equipment_data}>{equipment_modal}</Toggle>
                <Toggle id={data.id} name="invoices" value={data.equipment} data={data.equipment_data}>{equipment_modal}</Toggle>
            </section>
        </main>
    );
};

export default Settings;