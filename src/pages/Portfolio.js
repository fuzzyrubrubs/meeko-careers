import styles from '../styles/pages/Portfolio.module.scss';
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdWebAsset } from "react-icons/md";
import Edit_Icon from '../components/items/Edit_Icon';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import Edit_Input from '../components/items/Edit_Input';


function Portfolio () {
    const { user_data } = useContext(AuthContext);
    const [edit_profile, set_edit_profile] = useState(false);
    const [edit_summary, set_edit_summary] = useState(false);
    const [edit_experience, set_edit_experience] = useState(false);
    const [edit_education, set_edit_education] = useState(false);
    const [user_info, set_user_info] = useState(user_data);
   
    useEffect(() => {
        set_user_info(user_data);
    }, [user_data])

    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__user}>
                    <div className={styles.profile__user__edit}><Edit_Icon value={edit_profile} toggle={set_edit_profile} /></div>
                    <img className={styles.profile__avatar} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    <h3>{user_info.name}</h3>
                    <p>{edit_profile ? <Edit_Input value={user_info.title} placeholder="Add job title" input={set_user_info} name="title" /> : user_info.title}</p>
                </div>
                <div className={styles.profile__details}>
                    <p><FiMail /> {user_info.email}</p>
                    {edit_profile || user_info.linkedIn ? <p><FaLinkedin /> {edit_profile ? <Edit_Input value={user_info.linkedIn} placeholder="Add linkedIn" input={set_user_info} name="linkedIn" /> : user_info.linkedIn }</p> : null}
                    {edit_profile || user_info.website ? <p><MdWebAsset /> {edit_profile ? <Edit_Input value={user_info.website} placeholder="Add website" input={set_user_info} name="website" /> : user_info.website || "Add website" }</p> : null}
                </div>
                <div><p>Downnload Resume</p></div>
            </section>
            <section className={styles.resume}>
                <div>
                    <h3>Professional Summary<Edit_Icon value={edit_summary} toggle={set_edit_summary} /></h3>
                    <p></p>
                </div>
                <div>
                    <h3>Work Experience<Edit_Icon value={edit_experience} toggle={set_edit_experience} /></h3>
                </div>
                <div>
                    <h3>Education<Edit_Icon value={edit_education} toggle={set_edit_education} /></h3>
                </div>
            </section>
        </main>
    );
};

export default Portfolio;