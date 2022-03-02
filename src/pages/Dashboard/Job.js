import styles from '../../styles/pages/Dashboard/Overview.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaRegHourglass } from "react-icons/fa";
import Job_Process from '../../components/dashboard/Job_Process';
import { TiBriefcase } from "react-icons/ti";
import Candidates from './Job/Candidates';
import Interviews from './Job/Interviews';
import Calendar_Preview from '../../components/dashboard/Calendar_Preview';
import { calendar } from '../../tools/DateTime_Methods';
import Edit_Icon from '../../components/items/Edit_Icon';
import Pie_Chart from '../../components/items/Pie_Chart';




const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Overview (props) {
    const [selected, set_selected] = useState(0);
    const data = props.data;
    const fake_array = [1, 1, 1, 1, 1, 1, 1]

    useEffect(() => {
        const menu = ["<", "Applicants", "Interviews", "Messages", "Job Post"];

    }, [])

    const main = (
        <main className={styles.main}>
        <section className={styles.content}>
            <header className={styles.header}><div onClick={() => props.go_back()}><FaChevronLeft /> <h2>{data.title}</h2></div> <span><TiBriefcase /> <p>{data.company_name}</p></span></header>
            <Grid columns="1fr 1fr" rows="1fr 1fr">
                <div style={{gridRow: "1 / 3"}} className={styles.box} onClick={() => set_selected(1)}>
                    <div className={styles.box__icon}><FiFileText /></div>
                    <p className={styles.box__details}>See Details <FiArrowUpRight/></p>
                    <div className={styles.box__applicants}>
                        <h2>{data.candidates.length}</h2>
                        <p>Applicants</p>
                    </div>
                    <div className={styles.box__shape}></div>
                    <div className={styles.box__shape}></div>
                </div>
                <div className={styles.small_box} onClick={() => set_selected(2)}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>{data.interviews.length}</h3>
                    <p class="medium">Interviews</p>
                    <span><FiArrowUpRight/></span>
                </div>
                <div className={styles.small_box}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>9</h3>
                    <p class="medium">Messages</p>
                    <span><FiArrowUpRight/></span>
                </div>
            </Grid>
      
            <Header>Analytics</Header>
            <Grid columns="1fr 1fr 1fr" rows="1fr">
                <div class="centered-column">
                    <Pie_Chart data={[128, 48, 22, 11]} />
                    <p class="bold">Applicants</p>
                </div>
                <div class="centered-column">
                    <Pie_Chart data={[22, 11, 10]} />
                    <p class="bold">Interviews</p>
                </div>
                <div class="centered-column">
                    <div className={styles.chart}>
                        <FaRegHourglass />
                        {/* <h2>10</h2>
                        <h4>Days</h4> */}
                    </div>
                    <p class="bold">Close time</p>
                </div>
            </Grid>

            <Header>Process <Edit_Icon /></Header>
            <Grid columns="1fr" rows="1fr"> 
               <Job_Process empty={true} />
            </Grid>
            
        </section>
        <section className={styles.candidates}>
            <Header>Job Post <Edit_Icon /></Header>
            <Grid columns="1fr 1fr" rows="1fr 1fr 1fr 1fr">
                    <div><p class="bold">Job Title</p></div>
                    <div><p>{data.title}</p></div>
                    <div><p class="bold">Status</p></div>
                    <div><p>{data.closed === true ? "Closed" : "Open"}</p></div>
                    <div><p class="bold">Date Opened</p></div>
                    <div><p>{calendar(data.timestamp)}</p></div>
                    <div><p class="bold">Date Closed</p></div>
                    <div><p>---</p></div>
                    <div><p class="bold">Hiring Manager</p></div>
                    <div><p>Anna Taylor</p></div>
            </Grid>
            <Header>Upcoming Interviews</Header>
            <List>
                <small style={{marginBottom: "1rem"}}>11 December</small>
                <Calendar_Preview data={{time: "09:00", type: 1, name: "Oberyn Martell"}} />
                <Calendar_Preview data={{time: "11:00", type: 0, name: "Davos Seaworth"}} />
                <small style={{marginBottom: "1rem"}}>12 December</small>
                <Calendar_Preview data={{time: "09:00", type: 0, name: "Sandor Clegane"}} />
                <Calendar_Preview data={{time: "14:00", type: 1, name: "Margaery Tyrell"}} />
                <Calendar_Preview data={{time: "09:00", type: 0, name: "Anna Taylor"}} />
            </List>
        </section>
    </main>
    )

    const go_back = () => set_selected(0);

    const display_content = [main, <Candidates data={data} go_back={go_back} />, <Interviews data={data} go_back={go_back} />]

    return display_content[selected];

};

export default Overview;



