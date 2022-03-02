import { useContext, useEffect, useState } from 'react';
import Job_Status from '../../../components/items/Job_Status';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import { AuthContext } from '../../../contexts/Auth.context';
import styles from '../../../styles/pages/Dashboard.module.scss';
import Overview from './Overview';


function Job_Posts (props) {
    const [display_closed, set_display_closed] = useState(false);
    const [selected, set_selected] = useState(false);
    const data = props.data;

    const select_handler = (index) => set_selected(index);
    const go_back = () => set_selected(false);

    const main = (
        <main>
            <Dashboard_Header back_handler={() => props.go_back()}>Job Posts</Dashboard_Header>
            <section>
                {data.map((item, index) => <Job_Status data={item} select={() => select_handler(index)} />)}
            </section>

            <section>
                {/* <h2>Closed</h2> */}
            </section>
        </main>
    );

    const display_content = selected !== false ? <Overview data={data[selected]} go_back={go_back} /> : main;

    return display_content;
}

export default Job_Posts;