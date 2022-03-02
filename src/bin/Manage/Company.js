import styles from '../../../styles/pages/Dashboard/Overview.module.scss';
import Dashboard_Header from '../../components/UI/Dashboard_Header';
import Candidate_Preview from '../../components/dashboard/Candidate_Preview';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useState } from 'react';
import Candidates from './Candidates';
import { FaChevronLeft } from "react-icons/fa";
import Notification from '../../components/items/Notification';
import Application from '../../components/items/Application';
import Job_Process from '../../components/dashboard/Job_Process';
import { TiBriefcase } from "react-icons/ti";
import Interviews from './Interviews';
import Hired from './Hired';




const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Company (props) {
    const [selected, set_selected] = useState(0);
    
    const fake_array = [1, 1, 1, 1, 1, 1, 1]

    const main = (
        <main className={styles.main}>
        <section className={styles.content}>
            <header className={styles.header}><div onClick={() => props.go_back()}><FaChevronLeft /> <h2>Company</h2></div> <span><TiBriefcase /> <p>Employees</p></span></header>
            <Grid columns="1fr 1fr" rows="1fr 1fr">
                <div style={{gridRow: "1 / 3"}} className={styles.box} onClick={() => set_selected(1)}>
                    <div className={styles.box__icon}><FiFileText /></div>
                    <p className={styles.box__details}>See Details <FiArrowUpRight/></p>
                    <div className={styles.box__applicants}>
                        <h2>427</h2>
                        <p>Applicants</p>
                    </div>
                    <div className={styles.box__shape}></div>
                    <div className={styles.box__shape}></div>
                </div>
                <div className={styles.small_box} onClick={() => set_selected(2)}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>42</h3>
                    <p class="medium">Interviews</p>
                    <span><FiArrowUpRight/></span>
                </div>
                <div className={styles.small_box} onClick={() => set_selected(3)}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>9</h3>
                    <p class="medium">Hired</p>
                    <span><FiArrowUpRight/></span>
                </div>
            </Grid>
      
            <Header>Analytics</Header>
            <Grid columns="1fr 1fr 1fr" rows="1fr">
                <div class="centered-column">
                    <div class={styles.chart}></div>
                    <p>Applicants</p>
                </div>
                <div class="centered-column">
                    <div class={styles.chart}></div>
                    <p>Interviwed</p>
                </div>
                <div class="centered-column">
                    <div class={styles.chart}></div>
                    <p>Open time</p>
                </div>
            </Grid>

            <Header>Employee Tasks / Contracts / Onboarding Template / MANAGERS</Header>
            <Grid columns="1fr" rows="1fr"> 
               <Job_Process />
            </Grid>
            
        </section>
        <section className={styles.candidates}>
            <Header>Company</Header>
            <Grid columns="1fr 1fr" rows="1fr 1fr 1fr 1fr">
                    <div><p class="bold">Name</p></div>
                    <div><p>Lucidicar</p></div>
                    <div><p class="bold">Open</p></div>
                    <div><p>1</p></div>
                    <div><p class="bold">Closed</p></div>
                    <div><p>4</p></div>
                    <div><p class="bold">Company Manager</p></div>
                    <div><p>Anna Taylor</p></div>
            </Grid>
            <Header>Posts</Header>
            <List>
                {fake_array.map(item => <Candidate_Preview />)}
            </List>
        </section>
    </main>
    )

    const go_back = () => set_selected(0);

    const display_content = [main, <Candidates go_back={go_back} />, <Interviews go_back={go_back} />, <Hired go_back={go_back} />]

    return display_content[selected];

};

export default Company;


// const Main_Overview = (props) => {
//     return (
        
//     )

          
