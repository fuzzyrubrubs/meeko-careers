import styles from '../../styles/pages/Dashboard/Manage.module.scss';
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Dashboard_Header from '../../components/UI/Dashboard_Header';

function Tasks (props) {
    const [selected, set_selected] = useState(0);

    const [loader, set_loader] = useState(true);
    
    useEffect(() => {
        const fetch_data = async () => {
            set_loader(false)
        }
        fetch_data();
    }, []);
    

    const menu = (
        <section className={styles.content}>
            <div className={styles.content__list}>
                <div onClick={() => set_selected(1)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>Complete Portfolio</h5></div>
                <div onClick={() => set_selected(2)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>Upload Resume</h5></div>
                <div onClick={() => set_selected(3)} className={styles.content__item}><span><FaChevronLeft /></span> <h5>Apply for a job</h5></div>
            </div>
            <div className={styles.content__image}></div>
        </section>
    )

    const content = [menu]
    const display_name = ["Tasks"]

    const back_handler = () => selected === 0 ? props.go_home() : set_selected(0);

    return (
        <main className={styles.manage}>
            <Dashboard_Header back_handler={back_handler}>{display_name[selected]}</Dashboard_Header>
            {content[selected]}
        </main>
    )
};

export default Tasks;