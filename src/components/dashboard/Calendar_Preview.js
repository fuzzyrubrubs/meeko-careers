import styles from '../../styles/components/dashboard/Calendar_Preview.module.scss';
import { interview_types } from '../../tools/global_variables';

function Calendar_Preview (props) {
    const data = props.data;
    const colors = ['#7d7ddc','#fd8567','#f5a002','#69b996','#ff6688','#e66e50'];

    return (
        <div onClick={() => props.select()} className={styles.calendar__item}>
            <h4>{data.time}</h4>
            <span style={{backgroundColor: colors[data.type]}}></span>
            <div>
                <small>{interview_types[data.type]}</small>
                <p>{data.name}</p>
            </div>
        </div>
    )
};

export default Calendar_Preview;