import Status from '../../components/dashboard/Status';
import Notification from '../../components/items/Notification';
import styles from '../../styles/pages/Dashboard/Profile.module.scss';
import { MdNotifications } from "react-icons/md";

function Profile () {
    return (
        <section className={styles.profile}>
            <div className={styles.job}>
               <Status />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.icon}><MdNotifications /></div>
                <div className={styles.notifications}>
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                </div>
            </div>
        </section>
    )
}

export default Profile;