import React, { useState } from 'react';
import Button_Main from '../../items/Button_Main';
import styles from '../../../styles/components/dashboard/company/Onboarding.module.scss';
import Add_Managers from '../Add_Managers';
import Text_Input_Alt from '../../inputs/Text_Input_Alt';
import Make_Offer from '../Tasks/Make_Offer';
import Create_Post from '../../../pages/Dashboard/Main/Create_Post';
import { create_employee } from '../../../firebase/methods/Employee_Functions';
import generatePushID from '../../../tools/IDGenerator';


function Onboarding (props) {
    const data = props.data;
    const [selected, set_selected] = useState(0);
    const [user_data, set_user_data] = useState([]);
    const [position, set_position] = useState("");



    const add_employee = (item) => {
        const id = generatePushID();
        console.log(item)
        console.log(id, user_data[0].id, data.id, item)
        create_employee(id, user_data[0].id, data.id, item)
    };

    
    const main = (
        <section className={styles.onboard}>
            <div>
                <h3>Add an employee</h3>
                {user_data.length === 0 ? <Add_Managers value={user_data} input={set_user_data} invited_value={user_data} select={true} /> : (
                    <div className={styles.onboard__form}>
                        <img src={user_data[0].avatar} />
                        <h4 class="bold medium">{user_data[0].name}</h4>
                        <Text_Input_Alt value={position} input={set_position}>Position</Text_Input_Alt>
                        <Button_Main action={() => set_selected(1)}>Create Position</Button_Main>
                    </div>
                )}
            </div>
            <div>
                <h3>Start Recruitment</h3>
                <Button_Main action={() => set_selected(2)}>Create Post</Button_Main>
            </div>
        </section>
    )
    const content = [main, <Make_Offer action={(e) => add_employee(e)} user_data={user_data[0]} job_data={{title: position, company_name: data.name}} />, <section className={styles.post}><Create_Post  companies={[data.id]} /></section>]

    return content[selected]
};

export default Onboarding;

