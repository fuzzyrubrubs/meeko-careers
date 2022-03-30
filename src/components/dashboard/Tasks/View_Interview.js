import styles from '../../../styles/components/dashboard/tasks/View_Interview.module.scss';

function View_Interview (props) {
    const user_data = props.user_data;
    const job_data = props.job_data;
    const application_data = props.application_data;

    return (
        <main className={styles.view_interview}>
            <section>
                <p>Status: Pending</p>
            </section>

        </main>
    )
};

export default View_Interview;