import React, { useContext } from 'react';
import styles from '../../../styles/pages/Dashboard/Post.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaRegHourglass } from "react-icons/fa";
import Job_Process from '../../../components/dashboard/Job_Process';
import { TiBriefcase } from "react-icons/ti";
import Candidates from './Candidates';
import Interviews from './Interviews';
import Calendar_Preview from '../../../components/dashboard/Calendar_Preview';
import { calendar } from '../../../tools/DateTime_Methods';
import Edit_Icon from '../../../components/items/Edit_Icon';
import Pie_Chart from '../../../components/charts/Pie_Chart';
import { MenuContext } from '../../../contexts/Menu.context';
import Edit_Post from './Edit_Post';
import Header from '../../../components/headers/Header';
import { candidate_status } from '../../../tools/global_variables';




const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Grid_Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Main (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;



    const analytics_handler = (num, type) => {
        if(type === 0) return data.candidates.filter(item => item.status === num).length
        if(type === 1) return data.interviews.filter(item => item.status === num).length
        if(type === 2) return data.candidates.filter(item => item.status === num).length
    };

    return (
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
                    <h3>0</h3>
                    <p class="medium">Offers</p>
                    <span><FiArrowUpRight/></span>
                </div>
            </Grid>
            <div>
                <Grid_Header>Analytics</Grid_Header>
                <Grid columns="1fr 1fr 1fr" rows="1fr">
                    <div class="centered-column">
                        <Pie_Chart labels={candidate_status} data={[analytics_handler(0, 0), analytics_handler(1, 0), analytics_handler(2, 0), analytics_handler(3, 0), analytics_handler(4, 0), analytics_handler(5, 0)]} />
                        <p class="bold">Applicants</p>
                    </div>
                    <div class="centered-column">
                        <Pie_Chart data={[22, 11, 10]} />
                        <p class="bold">Interviews</p>
                    </div>
                    <div class="centered-column">
                        <Pie_Chart data={[22, 11, 10]} />
                        <p class="bold">Offers</p>
                    </div>
                </Grid>
            </div>
            
        </section>
        <section className={styles.candidates}>
            <Grid columns="1fr 1fr" rows="1fr 1fr 1fr 1fr">
                    <div><p class="bold">Status</p></div>
                    <div><p>{data.closed === true ? "Closed" : "Open"}</p></div>
                    <div><p class="bold">Job Title</p></div>
                    <div><p>{data.title}</p></div>
                    <div><p class="bold">Company</p></div>
                    <div><p>{data.company_name}</p></div>
                    <div><p class="bold">Salary</p></div>
                    <div><p>{data.salary}k</p></div>
                    <div><p class="bold">Date Opened</p></div>
                    <div><p>{calendar(data.timestamp)}</p></div>
                    <div><p class="bold">Date Closed</p></div>
                    <div><p>---</p></div>
                    <div><p class="bold">Hiring Managers</p></div>
                    <div>{data.managers.map(item => <p>{item.user_data.name}</p>)}</div>
            </Grid>
            <Grid_Header>Calender</Grid_Header>
            <List>
                <small style={{marginBottom: "1rem"}}>11 December</small>
                {data.interviews.map(item => <Calendar_Preview data={item} applicant={data.candidates.filter(user => user.user_id === item.applicant)[0]} />)}
            </List>
        </section>
    </main>
    )

};

export default Main;



