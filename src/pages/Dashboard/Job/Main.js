
import React from 'react';
import Half_Doughnut_Chart from '../../../components/items/Half_Doughnut_Chart';
import styles from '../../../styles/pages/Dashboard/Job/Main.module.scss';
import { MdLocationOn } from "react-icons/md";

function Main (props) {
    const data = props.data;

    const complete = 4;
    const pending = 2;
    const total = 6;

    const img_url = "https://media.istockphoto.com/vectors/city-urban-streets-roads-abstract-map-vector-id1137117479";

    return (
        <main className={styles.job}> 
            <section className={styles.main}>
                <h4 className={`${styles.header} ${styles.main__header}`}>Position: <span class="bold dark">{data.position}</span></h4>
                    
                <div className={styles.grid}>
                    <div><p class="bold">Start Date</p></div>
                    <div><p>25/02/2022</p></div>
                    <div><p class="bold">Salary</p></div>
                    <div><p>45k</p></div>
                    <div><p class="bold">Bonus</p></div>
                    <div><p>500</p></div>
                    <div><p class="bold">Probation</p></div>
                    <div><p>Yes</p></div>
                    <div><p class="bold">Probation Duration</p></div>
                    <div><p>6 months</p></div>
                    <div><p class="bold">Working hours</p></div>
                    <div><p>40 per week</p></div>
                    <div><p class="bold">Health Insurance</p></div>
                    <div><p>Yes</p></div>
                    <div><p class="bold">Annual Leave</p></div>
                    <div><p>11</p></div>
                    <div><p class="bold">Sick Leave</p></div>
                    <div><p>0</p></div>
                </div>
            

                <div className={styles.tasks}>
                    <div>
                        <h4 className={styles.header}>Tasks</h4>
                    </div>
                    <div className={styles.doughnut}>
                        <h4 className={`${styles.header} ${styles.doughnut__header}`}></h4>
                        <Half_Doughnut_Chart labels={["Complete", "Pending"]} data={[complete, pending]} />
                        <div className={styles.doughnut__percent}>
                            <p>{parseInt(complete / total * 100)}%</p>
                            <p>{parseInt(pending / total * 100)}%</p>
                        </div>
                    </div>
                </div>

            </section>
            <section className={styles.display}>
                <div className={styles.office}>
                    <div className={styles.office__image} style={{"backgroundImage": `url(${img_url})`}}><MdLocationOn /></div>
                    <p>Kyiv</p>
                </div>
                <div>
                    <h4 className={styles.header}>Office Address</h4>
                    <p>59 Kingsland Road, London, E1238</p>
                </div>
                <div>
                    <h4 className={styles.header}>Open Hours</h4>
                    <div className={styles.grid}>
                        <div><p class="bold">Monday</p></div>
                        <div><p>9am-5pm</p></div>
                        <div><p class="bold">Tuesday</p></div>
                        <div><p>9am-5pm</p></div>
                        <div><p class="bold">Wednesday</p></div>
                        <div><p>9am-5pm</p></div>
                        <div><p class="bold">Thursday</p></div>
                        <div><p>9am-5pm</p></div>
                        <div><p class="bold">Friday</p></div>
                        <div><p>9am-5pm</p></div>
                        <div><p class="bold">Saturday</p></div>
                        <div><p>Closed</p></div>
                        <div><p class="bold">Sunday</p></div>
                        <div><p>Closed</p></div>
                    </div>

                </div>

            </section>
        </main>
    )
};

export default Main;