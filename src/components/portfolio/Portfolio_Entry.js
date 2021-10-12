import { delete_portfolio_entry } from '../../firebase/methods/User_Functions';
import styles from '../../styles/components/portfolio/Portfolio_Entry.module.scss';

import { IoIosCalendar } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";

function Portfolio_Entry (props) {
    const data = props.data;

    const delete_handler = () => {
        //delete_portfolio_entry(props.user_id, props.data, props.type);
        const update = props.value[props.type].filter(item => item.job !== data.job && item.company !== data.company && item.months !== data.months);
        props.input({...props.value, [props.type]: update });
    };


    return (
        <>
        <div className={styles.entry}>
            <h4 className={styles.entry__title}>{data.job}</h4>
            <div className={styles.entry__wrapper}>
                <small><FaRegBuilding /> {data.company}</small>
                <small><IoIosCalendar /> {data.years > 0 ? `${data.years} years` : null} {data.months > 0 ? `${data.months} months` : null}</small>
            </div>
         {props.allow_delete ? <div className={styles.delete} onClick={delete_handler}>Delete</div> : null}
        </div>
        </>
    )
}

export default Portfolio_Entry;