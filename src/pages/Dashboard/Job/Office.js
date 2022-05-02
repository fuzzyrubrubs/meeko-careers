import React, { useState, useEffect } from 'react';
import styles from '../../../styles/pages/Dashboard/Company/Office.module.scss';
import { get_now_seconds } from '../../../tools/DateTime_Methods';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import generatePushID from '../../../tools/IDGenerator';
import { add_rota, remove_rota } from '../../../firebase/methods/Company_Functions';


function Office (props) {
    const data = props.data.company_data;
    const employee = props.data;
    const [value, set_value] = useState(0);
    const [days, set_days] = useState([false, true, true, true, true, true, false])
    const [calendar, set_calendar] = useState([]);

    const start = moment().add(value, 'weeks').startOf('week');
    const end = moment().add(value, 'weeks').endOf('week');


    useEffect(() => {
        const items = [];
        new Array(7).fill().forEach((item, index) => {
            const time = moment().add(value, 'weeks').startOf('week').add(index, 'days');
            const format = time.format('X');
            items.push({
                time: time, 
                open: days[index],
                crowd: data.rota.filter(obj => obj.date === format)
            });
        });
        set_calendar(items.filter(item => item.open))

    }, [value]);

    const add_handler = (time, fixed) => {
        const seconds = time.format('X');
        const day =  fixed ? time.format('d') : null
        const id = generatePushID();
        add_rota(id, employee.employee_id, data.id, seconds, day);

        /// fixed day else day = null
    };

    const remove_handler = (id) => {
        remove_rota(id, data.id);
    }


    return (
        <main className={styles.office}>
            <section className={styles.rota}>
                <div className={styles.rota__header}>
                    <span onClick={() => set_value(value - 1)}><FaChevronLeft /></span>
                    <h4>{start.format('D MMMM')}</h4><h4>-</h4><h4>{end.format('D MMMM')}</h4>
                    <span onClick={() => set_value(value + 1)}><FaChevronRight /></span>
                </div>
               <div className={styles.rota__week}>
                    {calendar.length === 0 ? null : calendar.map((item, index) => <div className={styles.rota__day}>
                        <p class="bold">{item.time.format('dddd')}</p>
                        <p>{item.time.format('X')}</p>           
                        {item.crowd.map(user => <p onClick={user.employee_id === employee.employee_id ? () =>  remove_handler(user.entry_id) : null}>{user.employee_id}</p>)}
                        {item.crowd.some(user => user.employee_id === employee.employee_id) ? null : <><p onClick={() => add_handler(item.time, false)}>Add</p><p onClick={() => add_handler(item.time, true)}>Add Every</p></>}              
                    </div>)}
               </div>
            </section>

            <section className={styles.employees}>
                
            </section>

            <section className={styles.info}>
                <div>
                    <h4 className={styles.header}>Office Address</h4>
                    <p>59 Kingsland Road, London, E1238</p>
                </div>
                <div className={styles.info__grid}>
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
            </section>

        </main>
    )
}

export default Office;