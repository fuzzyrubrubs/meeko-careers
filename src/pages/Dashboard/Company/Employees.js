import styles from '../../../styles/pages/Dashboard/Company/Employees.module.scss';
import { useState } from 'react';
import Employee from './Employee';
import Click_Modal from '../../../components/items/Click_Modal';
import Onboarding from '../../../components/dashboard/Company/Onboarding';
import Add_Button from '../../../components/buttons/Add';
import { Column } from '../../../tools/global_components';
import Employee_Preview from '../../../components/previews/Employee';
import Recruitment_Preview from '../../../components/previews/Recruitment';


function Employees (props) {
    const data = props.data;
    const [profile, set_profile] = useState(false);
    const [employees, set_employees] = useState(props.employees);

    const select_handler = (data) => set_profile(data);
    const go_back = () => set_profile(false);


    const main = (
        <main>
            <small>{data.employees.length} Employees</small>
            <Column marginTop={2}>
                <div className={styles.key}>
                    <small>Position</small>
                    <small>Status</small>
                    <small>Salary</small>
                    <small>Tasks</small>
                    <small>Activity</small>
                </div>
                {employees.map(item =>  <Employee_Preview data={item} select={select_handler} /> )}
                {data.posts.map(item => <Recruitment_Preview data={item} /> )}
                <Click_Modal content={<Add_Button>Add</Add_Button>}><Onboarding data={data} /></Click_Modal>
            </Column>
        </main>
    );

    return profile ? <Employee data={profile} job_data={data} go_back={go_back} /> : main;
};

export default Employees;




