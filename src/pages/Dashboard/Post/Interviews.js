import styles from '../../../styles/pages/Dashboard/Post/Interviews.module.scss';
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { Grid_Row } from '../../../components/styles/Containers';
import { colors, interview_duration, interview_status, interview_types } from '../../../tools/global_variables';
import Calendar_Preview from '../../../components/dashboard/Calendar_Preview';
import Click_Modal from '../../../components/items/Click_Modal';
import View_Interview from '../../../components/dashboard/Tasks/View_Interview';
import Check_Box from '../../../components/inputs/Check_Box';



const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;

function Interviews (props) {
    const data = props.data;
    const [selected, set_selected] = useState(null);
    const interviews = data.interviews;

    // const interview_status = ["Cancelled", "Expired", "Pending", "Upcoming", "Finished", "Complete"];

    const format_list = () => {
        
    }

    const categories = ["Schedueled", "Pending", "Complete", "Cancelled"]

    
    const filter_handler = (selected) => {
        if(selected === null) return interviews
        return interviews.filter(item => {
            if (selected === 0) return item.status === 3 || item.status === 4;
            if (selected === 1) return item.status === 2
            if (selected === 2) return item.status === 6
            if (selected === 3) return item.status === 0 || item.status === 1
        })
    }


    const main = (
        <main className={styles.main}>
            <section className={styles.menu}>
                {categories.map((item, index) => <div className={`${styles.menu__item} ${selected === index ? styles.menu__item__active : null}`} onClick={() => set_selected(index)}><p>{item}</p>{filter_handler(index).length > 0 ? <p className={styles.menu__item__icon}>{filter_handler(index).length}</p> : null }</div>)}
            </section>
            <section className={styles.interviews}>
                <h2>{selected === null ? "All" : categories[selected]}</h2>
                <div className={styles.interviews__list}>
                    {filter_handler(selected).map(item => <Candidate_Preview data={item} applicant={data.candidates.filter(user => user.user_id === item.applicant)[0]} />)}
                </div>
            </section>
            <section className={styles.calender}>
                <h4 className={styles.calender__header}>Calendar</h4>
                <List>
                    {data.interviews.map(item => <Calendar_Preview data={item} applicant={data.candidates.filter(user => user.user_id === item.applicant)[0]} />)}
                </List>
            </section>
        </main>
    )

    return main
};

export default Interviews;


function Candidate_Preview (props) {
    const data = props.data;
    const applicant = props.applicant;

    const content = (
        <div className={styles.preview}>
            <span>
                <div className={styles.preview__image} style={{"backgroundImage": `url(${applicant.user_data.avatar})`, "border": `2px solid ${colors[data.type]}`}}></div>
                 <p class="bold">{applicant.user_data.name}</p>
            </span>
            <small>{interview_status[data.status]}</small>
            <small>{interview_types[data.type]}</small>
            <small>{interview_duration[data.duration]}</small>
            {/* <small>{time_since(data.timestamp)}</small> */}
        </div>
    )

    return <Click_Modal content={content}><View_Interview data={data} user_data={applicant.user_data} /></Click_Modal>
};

