import { IoIosAdd } from "react-icons/io";
import styles from '../../styles/components/buttons.module.scss';


function Add_Button (props) {
    
    const action_handler = () => {
        if(props.loader) return
        if(props.action) return props.action();
        return
    }

    return <div  onClick={() => action_handler()} className={styles.add}><IoIosAdd/><small>{props.children}</small></div>
}

export default Add_Button