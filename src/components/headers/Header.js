import styles from '../../styles/components/headers/Header.module.scss';
import { FaTasks } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Header (props) {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    console.log(history)
    console.log(params)
    console.log(location)

    return (
        <section className={styles.header}>
            <div className={styles.header__title}>
                {props.name ? <h5>{props.name}</h5> : null}
                <h1>{props.children}</h1> 
            </div>
            {props.back ? null : <Link to="/dashboard/tasks" className={styles.icon}><FaTasks /></Link>} 
            {props.back ? null : <Link to="/dashboard/messages" className={styles.icon}><FiMessageSquare /></Link>} 
            {props.back ? <div onClick={() => history.goBack()} className={styles.icon}><IoCloseOutline /></div> : null} 
        </section>
    )
}

export default Header;