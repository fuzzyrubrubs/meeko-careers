import styles from '../styles/pages/Dashboard.module.scss';
import Menu from '../components/dashboard/Menu';
import { useState, useEffect } from 'react';
import Dash_Home from './Dashboard/Dash_Home';
import Manage from './Dashboard/Manage';
import Tasks from './Dashboard/Tasks';
import Messages from './Dashboard/Messages';
import Applications from './Dashboard/Applications';


function Dashboard () {
    const [selected, set_selected] = useState(0);
    const [loader, set_loader] = useState(true);


    const go_home = () =>  set_selected(0);
    
    
    const content = [
        <Dash_Home set_selected={set_selected} />, 
        <Tasks go_home={go_home} />, 
        <Applications go_home={go_home} />, 
        <Messages go_home={go_home} />, 
        <Manage go_home={go_home} />
    ];

    return (
        <main className={styles.dashboard}>
            <section className={styles.menu}><Menu selected={selected} select={set_selected} /></section>
            <section className={styles.content}>{content[selected]}</section>
        </main>
    )
}

export default Dashboard;