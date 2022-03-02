import styles from '../styles/pages/Dashboard.module.scss';
import Menu from '../components/dashboard/Menu';
import { useState, useEffect, useContext } from 'react';
import Dash_Home from './Dashboard/Dash_Home';
import Manage from './Dashboard/Manage';
import Tasks from './Dashboard/Tasks';
import Messages from './Dashboard/Messages';
import Applications from './Dashboard/Applications';
import { get_all_messages, get_all_notifications, get_all_tasks, get_applications, get_employements, get_managements, get_messages, get_recruitments, get_tasks } from '../firebase/methods/User_Functions';
import Item_Loader from '../components/UI/Item_Loader';
import { get_recruiter_messages, get_recruiter_tasks } from '../firebase/methods/Job_Functions';
import { get_manager_tasks } from '../firebase/methods/Company_Functions';
import { AuthContext } from '../contexts/Auth.context';


function Dashboard (props) {
    
    const { user_data, all_ids } = useContext(AuthContext);
    const [selected, set_selected] = useState(0);
    const [loader, set_loader] = useState(true);
    const [tasks, set_tasks] = useState([]);



    useEffect(() => {
        const fetch_data = async () => {
            
            const notifications = await get_all_notifications(all_ids);
            const messages = await get_all_messages(all_ids);
            const tasks = await get_all_tasks(all_ids);
            set_tasks(tasks);
            
        }
        fetch_data();
        set_loader(false);
    }, [])
    
    console.log(all_ids)

    if(loader) return <Item_Loader />
    
    const go_home = () =>  set_selected(0);
    
    const content = [
        <Dash_Home set_selected={set_selected} />, 
        <Tasks go_home={go_home} data={tasks} />, 
        <Applications go_home={go_home} user_id={user_data.id} />, 
        <Messages go_home={go_home} />, 
        <Manage go_home={go_home} user_data={user_data} />
    ];

    return (
        <main className={styles.dashboard}>
            <section className={styles.menu}><Menu selected={selected} select={set_selected} /></section>
            <section className={styles.content}>{content[selected]}</section>
        </main>
    )
}

export default Dashboard;