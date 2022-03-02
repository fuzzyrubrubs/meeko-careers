import { useState } from 'react';
import Job_Status from '../../components/items/Job_Status';
import Dashboard_Header from '../../components/UI/Dashboard_Header';
import styles from '../../../styles/pages/Dashboard.module.scss';
import Overview from './Overview';

import Company from './Company';
import Company_Preview from '../../components/dashboard/Company_Preview';


function Company_List (props) {
    const [display_closed, set_display_closed] = useState(false);
    const [selected, set_selected] = useState(false);


    const select_handler = () => {
        set_selected(true);
    }

    const go_back = () => set_selected(false);

    const main = (
        <main>
            <Dashboard_Header back_handler={() => props.go_back()}>Company List</Dashboard_Header>
            <section>
                {/* <h2>Open</h2> */}
                <Company_Preview select={select_handler} />
                <Company_Preview select={select_handler} />
                <Company_Preview select={select_handler} />
            </section>

            <section>
                {/* <h2>Closed</h2> */}
            </section>
        </main>
    );

    const display_content = selected ? <Company id={selected} go_back={go_back} /> : main;

    return display_content;
}

export default Company_List;
