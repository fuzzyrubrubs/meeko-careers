import styles from '../../../styles/pages/Dashboard.module.scss';
import Text_Input from '../../../components/inputs/Text_Input';
import Button_Main from '../../../components/items/Button_Main';
import Radio_Input from '../../../components/inputs/Radio_Input';
import Salary_Input from '../../../components/inputs/Salary_Input';
import Textarea_Input from '../../../components/inputs/Textarea_Input';
import { useContext, useState } from 'react';
import Requirements from '../../../components/dashboard/Requirements';
import Selection from '../../../components/inputs/Selection';
import { job_categories, job_hours, job_location } from '../../../tools/global_variables';
import { create_job } from '../../../firebase/methods/Job_Functions';
import generatePushID from '../../../tools/IDGenerator';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Add_Managers from '../../../components/dashboard/Add_Managers';
import Interview_Input from '../../../components/inputs/Interview_Input';
import { AuthContext } from '../../../contexts/Auth.context';


function Create_Job (props) {
    const { user_data } = useContext(AuthContext);
    const [title, set_title] = useState("");
    const [salary, set_salary] = useState(0);
    const [interviews, set_interviews] = useState([]);
    const [company, set_company] = useState(null);
    const [category, set_category] = useState(0);
    const [location, set_location] = useState(0);
    const [hours, set_hours] = useState(0);
    const [about, set_about] = useState("");
    const [min_skills, set_min_skills] = useState([]);
    const [pref_skills, set_pref_skills] = useState([]);
    const [info, set_info] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);
    const [managers, set_managers] = useState([{name: user_data.name, avatar: user_data.avatar, id: user_data.id, email: user_data.email}]);
    const [invited_managers, set_invited_managers] = useState([]);

    const save_handler = () => {
        set_loader(true);
        const id = generatePushID();
        const formatted_managers = managers.map(item => ({id: item.id}));
        const formatted_invited_managers = invited_managers.map(item => ({email: item.email}));

        try {
            create_job({id: id, title: title, salary: salary, company_id: company, company_name: null, category: category, location: location, hours: hours, about: about, min_skills: min_skills, pref_skills: pref_skills, info: info, managers: formatted_managers, invited_managers: formatted_invited_managers})
            set_loader(false);
            set_status("Created");
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    }

    return (
        <main>
        <Dashboard_Header back_handler={() => props.go_back()}>Create Job</Dashboard_Header>
             <section className={styles.form}>
                 <div className={styles.form__wrapper}>
                    <Text_Input value={title} input={set_title}>Job title</Text_Input>
                    <Salary_Input value={salary} input={set_salary}>Salary</Salary_Input>
                 </div>
                <Interview_Input value={interviews} input={set_interviews} />
                <Add_Managers value={managers} input={set_managers} invited_value={invited_managers} invited_input={set_invited_managers}>Managers</Add_Managers>
                {/* <Selection value={company} input={set_company} options={props.companies}></Selection> */}
                <Radio_Input value={category} input={set_category} options={job_categories}>Category</Radio_Input>
                <Radio_Input value={location} input={set_location} options={job_location}>Location</Radio_Input>
                <Radio_Input value={hours} input={set_hours} options={job_hours}>Hours</Radio_Input>
                <Textarea_Input value={about} input={set_about}>About the job</Textarea_Input>
                <Requirements value={min_skills} input={set_min_skills}>Minimum requirements</Requirements>
                <Requirements value={pref_skills} input={set_pref_skills}>Preffered requirements</Requirements>
                <Textarea_Input value={info} input={set_info}>Additional Information</Textarea_Input>
                <Button_Main loader={loader} action={save_handler}>Create</Button_Main>
                <p>{status}</p>
                </section>
            </main>
    )
}

export default Create_Job;