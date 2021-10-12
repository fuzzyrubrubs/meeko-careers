import styles from '../../styles/components/inputs/Inputs.module.scss';

function Salary_Input (props) {

    return (
        <div className={styles.salary__wrapper}>
            <label>{props.children}</label>
            <div className={styles.salary}>
                <small>$</small>
                <input className={styles.input} type="number" value={props.value} onChange={(e) => props.input(e.target.value)} />
                <small style={{width: "20rem"}}>k / per year</small>
            </div>
        </div>
    )
};

export default Salary_Input;