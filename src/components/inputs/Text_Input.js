import styles from '../../styles/components/inputs/Inputs.module.scss';

function Text_Input (props) {

    if(!props.children) return <input className={styles.input} value={props.value} onChange={(e) => props.input(e.target.value)} />

    return (
        <div className={styles.wrapper}>
            <label>{props.children}</label>
            <input className={styles.input} value={props.value} onChange={(e) => props.input(e.target.value)} />
        </div>
    )
}

export default Text_Input;