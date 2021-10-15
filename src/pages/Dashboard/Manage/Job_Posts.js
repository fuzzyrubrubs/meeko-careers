import { useState } from 'react';
import Job_Status from '../../../components/items/Job_Status';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import styles from '../../../styles/pages/Dashboard.module.scss';
import Overview from './Overview';


function Job_Posts (props) {
    const [display_closed, set_display_closed] = useState(false);
    const [selected, set_selected] = useState(false);

    console.log(props.jobs);

    const select_handler = () => {
        set_selected(true);
    }

    const go_back = () => {
        set_selected(false);
    }

    const main = (
        <main>
            <Dashboard_Header back_handler={() => props.go_back()}>Job Posts</Dashboard_Header>
            <section>
                {/* <h2>Open</h2> */}
                <Job_Status select={select_handler} />
                <Job_Status select={select_handler} />
                <Job_Status select={select_handler} />
            </section>

            <section>
                {/* <h2>Closed</h2> */}
            </section>
        </main>
    );

    const display_content = selected ? <Overview id={selected} go_back={go_back} /> : main;

    return display_content;
}

export default Job_Posts;