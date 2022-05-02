import styles from '../../../styles/pages/Dashboard/Company/Recruitment.module.scss';
import Candidate_Preview from '../../../components/dashboard/Candidate_Preview';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useState } from 'react';
import Candidates from '../Post/Candidates';
import Interviews from '../Post/Interviews';
import Employees from '../Company/Employees';
import { Column, ColumnCentered, Grid, Header, Table } from '../../../tools/global_components';
import Doughnut_Chart from '../../../components/charts/Doughnut';
import Recruitment_Preview from '../../../components/previews/Recruitment';



function Recruitment (props) {
    const data = props.data;
    const [selected, set_selected] = useState(0);

    console.log(data)

    const inter = () => {
        let num = 0;
        let int = 0;
        data.posts.forEach(item => {
            num = num + item.candidates.length; 
            int = int + item.interviews.length;
        });
        return [num, int];
    }
    
    const [applicants, interviews] = inter();

    
    const main = (
        <main className={styles.main}>
        <section className={styles.content}>

            <Grid columns="1fr 1fr" rows="1fr 1fr" height={18}>
                <div style={{gridRow: "1 / 3"}} className={styles.box} onClick={() => set_selected(1)}>
                    <div className={styles.box__icon}><FiFileText /></div>
                    <p className={styles.box__details}>See Details <FiArrowUpRight/></p>
                    <div className={styles.box__applicants}>
                        <h2>{applicants}</h2>
                        <p>Applicants</p>
                    </div>
                    <div className={styles.box__shape}></div>
                    <div className={styles.box__shape}></div>
                </div>
                <div className={styles.small_box} onClick={() => set_selected(2)}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>{interviews}</h3>
                    <p class="medium">Interviews</p>
                    <span><FiArrowUpRight/></span>
                </div>
                <div className={styles.small_box} onClick={() => set_selected(3)}>
                    <div className={styles.small_box__icon}><FiFileText /></div>
                    <h3>0</h3>
                    <p class="medium">Hired</p>
                    <span><FiArrowUpRight/></span>
                </div>
            </Grid>

            <div>
                <Header>Posts</Header>
                {data.posts.map(item => <Recruitment_Preview data={item} />)}
            </div>

        </section>

        <section className={styles.posts}>
            <Header>Analytics</Header>
            <Table>
                <p class="bold">Hire Time</p><p>24 days</p>
                <p class="bold">Fill Time</p><p>40 days</p>
                <p class="bold">Average Applies</p><p>205</p>
            </Table>
        </section>

    </main>
    )

    const go_back = () => set_selected(0);

    const display_content = [main, <Candidates go_back={go_back} />, <Interviews go_back={go_back} />, <Employees go_back={go_back} />]

    return display_content[selected];

};

export default Recruitment;

