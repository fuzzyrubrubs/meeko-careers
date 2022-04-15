
import React from 'react';
import View_Offer from '../../../components/dashboard/Tasks/Vew_Offer';
import styles from '../../../styles/pages/Dashboard/Job/Main.module.scss';

function Contract (props) {
    const data = props.data;

    return (
        <main className={styles.job}> 
            <section className={styles.main}>
                {/* <View_Offer /> */}
            </section>
            <section className={styles.display}>
                <div>Negociate Contract</div>
                <div>Terminate Contract</div>
            </section>
        </main>
    )
};

export default Contract;