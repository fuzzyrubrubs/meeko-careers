import styles from '../../styles/components/forms/Apply.module.scss';
import Button_Main from '../items/Button_Main';
import Text_Input from '../inputs/Text_Input';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { get_resume, upload_resume } from '../../firebase/methods/Storage_Functions';
import { update_my_profile } from '../../firebase/methods/User_Functions';
import Upload_Resume from '../portfolio/Upload_Resume';
import { interview_types } from '../../tools/global_variables';
import { create_application } from '../../firebase/methods/Applicant_Functions';
import generatePushID from '../../tools/IDGenerator';

function Apply (props) {
    const data = props.data;
    const [selected, set_selected] = useState(0);
    const { user_data, set_applications } = useContext(AuthContext);
    const [resume, set_resume] = useState(false);
    const [email, set_email] = useState(user_data.email);
    const [phone, set_phone] = useState(user_data.phone);
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");


    const close_modal = (e) => {
        if(e.target.className == "modal") {
            document.body.style.overflow = 'unset';
            props.close();
        }
    }

    const upload_resume_handler = async (file) => {
        try {
            await upload_resume(file, user_data.id);
            const data = await get_resume(user_data.id);
            await update_my_profile(user_data.id, {resume: data});
            set_resume(data);
        } catch(error) {
            alert("Error uploading resume")
        }
    };


    const contact_handler = async () => {
        set_selected(1)
    }


    const apply_handler = async () => {
        const application_id = generatePushID();
        set_loader(true);
        try {
            create_application(application_id, data.post_id, data.company_id, user_data.id, {email: email, phone: phone});
            set_applications(prev => [...prev, {application_id: application_id, company_id: data.company_id, user_id: user_data.id, post_id: data.id, stage: 0, email: email, phone: phone, closed: false}])
            set_loader(false);
            set_selected(2);
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    }

    const contact_info = (
        <div>
            <Text_Input value={email} input={set_email}>Email</Text_Input>
            <Text_Input value={phone} input={set_phone}>Phone Number</Text_Input>
        </div>
    );

    const review_portfolio = (
        <div className={styles.portfolio}>
            <img src={user_data.avatar} />
            <h5>{user_data.name}</h5>
            {user_data.resume === null && resume === false ? <Upload_Resume file={upload_resume_handler} /> : <a className={styles.portfolio__resume} href={user_data.resume || resume} download>View Resume</a>}
            
        </div>
    );

    const submitted = (
        <div>
            <h3>Application Sent</h3>
        </div>
    );

    
    const titles = ["Contact Information", "Contact Information", "Success"];
    const content = [contact_info, review_portfolio, submitted];
    const buttons = [<Button_Main loader={loader} size={"30rem"} action={contact_handler}>Next</Button_Main>, <Button_Main loader={loader} size={"30rem"} action={apply_handler}>Apply now</Button_Main>, <Button_Main size={"30rem"} action={() => props.close()}>Close</Button_Main>]

    return (
        <main className="modal" onClick={close_modal}>
            <section className={styles.apply} onClick={null}>
                <h5>{data.title} - ${data.salary}k</h5>
                <h3>{titles[selected]}</h3>
                {content[selected]}
                <small>{status}</small>
                {buttons[selected]}
            </section>
        </main>
    )
}

export default Apply;