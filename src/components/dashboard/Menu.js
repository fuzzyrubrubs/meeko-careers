import styles from '../../styles/components/dashboard/Menu.module.scss';
import { IoMdLogOut, IoIosCheckmarkCircleOutline, IoMdCheckboxOutline } from "react-icons/io";
import { sign_out } from '../../firebase/methods/User_Functions';
import { useHistory } from 'react-router-dom';

import { AiOutlineHome } from "react-icons/ai";
import { FaTasks, FaUsers } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

function Menu (props) {
    //const options = ["Job Posts", "Company List", "Create Job", "Create Company"];
    const options = [<AiOutlineHome /> , <FaTasks />, <IoMdCheckboxOutline />, <FiMessageSquare />, <FaUsers />];
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