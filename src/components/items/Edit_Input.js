import styles from '../../styles/components/items/Text_Input.module.scss';

function Edit_Input (props) {

    return <input className={styles.edit_input} placeholder={props.placeholder} value={props.value[props.name]} onChange={(e) => props.input({...props.value, [props.name]: e.target.value})} />
}

export default Edit_Input;