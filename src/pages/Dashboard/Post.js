import React, { useContext } from 'react';
import styles from '../../styles/pages/Dashboard/Post.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaRegHourglass } from "react-icons/fa";
import Job_Process from '../../components/dashboard/Job_Process';
import { TiBriefcase } from "react-icons/ti";
import Candidates from './Post/Candidates';
import Interviews from './Post/Interviews';
import Calendar_Preview from '../../components/dashboard/Calendar_Preview';
import { calendar } from '../../tools/DateTime_Methods';
import Edit_Icon from '../../components/items/Edit_Icon';
import Pie_Chart from '../../components/items/Pie_Chart';
import { MenuContext } from '../../contexts/Menu.context';
import Edit_Post from './Post/Edit_Post';
import Header from '../../components/headers/Header';




const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Grid_Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Overview (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;
    const fake_array = [1, 1, 1, 1, 1, 1, 1]

    useEffect(() => {
        set_options(["Overview", "Applicants", "Interviews", "Edit Post"]);
        set_title(data.title)
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);

    const main = (
        <>
        <Header name="Post">{data.title}</Header>
        <main className={styles.main}>
        <section className={styles.content}>
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
                    <h3>4</h3>
                    <p class="medium">Templates</p>
                    <span><FiArrowUpRight/></span>
                </div>
            </Grid>
            <div>
                <Grid_Header>Analytics</Grid_Header>
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
                        <Pie_Chart data={[22, 11, 10]} />
                        <p class="bold">Tasks</p>
                    </div>
                </Grid>
            </div>
            
        </section>
        <section className={styles.candidates}>
            <Grid columns="1fr 1fr" rows="1fr 1fr 1fr 1fr">
                    <div><p class="bold">Job Title</p></div>
                    <div><p>{data.title}</p></div>
                    <div><p class="bold">Company</p></div>
                    <div><p>Lucidica</p></div>
                    <div><p class="bold">Salary</p></div>
                    <div><p>45k</p></div>
                    <div><p class="bold">Status</p></div>
                    <div><p>{data.closed === true ? "Closed" : "Open"}</p></div>
                    <div><p class="bold">Date Opened</p></div>
                    <div><p>{calendar(data.timestamp)}</p></div>
                    <div><p class="bold">Date Closed</p></div>
                    <div><p>---</p></div>
                    <div><p class="bold">Hiring Manager</p></div>
                    <div><p>Anna Taylor</p></div>
            </Grid>
            <Grid_Header>Calender</Grid_Header>
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
    </>
    )

    const go_back = () => set_selected(0);

    const display_content = [main, <Candidates data={data} go_back={go_back} />, <Interviews data={data} go_back={go_back} />, <Edit_Post />]

    return display_content[selected];

};

export default Overview;



