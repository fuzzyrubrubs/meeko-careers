import styles from '../../../styles/pages/Dashboard/Company/Employee.module.scss';
import Button_Main from '../../../components/items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaTimes, FaPen, FaStar } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { useEffect, useState, useContext } from 'react';
import { interview_icons, interview_types, candidate_status } from '../../../tools/global_variables';
import Button_Modal from '../../../components/items/Button_Modal';
import { populate_24_hours, populate_30_days } from '../../../tools/DateTime_Methods';
import Dates_List from '../../../components/lists/Dates_List';
import Times_List from '../../../components/lists/Times_List';
import moment from 'moment';
import Text_Input from '../../../components/inputs/Text_Input';
import Textarea_Input from '../../../components/inputs/Textarea_Input';
import Arrange_Interview from '../../../components/dashboard/Tasks/Arrange_Interview';
import { useHistory } from 'react-router-dom';
import { MenuContext } from '../../../contexts/Menu.context';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { update_application_message, update_application_status, close_application } from '../../../firebase/methods/Applicant_Functions';
import Click_Modal from '../../../components/items/Click_Modal';
import View_Interview from '../../../components/dashboard/Tasks/View_Interview';
import Make_Offer from '../../../components/dashboard/Tasks/Make_Offer';
import Edit_Offer from '../../../components/dashboard/Tasks/Edit_Offer';
import Confirmation from '../../../components/items/Confirmation';
import Half_Doughnut_Chart from '../../../components/charts/Half_Doughnut_Chart';
import { Table } from '../../../tools/global_components';
import Create_Task from '../../../components/tasks/Create';


function Employee (props) {
    const { set_hide_header } = useContext(MenuContext);
    const data = props.data;
    const user_data = props.data.user_data;

    const history = useHistory();

    useEffect(() => {
        set_hide_header(true);
        return () => { 
           set_hide_header(false);
        };
    }, []);
    

    const complete = 4;
    const pending = 2;
    const total = 6;


    return (
        <>
        <section className={styles.header}>
            <div className={styles.header__title}>
                <div className={styles.header__row}>
                    <h5>Employee</h5>
                    <small>Active</small>
                </div>
                <h1>{data.user_data.name}</h1> 
            </div>
            <Link to="/dashboard/messages" className={styles.header__icon}><FaPen /></Link>
            <Link to="/dashboard/messages" className={styles.header__icon}><FiMessageSquare /></Link>
            <div onClick={() => props.go_back()} className={`${styles.header__icon} ${styles.header__icon__red}`}><FaTimes /></div>
        </section>

        <main className={styles.main}>
            <section className={styles.info}>
                <div className={styles.calendar}>Rota</div>

                <Table>
                    <p class="bold">Start Date</p><p>25/02/2022</p>
                    <p class="bold">Salary</p><p>45k</p>
                    <p class="bold">Bonus</p><p>500</p>
                    <p class="bold">Probation</p><p>Yes</p>
                    <p class="bold">Probation Duration</p><p>6 months</p>
                    <p class="bold">Working hours</p><p>40 per week</p>
                    <p class="bold">Health Insurance</p><p>Yes</p>
                    <p class="bold">Annual Leave</p><p>11</p>
                    <p class="bold">Sick Leave</p><p>0</p>
                </Table>

            
                <div className={styles.tasks}>
                    <div>
                        <h4 className={styles.header}>Tasks</h4>
                    </div>
                    <div className={styles.doughnut}>
                        <h4 className={`${styles.header} ${styles.doughnut__header}`}></h4>
                        <Half_Doughnut_Chart labels={["Complete", "Pending"]} data={[complete, pending]} />
                        <div className={styles.doughnut__percent}>
                            <p>{parseInt(complete / total * 100)}%</p>
                            <p>{parseInt(pending / total * 100)}%</p>
                        </div>
                    </div>
                </div>

            </section>


            <section className={styles.profile}>
                <div className={styles.profile__header}>
                    <div className={styles.profile__header__image} style={{"backgroundImage": `url(${user_data.avatar})`}}></div>
                    <h4>{user_data.name}</h4> 
                </div>

                <div>Anna has requested 3 days off</div>

                <Table>
                    <p class="bold">Phone</p><p>{data.phone}</p>
                    <p class="bold">Email</p><p>anna@gmail.com</p>
                    <p class="bold">Location</p><p>Kyiv, Ukraine</p>
                    <p class="bold">Apply Date</p><p>25/02/2022</p>
                </Table>

                <div>
                    <Click_Modal content={<Button_Main>Assign Task</Button_Main>}><Create_Task /></Click_Modal>
                    <Button_Main>View Contract</Button_Main>
                    <Button_Main>Terminate Contract</Button_Main>
                </div>
            </section>
        </main>
        </>
    )
}

export default Employee;


