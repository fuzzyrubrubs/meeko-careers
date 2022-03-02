import styles from '../../styles/pages/Dashboard/Main.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convert_name } from '../../tools/global_functions';
import Company from '../../components/forms/Company';
import { IoIosAdd } from "react-icons/io";
import Create_Company from '../../components/forms/Company';
import Pie_Chart from '../../components/items/Pie_Chart';


function Main (props) {
    const [selected, set_selected] = useState(0);
    const [manager, set_manager] = useState(true);
    const companies = props.companies;
    
    const items = companies.map(item => (
        <Link to={`/dashboard/company/${convert_name(item.name)}`} className={styles.content__item}>
            <div className={`shape_pink ${styles.content__item__box}`}></div>
            <h4 className={styles.content__item__text}>{item.name}</h4>
        </Link>
    ))

    const content = (
    <main className={styles.content}>
        <section className={styles.content__section_1}>
           {items}
            <div className={styles.content__item} onClick={() => set_selected(1)}>
                <div className={styles.content__item__box_outline}><IoIosAdd /></div>
                <h4 className={styles.content__item__text}></h4>
            </div>
        
        </section>
        <section className={styles.content__section_2}>
            <div>
                <h3>Recent Applications/Posts</h3>
                {/* <Pie_Chart data={[128, 48]} /> */}
            </div>
            <div>
                <h3>Messages/Tasks</h3>
            </div>
        </section>
    </main>
    )

    return selected === 0 ? content : <Create_Company />
};

export default Main;