import React, { useContext, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styles from '../../styles/components/UI/Navigation.module.scss';

import Register from "../forms/Register";
import Login from "../forms/Login";
import { AuthContext } from "../../contexts/Auth.context";

function Navigation (props) {
    const { user, user_data } = useContext(AuthContext);
    const [login_open, set_login_open] = useState(false);
    const [register_open, set_register_open] = useState(false);
    
    const url = props.location.pathname;

    if(url.includes("dashboard")) return null

    const open_handler = (num) => {
        document.body.style.overflow = "hidden";
        if(num === 0) { set_login_open(true); return }
        if(num === 1) { set_register_open(true); return }
    }

    const auth = (
        <>
        <h4 onClick={() => open_handler(0)} className={`${styles.navigation__menu__item} ${login_open ? styles.navigation__menu__item__active : null}`}>Login</h4>
        <h4 onClick={() => open_handler(1)} className={`${styles.navigation__menu__item} ${register_open ? styles.navigation__menu__item__active : null}`}>Register</h4>
        </>
    );

    const member = (
        <>
        <Link to="/portfolio" className={`${styles.navigation__menu__item} ${url === "/portfolio" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Portfolio</Link>
        <Link to="/dashboard" className={`${styles.navigation__menu__item} ${url === "/dashboard" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Dashboard</Link>
        </>
    );



    return (
        <>
        <div className={styles.navigation}>
            <div className={url === "/dashboard" ? null : styles.navigation__logo}></div>
            <div className={styles.navigation__menu}>
                <Link to="/" className={`${styles.navigation__menu__item} ${url === "/" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Home</Link>
                <Link to="/jobs" className={`${styles.navigation__menu__item} ${url === "/jobs" && login_open === false && register_open === false ? styles.navigation__menu__item__active : null}`}>Find Jobs</Link>
                {user ? member : auth}
            </div>
        </div>
        {register_open ? <Register close={() => set_register_open(false)} /> : null}
        {login_open ? <Login close={() => set_login_open(false)} /> : null}
        </>
    );
};

export default withRouter(Navigation);