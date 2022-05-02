import React, { useState } from 'react';
import styles from '../../../styles/pages/Dashboard/Company/Invoices.module.scss';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function Invoice (props) {
    const data = props.data;
    const [value, set_value] = useState(0);
    const start = moment().add(value, 'months').startOf('month');
    const end = moment().add(value, 'months').endOf('month');
    
    // Month by month view 
    // See invoices requested each month plus 
    // sent, returned, (paid)

    const invoice = (
        <div className={styles.invoice}>
            <div></div>
            <small>Anna Taylor</small>
        </div>
    )

    const array = [1, 1, 1, 1, 1, 1, 1];



    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <span onClick={() => set_value(value - 1)}><FaChevronLeft /></span>
                <h4>{start.format('D MMMM')}</h4><h4>-</h4><h4>{end.format('D MMMM')}</h4>
                <span className={value >= 0 ? styles.invalid : null} onClick={value < 0 ? () => set_value(value + 1) : null}><FaChevronRight /></span>
            </section>
            <section className={styles.main}>
                {array.map(item => invoice)}
            </section>
        </main>
    );

};

export default Invoice;