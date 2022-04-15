import styles from '../../styles/components/inputs/Inputs.module.scss';

function Text_Input_Alt (props) {

    return (
        <div className={styles.number}>
            <input className={styles.number__input}  value={props.value} onChange={(e) => props.input(e.target.value)} />
            <label>{props.children}</label>
        </div>
    )
}

export default Text_Input_Alt;