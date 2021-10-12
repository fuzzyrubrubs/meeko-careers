import { useEffect, useState } from 'react';
import { get_companies } from '../../firebase/methods/Company_Functions';
import styles from '../../styles/pages/Dashboard.module.scss';


function Company_List (props) {

    return (
        <main>
             <h2>Company List</h2>
             <section>
                 {props.companies.map(item => <h5>{item.name}</h5>)}
             </section>
        </main>
    )
}

export default Company_List;