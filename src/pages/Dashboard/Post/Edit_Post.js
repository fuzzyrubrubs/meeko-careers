
import styles from '../../../styles/pages/Dashboard/Post/Edit_Post.module.scss';

// import styles from '../../../styles/pages/Dashboard/Form.module.scss';
import Text_Input from '../../../components/inputs/Text_Input';
import Button_Main from '../../../components/items/Button_Main';
import Radio_Input from '../../../components/inputs/Radio_Input';
import Salary_Input from '../../../components/inputs/Salary_Input';
import Textarea_Input from '../../../components/inputs/Textarea_Input';
import { useContext, useState } from 'react';
import Requirements from '../../../components/dashboard/Requirements';
import Selection from '../../../components/inputs/Selection';
import { job_categories, job_hours, job_remote } from '../../../tools/global_variables';
import { create_post } from '../../../firebase/methods/Post_Functions';
import generatePushID from '../../../tools/IDGenerator';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Add_Managers from '../../../components/dashboard/Add_Managers';
import { AuthContext } from '../../../contexts/Auth.context';
import { useHistory } from 'react-router-dom';

function Create_post (props) {
    const data = props.data;
    const { user_data } = useContext(AuthContext);
    const [title, set_title] = useState(data.title);
    const [salary, set_salary] = useState(data.salary);
    const [company, set_company] = useState(null);
    const [category, set_category] = useState(data.category);
    const [location, set_location] = useState(data.location);
    const [remote, set_remote] = useState(data.remote);
    const [hours, set_hours] = useState(data.hours);
    const [about, set_about] = useState(data.about);
    const [min_skills, set_min_skills] = useState(data.min_skills);
    const [pref_skills, set_pref_skills] = useState(data.pref_skills);
    const [info, set_info] = useState(data.info);
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);
    const [managers, set_managers] = useState([{name: user_data.name, avatar: user_data.avatar, id: user_data.id, email: user_data.email}]);

    const history = useHistory();

    const save_handler = () => {
        // set_loader(true);
        // const id = generatePushID();
        // const formatted_managers = managers.map(item => ({id: item.id}));
        // const formatted_invited_managers = invited_managers.map(item => ({email: item.email}));

        // try {
        //     create_post({id: id, title: title, salary: salary, company_id: company, company_name: null, category: category, location: location, hours: hours, about: about, min_skills: min_skills, pref_skills: pref_skills, info: info, managers: formatted_managers, invited_managers: formatted_invited_managers})
        //     set_loader(false);
        //     set_status("Created");
        //     history.push('/dashboard');

        // } catch(error) {
        //     set_status(error.message);
        //     set_loader(false);
        // }
    }


    return (
            <section className={styles.form}>

                 <div className={styles.form__wrapper}>
                    <Text_Input value={title} input={set_title}>Job title</Text_Input>
                    <Salary_Input value={salary} input={set_salary}>Salary</Salary_Input>
                 </div>
                {/* <Add_Managers value={managers} input={set_managers}>Managers</Add_Managers> */}
                <Radio_Input value={category} input={set_category} options={job_categories}>Category</Radio_Input>
                <Text_Input value={location} input={set_location}>Location</Text_Input>
                <Radio_Input value={remote} input={set_remote} options={job_remote}>Remote</Radio_Input>
                <Radio_Input value={hours} input={set_hours} options={job_hours}>Hours</Radio_Input>
                <Textarea_Input value={about} input={set_about}>About the job</Textarea_Input>
                <Requirements value={min_skills} input={set_min_skills}>Minimum requirements</Requirements>
                <Requirements value={pref_skills} input={set_pref_skills}>Preffered requirements</Requirements>
                <Textarea_Input value={info} input={set_info}>Additional Information</Textarea_Input>
                <Button_Main loader={loader} action={save_handler}>Save</Button_Main>
                <p>{status}</p>
            </section>
    )
}

export default Create_post;