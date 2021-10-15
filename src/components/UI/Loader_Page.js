import styles from '../../styles/components/UI/Loader_Page.module.scss';

function Loader_Page () {
    return (
        <main className={styles.loader}>
            <div className={styles.logo}></div>
        </main>
    )
};

export default Loader_Page;