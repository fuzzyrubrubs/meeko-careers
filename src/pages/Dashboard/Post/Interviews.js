import styles from '../../../styles/pages/Dashboard/Interviews.module.scss';
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { Grid_Row } from '../../../components/styles/Containers';
import { interview_types } from '../../../tools/global_variables';
import Calendar_Preview from '../../../components/dashboard/Calendar_Preview';
import Header from '../../../components/headers/Header';



const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
// const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Interviews (props) {
    const [selected, set_selected] = useState(0);
    const data = props.data;
    console.log(data)

    return (
        <>
        <Header name="Post">Interviews</Header>
        <main className={styles.main}>
        <section className={styles.content}>
            <Grid columns="1fr 1fr 1fr 1fr" rows="1fr">
                {/* // PENDING */}
                <div className={styles.analytics}>
                    <h4>11</h4>
                    <p>Pending</p>
                </div>
                <div className={styles.analytics}>
                    <h4>11</h4>
                    <p>Upcoming</p>
                </div>
                <div className={styles.analytics}>
                    <h4>4</h4>
                    <p>Feedback</p>
                </div>
                <div className={styles.analytics}>
                    <h4>23</h4>
                    <p>Completed</p>
                </div>
            </Grid>
      
            <Grid columns="1fr" rows="1fr">
                <List>
                    {data.interviews.map(item => <Candidate_Preview />)}
                </List>
            </Grid>
            
        </section>
        <section className={styles.candidates}>
            <h5>Calendar</h5>
            <List>
                {data.interviews.map(item => <Calendar_Preview data={{time: "09:00", type: 1, name: "Oberyn Martell"}}  />)}
            </List>
        </section>
    </main>
    </>
    )
};

export default Interviews;


function Candidate_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <span>
                <div className={styles.preview__image}></div>
                 <p class="bold">Anna Taylor</p>
            </span>
            <p>24 Oct</p>
            <p>15:00</p>
            <p>Upcoming</p>
            <p>Interview 1</p>
        </div>
    )
};

