import React, { useContext } from 'react';
import styles from '../../styles/components/headers/Header.module.scss';
import { FaTasks, FaTimes } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdCreate } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MenuContext } from '../../contexts/Menu.context';
import Click_Modal from '../items/Click_Modal';
import Create from '../tasks/Create';

function Header (props) {
    const { hide_header } = useContext(MenuContext)
    const history = useHistory();
    const params = useParams();
    const location = useLocation();


    return hide_header ? null : (
        <section className={styles.header}>
            <div className={styles.header__title}>
                {props.name ? <h5>{props.name}</h5> : null}
                <h1>{props.children}</h1> 
            </div>
            {props.create ? <Click_Modal content={<div className={styles.icon}><IoMdCreate /></div>}><Create /></Click_Modal> : null}
            {props.back ? null : <Link to={{pathname: "/dashboard/tasks", state: {id: props.id, name: props.name}}} className={styles.icon}><FaTasks /></Link>} 
            {props.back ? null : <Link to="/dashboard/messages" className={styles.icon}><FiMessageSquare /></Link>} 
            {props.back ? <div onClick={() => history.goBack()} className={styles.icon}><FaTimes /></div> : null} 
        </section>
        );
}

export default Header;