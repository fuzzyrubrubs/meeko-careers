import styles from '../../styles/pages/Dashboard/Nav.module.scss';
import {  useContext } from 'react';
import { Link } from 'react-router-dom';

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { NotificationContext } from '../../contexts/Notification.context';


function Nav () {
    const { display_notes, set_display_notes } = useContext(NotificationContext);

    return ( 
        <div className={styles.navigation}>
            <Link to="/" className={styles.navigation__logo}></Link>
            <div className={styles.navigation__menu}>
                <Link to="/" className={`${styles.navigation__menu__item}`}>Home</Link>
                <Link to="/jobs" className={`${styles.navigation__menu__item}`}>Find Jobs</Link>
                <Link to="/portfolio" className={`${styles.navigation__menu__item}`}>Portfolio</Link>
                <Link to="/dashboard" className={`${styles.navigation__menu__item} ${styles.navigation__menu__item__active}`}>Dashboard</Link>
            </div>
            <div onClick={() => set_display_notes(!display_notes)} className={styles.navigation__notes}>{display_notes ? <IoCloseCircleOutline /> : <IoMdNotificationsOutline />}</div>
        </div>
    )
}

export default Nav;