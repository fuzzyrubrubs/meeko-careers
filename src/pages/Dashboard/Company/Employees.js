import styles from '../../../styles/pages/Dashboard/Hired.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import Hiree from './Employee';



const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Hired (props) {
    const [selected, set_selected] = useState(false);

    const select_handler = () => set_selected(true);
    
    const fake_array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    const main = (
        <main className={styles.main}>
        <section className={styles.content}>
            <header className={styles.header}><div onClick={() => props.go_back()}><FaChevronLeft /> <h2>Hired</h2></div></header>
            <Grid columns="1fr 1fr 1fr" rows="1fr">
                <div className={styles.analytics}>
                    <h2>11</h2>
                    <span>
                        <p>Hired</p>
                        <small>5 Tasks</small>
                    </span>
                    <div></div>
                </div>
                <div className={styles.analytics}>
                    <h2>4</h2>
                    <span>
                        <p>Probation</p>
                        <small>12 Tasks</small>
                    </span>
                    <div></div>
                </div>
                <div className={styles.analytics}>
                    <h2>2</h2>
                    <span>
                        <p>Offboarded</p>
                        <small>0 tasks</small>
                    </span>
                    <div></div>
                </div>
            </Grid>
      
            <Grid columns="1fr" rows="1fr">
                <List>
                    {fake_array.map(item => <Candidate_Preview select={select_handler} />)}
                </List>
            </Grid>

            <Grid columns="1fr 1fr" rows="1fr"> 
                <div className={styles.interview_template}>On/offboarding Task Template</div>
                <div className={styles.interview_template}>Custom Task Template</div>      
            </Grid>
            
        </section>
        <section className={styles.candidates}>
            <Header>Tasks Not/Complete | Probation Analytics</Header>
            <div className={styles.task_analytics}>80% complete</div>
            <List>
                {fake_array.map(item => <Calendar_Preview />)}
            </List>
        </section>
    </main>
    )

    const go_back = () => set_selected(0);

    const display_content = selected ? <Hiree id={selected} go_back={go_back} /> : main;

    return display_content;

};

export default Hired;


function Candidate_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <span>
                <div className={styles.preview__image}></div>
                 <p>Anna Taylor</p>
            </span>
            <small>Probation</small>
            <small>6 tasks</small>
            <small>4 tasks</small>
            <small>6 months</small>
            <small>Contract</small>
        </div>
    )
};

function Calendar_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.calendar__item}>
            <h4>Task</h4>
            {/* <h4>Complete</h4> */}
            <span></span>
            <div>
                <small>Sign Contract</small>
                <p>Anna Taylor</p>
            </div>
        </div>
    )
};
