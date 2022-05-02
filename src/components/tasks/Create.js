import styles from '../../styles/components/tasks/tasks.module.scss';
import { useState } from 'react';
import { Column, ColumnSpaced, form_header, form_selectable, Modal, Row } from "../../tools/global_components";
import Text_Input_Alt from '../inputs/Text_Input_Alt';
import Button_Main from '../items/Button_Main';
import Add_Button from '../buttons/Add';



function Create_Task (props) {
    const [type, set_type] = useState(null);
    const [steps, set_steps] = useState([]);
    const [adding, set_adding] = useState(false);

    console.log(type)

    const task = (data) => (
        <Row>
            <p>Step 1:</p>
            <p>Create Invoice</p>
        </Row>
    )

    return ( 
        <Modal height={80} width={50}>
            <h2>Assign Task</h2>
            <p class="bold">Use this to assign individual tasks.</p>
            <Column fixed={true} gap={1}>
                {form_header("Name", "Fill in the name of this task.")}
                <Text_Input_Alt>Name</Text_Input_Alt>
            </Column>
            <Column fixed={true} gap={1}>
                {form_header("Message", "Fill in the message for this task.")}
                <Text_Input_Alt>Message</Text_Input_Alt>
            </Column>

            <Column fixed={true} gap={1}>
                {form_header("Steps", "Fill in the steps for this task.")}
                {steps.map(item => task(item))}
                <Add_Button action={() => set_adding(!adding)}>Add</Add_Button>
            </Column>
            { adding ? 
                <div>
                <p>Add a Step</p>
                <Column gap={0.5}>
                    {form_selectable(type, 0, "Form", set_type)}
                    {form_selectable(type, 1, "Upload", set_type)}
                    {form_selectable(type, 2, "Offline", set_type)}
                    {form_selectable(type, 3, "Signature", set_type)}
                </Column>
                </div>
            : null }
            
            <Button_Main>Create</Button_Main>
        </Modal>
    );
};

export default Create_Task