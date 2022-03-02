import styles from '../../styles/pages/Dashboard/Manage.module.scss';
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Dashboard_Header from '../../components/UI/Dashboard_Header';
import Task from '../../components/dashboard/Task';
import Button_Modal from '../../components/items/Button_Modal';

function Tasks (props) {
    const [selected, set_selected] = useState(false);
    const data = props.data;

    console.log(data)



    
    // const tasks = data.map(item => <div onClick={() => set_selected(item)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>{item.name}</h5></div>);
    const tasks = data.map(item => <Button_Modal name={item.name}><Task data={item} /></Button_Modal>);

    const back_handler = () => props.go_home();

    return (
        <main className={styles.manage}>
            <Dashboard_Header back_handler={back_handler}>Tasks</Dashboard_Header>
            <section className={styles.content}>
                <div className={styles.content__list}>
                   {tasks}
                </div>
                <div className={styles.content__image}></div>
            </section>
        </main>
    )
};

export default Tasks;