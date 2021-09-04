import styles from '../styles/pages/Portfolio.module.scss';
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdWebAsset } from "react-icons/md";
import Edit_Icon from '../components/items/Edit_Icon';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import Edit_Input from '../components/items/Edit_Input';
import Portfolio_Add_Entry from '../components/items/Portfolio_Add_Entry';
import Portfolio_Entry from '../components/items/Portfolio_Entry';
import { update_my_profile } from '../firebase/methods/User_Functions';
import Button_Main from '../components/items/Button_Main';
import Portfolio_Edit_Summary from '../components/items/Portfolio_Edit_Summary';
import { upload_avatar, get_avatar, upload_resume, get_resume } from '../firebase/methods/Storage_Functions';
import Upload_Image from '../components/items/Upload_Image';
import Upload_Resume from '../components/items/Upload_Resume';


function Portfolio (props) {
    const user_data = props.user_data;
    const [edit_profile, set_edit_profile] = useState(false);
    const [edit_summary, set_edit_summary] = useState(false);
    const [edit_experience, set_edit_experience] = useState(false);
    const [edit_education, set_edit_education] = useState(false);
    const [user_info, set_user_info] = useState(props.user_data);
    const [avatar, set_avatar] = useState(props.user_data.avatar);
    const [preview, set_preview] = useState(props.user_data.avatar);
    const [resume, set_resume] = useState(props.user_data.resume);

    const upload_handler = async () => {
        await upload_avatar(avatar, user_data.id);
        return await get_avatar(user_data.id);
    };

    const upload_resume_handler = async (file) => {
        await upload_resume(resume, user_data.id);
        const data = await get_resume(user_data.id);
        set_resume(data);
        return data;
    };

    const save_profile = async () => {
        const resume_data = resume !== user_data.resume ? await upload_resume_handler() : resume;
        const avatar_data = avatar !== user_data.avatar ? await upload_handler() : avatar;
        await update_my_profile(user_data.id, {title: user_info.title, linkedIn: user_info.linkedIn, website: user_info.website, avatar: avatar_data, resume: resume_data})
    };
    const save_summary = (data) => update_my_profile(user_data.id, {summary: data});
    const save_experience = (data) => update_my_profile(user_data.id, {experience: [...user_info.experience, data]});
    const save_education = (data) => update_my_profile(user_data.id, {education: [...user_info.education, data]});


    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__user}>
                    <div className={styles.profile__user__edit}><Edit_Icon value={edit_profile} toggle={set_edit_profile} /></div>
                    {edit_profile ?  <Upload_Image value={preview} preview={(e) => set_preview(e)} file={set_avatar} /> : <img className={styles.profile__avatar} src={preview} />} 
                    <h3>{user_info.name}</h3>
                    <p>{edit_profile ? <Edit_Input value={user_info} placeholder="Add job title" input={set_user_info} name="title" /> : user_info.title}</p>
                </div>
                <div className={styles.profile__details}>
                    <p><FiMail /> {user_info.email}</p>
                    {edit_profile || user_info.linkedIn ? <p><FaLinkedin /> {edit_profile ? <Edit_Input value={user_info} placeholder="Add linkedIn" input={set_user_info} name="linkedIn" /> : user_info.linkedIn }</p> : null}
                    {edit_profile || user_info.website ? <p><MdWebAsset /> {edit_profile ? <Edit_Input value={user_info} placeholder="Add website" input={set_user_info} name="website" /> : user_info.website || "Add website" }</p> : null}
                </div>
                {edit_profile ? <Upload_Resume file={set_resume} /> : <a href={resume} download>Resume</a>}
                {edit_profile ? <div className={styles.profile__action}><Button_Main action={() => {save_profile(); set_edit_profile(false)}}>Save</Button_Main></div> : null}
            </section>
            <section className={styles.resume}>
                <div>
                    <h3>Professional Summary<Edit_Icon value={edit_summary} toggle={set_edit_summary} /></h3>
                    {edit_summary ? <Portfolio_Edit_Summary close={set_edit_summary} save={save_summary} value={user_info} input={set_user_info}  /> : <p>{user_info.summary}</p>}
                </div>
                <div>
                    <h3>Work Experience<Edit_Icon value={edit_experience} toggle={set_edit_experience} /></h3>
                    {edit_experience ? <Portfolio_Add_Entry save={save_experience} value={user_info} input={set_user_info} type={'experience'} /> : null}
                    {user_info.experience.map(item => <Portfolio_Entry data={item} type={'experience'} />)}
                </div>
                <div>
                    <h3>Education<Edit_Icon value={edit_education} toggle={set_edit_education} /></h3>
                    {edit_education ? <Portfolio_Add_Entry save={save_education} value={user_info} input={set_user_info} type={'education'} /> : null}
                    {user_info.education.map(item => <Portfolio_Entry data={item} type={'education'} />)}
                </div>
            </section>
        </main>
    );
};

export default Portfolio;