import styles from '../../../styles/pages/Dashboard/Company/Automation.module.scss';
import Button_Modal from '../../../components/items/Button_Modal';

function Automation (props) {
    const data = props.data;

    const Scheduled_Handler = () => {


        return (
            <section className={styles.modal}>
                
            </section>
        );
    } 


    return (
        <main className={styles.automation}>
            <section className={styles.automation__column}>
                <div className={styles.automation__column__title}><h4>Scheduled Tasks</h4> <Button_Modal type={1}><Scheduled_Handler /></Button_Modal></div>
                <div>

                </div>
            </section>
            <section className={styles.automation__column}>
                <div className={styles.automation__column__title}><h4>Onboard Tasks</h4> <Button_Modal type={1}><Scheduled_Handler /></Button_Modal></div>
                <div>

                </div>
            </section>
            <section className={styles.automation__column}>
                <div className={styles.automation__column__title}><h4>Offboard Tasks</h4> <Button_Modal type={1}></Button_Modal></div>
                <div>

                </div>
            </section>
        </main>
        
    );
};

export default Automation;