import styles from '../../../../styles/pages/Dashboard/Company/Settings.module.scss';
import React, { useState } from 'react';
import Button_Main from '../../../../components/items/Button_Main';
import { Column, form_header, form_selectable, Modal, Row } from '../../../../tools/global_components';
import Text_Input_Alt from '../../../../components/inputs/Text_Input_Alt';


function Equipment_Settings (props) {
    const data = props.data;
    const [equipment, set_equipment] = useState([]);
    const [equipment_input, set_equipment_input] = useState("");

    //standard work station 
    //list of available equipment, add new equipment, see equipment they have on profile, employee request equipment 

    const remove_item = (index) => set_equipment(equipment.filter((item, i) => i !== index));

    return (
        <Modal width={50} height={85}>
            <h2>Equipment</h2>
            <p class="bold">Contracts will be set out as onboarding tasks</p>
            {form_header("Form", "Fill in all of the equipment you'd like to track.")}
            <Row gap={1}>
                <Text_Input_Alt value={equipment_input} input={set_equipment_input}>Equipment</Text_Input_Alt>
                <div className={styles.action}><Button_Main size={"10rem"} action={() => {set_equipment([...equipment, equipment_input]); set_equipment_input("");}}>Add</Button_Main></div>
            </Row>

            <Column gap={0.5}>
                {equipment.map((item, index) => <p onClick={() => remove_item(index)} class="bold medium">- {item}</p>)}
            </Column>
            <Button_Main>Save</Button_Main>
        </Modal>
    );
};

export default Equipment_Settings;
