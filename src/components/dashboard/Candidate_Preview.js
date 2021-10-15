import styles from '../../styles/components/dashboard/Candidate_Preview.module.scss';

function Candidate_Preview (props) {
    return (
        <div className={styles.container}>
            <div className={styles.image}></div>
            <div className={styles.wrapper}>
                <p>Anna Taylor</p>
                <div>
                    <small>Software Developer</small>
                    <small>3 days ago</small>
                </div>
            </div>
        </div>
    )
};

export default Candidate_Preview;