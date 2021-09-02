import styles from '../../styles/components/items/Text_Input.module.scss';

function Text_Input (props) {

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{props.children}</label>
            <input className={styles.input} type="password" value={props.value} onChange={(e) => props.input(e.target.value)} />
        </div>
    )
}

export default Text_Input;