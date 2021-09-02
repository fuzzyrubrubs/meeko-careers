import styles from '../styles/pages/Dashboard.module.scss';
import Profile from './Dashboard/Profile';
import Notifications from './Dashboard/Notifications';
import Menu from './Dashboard/Menu';


function Dashboard () {
    return (
        <main className={styles.dashboard}>
            <section><Menu /></section>
            <section></section>
            <section className={styles.right}>
                <Profile />
                <Notifications />
            </section>
        </main>
    )
}

export default Dashboard;