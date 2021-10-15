import { useEffect, useState } from 'react';
import { get_companies } from '../../../firebase/methods/Company_Functions';
import styles from '../../../styles/pages/Dashboard.module.scss';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';


function Company_List (props) {

    return (
        <main>
            <Dashboard_Header back_handler={() => props.go_back()}>Companies</Dashboard_Header>
             <section>
                 {props.companies.map(item => <h5>{item.name}</h5>)}
             </section>
        </main>
    )
}

export default Company_List;