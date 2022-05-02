import styles from '../../styles/components/previews/Employee.module.scss';
import { time_since } from '../../tools/DateTime_Methods';
import { Line } from '../../tools/global_components';


function Employee_Preview (props) {
    const data = props.data;
    console.log(data)

    const select_handler = () => {
        if(data.accepted) { props.select(data) }
    }

    return (
        <div onClick={select_handler} className={styles.preview}>  
            <div>
                <p className={styles.title}>{data.title}</p>
                <small>{data.accepted ? "Filled" : "Pending"}</small>
            </div>  
              
            <div className={styles.user}>
                <div className={styles.user__image} style={{"backgroundImage": `url(${data.user_data.avatar})`}}></div>
                <div>
                    <p className={styles.user__name}>{data.user_data.name}</p>
                    <small>{data.probation ? "Probation" : "Employee"}</small>
                </div>
            </div>

            <p class="bold">{data.salary}k</p>

            <Line>80</Line>

            <small>{time_since(data.user_data.activity)}</small>
            {/* <div className={styles.notification}></div> */}
        </div>
    )
};

export default Employee_Preview;