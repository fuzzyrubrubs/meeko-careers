import styles from '../../styles/pages/Dashboard/Nav.module.scss';
import { useState, useEffect, useContext } from 'react';

import { IoMdNotificationsOutline, IoMdLogOut, IoIosArrowBack } from "react-icons/io";
import { FaTasks, FaUsers } from "react-icons/fa";
import { Link, useHistory } from 'react-router-dom';


function Nav () {
    const [selected, set_selected] = useState(0);
    const history = useHistory();

    const url = history.location.pathname;

    return ( 
        <div className={styles.navigation}>
            <Link to="/" className={styles.navigation__logo}></Link>
            <div className={styles.navigation__menu}>
                <Link to="/" className={`${styles.navigation__menu__item}`}>Home</Link>
                <Link to="/jobs" className={`${styles.navigation__menu__item}`}>Find Jobs</Link>
                <Link to="/dashboard" className={`${styles.navigation__menu__item} ${styles.navigation__menu__item__active}`}>Dashboard</Link>
                <Link to="/portfolio" className={`${styles.navigation__menu__item}`}>Portfolio</Link>
            </div>
            <div className={styles.navigation__notes}><IoMdNotificationsOutline /></div>
        </div>
    )
}

export default Nav;