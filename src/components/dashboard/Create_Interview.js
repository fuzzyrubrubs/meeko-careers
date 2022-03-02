import { useContext, useState } from 'react';
import styles from '../../styles/pages/Dashboard/Create_Interview.module.scss';
import { useHistory } from 'react-router-dom';
import { interview_types } from '../../tools/global_variables';
import Button_Main from '../items/Button_Main';
import Check_Box from '../inputs/Check_Box';
import Add_Managers from './Add_Managers';
import { AuthContext } from '../../contexts/Auth.context';
import generatePushID from '../../tools/IDGenerator';
import { create_interview } from '../../firebase/methods/Job_Functions';
import { create_task } from '../../firebase/methods/User_Functions';

function Create_Interview (props) {
    const { user_data } = useContext(AuthContext)
    const data = props.data;
    const [managers, set_managers] = useState([{name: user_data.name, avatar: user_data.avatar, id: user_data.id, email: user_data.email}]);
    const [contact, set_contact] = useState("");

    const create_handler = () => {
        const interview_id = generatePushID();
        const task_id = generatePushID();

        const interview_item = {
            managers: managers,
            id: interview_id,
            type: data.interview_data.type,
            applicant: data.user_data.user_id,
            duration: data.interview_data.duration,
            job_id: data.job_data.job_id,
            company_id: data.job_data.company_id,
            contact: contact, 
            description: "",
        };
        const task_item = {
            id: interview_id,
            type: "interview"
        };

        try {
            create_interview(interview_item).then(res => res ? create_task(data.user_data.user_id, task_id, task_item, 7) : null);
        } catch(error) {
            alert("Error");
        }
    
    };


    return (
        <section className={styles.container}> 
            <div className={styles.display}>
                <div>Choose available timeslots for the candidate to choose from</div>
                <Check_Box>Send Email</Check_Box>
                <Check_Box>Send Text</Check_Box>
            </div>
            <div className={styles.form}>
                <h5>Arrange a {interview_types[data.interview_data.type]}</h5>
                <p>{data.interview_data.contact}</p>
                <p>Interviews: {user_data.name}</p>
                <p>30 min</p>
                <Button_Main action={create_handler}>Create</Button_Main>
            </div>
        </section>
    )
}

export default Create_Interview;
