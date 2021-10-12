import styles from '../../styles/components/inputs/Inputs.module.scss';

function Textarea_Input (props) {

    return (
        <div className={styles.wrapper}>
            <label>{props.children}</label>
            <textarea className={styles.textarea} value={props.value} onChange={(e) => props.input(e.target.value)} />
        </div>
    )
}

export default Textarea_Input;