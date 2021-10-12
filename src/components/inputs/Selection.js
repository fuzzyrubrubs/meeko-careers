import styles from '../../styles/components/inputs/Inputs.module.scss';

function Selection (props) {

    const options = props.options;

    return (
        <div className={styles.selection}>
            <label>Company</label>
            <select onChange={(e) => props.input(e.target.value)}>
                {options.map(item => <option value={item.id}>{item.name}</option>)}
            </select>
        </div>
    )
};

export default Selection;