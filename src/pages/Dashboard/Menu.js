import styles from '../../styles/pages/Dashboard/Menu.module.scss';
import { IoMdLogOut } from "react-icons/io";
import { sign_out } from '../../firebase/methods/User_Functions';
import { useHistory } from 'react-router-dom';

function Menu (props) {
    const options = ["Job Posts", "Company List", "Create Job", "Create Company"];
    const history = useHistory();

    const log_out = () => {
        try {
            sign_out();
            history.push('/')
        } catch(error) {
            
        }
    }

    return (
        <section className={styles.menu}>
            <div className={styles.logo}></div>
            <div className={styles.profile}>
                <div className={styles.profile__image}>
                    <img src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80" />
                </div>
                <h3>Anna Taylor</h3>
                <small>Software Developer</small>
            </div>
            <div className={styles.list}>
               {options.map((item, index) => <p className={props.selected === index ? styles.selected : null} onClick={() => props.select(index)}>{item}</p>)}
            </div>
            <div className={styles.action} onClick={log_out}>
                <IoMdLogOut />
                <small>Logout</small>
            </div>
            {/* <div className={styles.block}></div> */}
        </section>
    )
}

export default Menu;