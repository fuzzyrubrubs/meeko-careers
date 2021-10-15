import styles from '../../styles/pages/Dashboard/Dash_Home.module.scss';
import Button_Main from '../../components/items/Button_Main';
import { FaChevronRight } from "react-icons/fa";
import Notification from '../../components/items/Notification';

import { MdNotifications } from "react-icons/md";
import { Link } from 'react-router-dom';


function Dash_Home (props) {

    return (
        <main className={styles.home}>
            <section className={styles.home__header}>
                <div className={styles.home__header__content}>
                    <small>Hi, Anna</small>
                    <h2>Become the best version of yourself</h2>
                    <Button_Main size="12rem">Start</Button_Main>
                </div>
                <div className={styles.home__header__image}></div>
            </section>
            <section className={styles.home__main}>
                <div onClick={() => props.set_selected(1)} className={`${styles.home__main__box} ${styles.home__main__box_0}`}><span><h3>Setup Tasks</h3> <FaChevronRight /></span></div>
                <div onClick={() => props.set_selected(2)} className={`${styles.home__main__box} ${styles.home__main__box_1}`}><span><h3>Applications</h3> <FaChevronRight /></span></div>
                <div onClick={() => props.set_selected(3)} className={`${styles.home__main__box} ${styles.home__main__box_2}`}><span><h3>Messages</h3> <FaChevronRight /></span></div>
                <div onClick={() => props.set_selected(4)} className={`${styles.home__main__box} ${styles.home__main__box_3}`}><span><h3>Manage</h3> <FaChevronRight /></span></div>
            </section>


            <div className={styles.home__user}>
                <div className={styles.home__user__image}>
                    <img src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80" />
                </div>
                <h3>Anna Taylor</h3>
                <small>Applicant</small>
                <Link to="/portfolio" class="small_button">My Portfolio</Link>
            </div>

            <div className={styles.home__notifications}>
                <div className={styles.home__notifications__icon}><MdNotifications /></div>
                <div className={styles.home__notifications__list}>
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                </div>
            </div>

        </main>
        
    )
}

export default Dash_Home;