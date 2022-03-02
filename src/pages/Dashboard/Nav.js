import styles from '../../styles/pages/Dashboard/Nav.module.scss';
import { useState, useEffect, useContext } from 'react';

import { IoMdNotificationsOutline, IoMdLogOut, IoIosArrowBack } from "react-icons/io";
import { FaTasks, FaUsers } from "react-icons/fa";
import { Link, useHistory } from 'react-router-dom';


function Nav () {
    const [selected, set_selected] = useState(0);
    const history = useHistory();

    return ( 
        <div className={styles.navigation}>
            <Link to="/" className={styles.navigation__logo}></Link>
            <div className={styles.navigation__menu}>
                <p class="bold" onClick={() => history.goBack()}>Home</p>
                <p class="bold" onClick={() => history.goBack()}>Find Jobs</p>
                <p class="bold" onClick={() => history.goBack()}>Dashboard</p>
                <p class="bold" onClick={() => history.goBack()}>Portfolio</p>
            </div>
            <div className={styles.navigation__notes}><IoMdNotificationsOutline /></div>
        </div>
    )
}

export default Nav;