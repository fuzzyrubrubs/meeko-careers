import styles from '../../styles/components/items/Portfolio_Entry.module.scss';

function Portfolio_Entry (props) {
    const data = props.data;
    return (
        <div className={styles.entry}>
            <h5>{data.job}</h5>
            <h5>{data.company}</h5>
            <h5>{data.start_date}</h5>
            <h5>{data.end_date}</h5>
        </div>
    )
}

export default Portfolio_Entry;