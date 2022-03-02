import styles from '../../../styles/pages/Dashboard/Panel/Profile.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth.context';
import { IoMdNotificationsOutline, IoMdLogOut, IoIosArrowBack } from "react-icons/io";
import { FaTasks, FaUsers } from "react-icons/fa";

function Profile (props) {
    const { user_data, all_ids } = useContext(AuthContext);

    return (
        <main className={styles.profile}>
            <section className={styles.profile__section_1}>
                <img src={user_data.avatar} />
                <h4>{user_data.name}</h4>
                <small>Applicant</small>
            </section>

            <section className={styles.profile__section_2}>
                <div className={styles.profile__section_2__item} onClick={() => props.set_selected(1)}>
                    <FaTasks />
                    <p class="bold">Tasks</p>
                    <small>14 pending tasks</small>
                </div>
                <div className={styles.profile__section_2__item}>
                    <FaTasks />
                    <p class="bold">Messages</p>
                    <small>2 unread messages</small>
                </div>
                <div className={styles.profile__section_2__item}>
                    <FaTasks />
                    <p class="bold">Calender</p>
                    <small>14 podcasts</small>
                </div>
            </section>

            <section className={styles.profile__section_3}>
                Next Calender Event
            </section>

            <section className={styles.profile__section_4}>
                <div><IoMdLogOut /></div>
                <div><IoMdLogOut /></div>
            </section>
        </main>
    );
};

export default Profile;

