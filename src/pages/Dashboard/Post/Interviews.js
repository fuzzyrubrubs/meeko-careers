import styles from '../../../styles/pages/Dashboard/Interviews.module.scss';
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { Row } from '../../../components/styles/Containers';
import { interview_types } from '../../../tools/global_variables';
import Calendar_Preview from '../../../components/dashboard/Calendar_Preview';



const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Interviews (props) {
    const [selected, set_selected] = useState(0);
    const [filter, set_filter] = useState(false);
    const data = props.data;
    console.log(data)

    const select_handler = () => set_selected(true);
    
    const fake_array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const main = (
        <main className={styles.main}>
        <section className={styles.content}>
            <header className={styles.header}><div onClick={() => props.go_back()}><FaChevronLeft /> <h2>Interviews</h2></div></header>
            <Grid columns="1fr 1fr 1fr" rows="1fr">
                {/* // PENDING */}
                <div className={styles.analytics}>
                    <h2>11</h2>
                    <p>Upcoming</p>
                    <div></div>
                </div>
                <div className={styles.analytics}>
                    <h2>4</h2>
                    <p>Feedback</p>
                    <div></div>
                </div>
                <div className={styles.analytics}>
                    <h2>23</h2>
                    <p>Completed</p>
                    <div></div>
                </div>
            </Grid>
      
            <Grid columns="1fr" rows="1fr">
                <List>
                    {data.interviews.map(item => <Candidate_Preview />)}
                </List>
            </Grid>

            <Row gap="2rem"> 
                {data.interview_template.map(item => <div className={styles.interview_template}>{interview_types[item.type]} Template</div>)}     
            </Row>
            
        </section>
        <section className={styles.candidates}>
            <Header>Calendar</Header>
            <div className={styles.next_interview}></div>
            <List>
                {data.interviews.map(item => <Calendar_Preview data={{time: "09:00", type: 1, name: "Oberyn Martell"}}  />)}
            </List>
        </section>
    </main>
    )

    const go_back = () => set_selected(0);

    const display_content = [main]

    return display_content[selected];

};

export default Interviews;


function Candidate_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <span>
                <div className={styles.preview__image}></div>
                 <p>Anna Taylor</p>
            </span>
            <small>Interview 1</small>
            <small>24 October | 15:00</small>
            <small>Edit Details</small>
        </div>
    )
};

