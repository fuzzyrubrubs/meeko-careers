import { useEffect, useState, useContext } from 'react';
import styles from '../../../styles/components/dashboard/tasks/Offer.module.scss';
import { AuthContext } from '../../../contexts/Auth.context';
import generatePushID from '../../../tools/IDGenerator';
import Text_Input from '../../inputs/Text_Input';
import Number_Input from '../../inputs/Number_Input';
import Button_Main from '../../items/Button_Main';
import Times_List from '../../lists/Times_List';
import { get_diff, get_now, populate_24_hours } from '../../../tools/DateTime_Methods';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Text_Input_Alt from '../../inputs/Text_Input_Alt';
import Toggle from '../../inputs/Toggle';
import Check_box from '../../inputs/Check_Box';
import { create_offer, update_application_message, update_application_status } from '../../../firebase/methods/Applicant_Functions';


function View_Offer (props) {
    const offer = props.offer;

    // const per_week = hours === 1 ? working_hours : (get_diff(times_list[end_time_selected], times_list[start_time_selected]) - lunch_duration) * 5;
    // const day_rate = parseInt((salary * 12 / 52) / per_week)


    console.log(offer)
    
    const submit_handler = () => {
     
    };

    const form_info = (text) => (
        <div className={styles.info}>
            <IoMdInformationCircleOutline />
            <small>{text}.</small>
        </div>
    )

    const contract = (
        <main className={styles.contract}>
            <section>
                <div className={styles.contract__image}></div>
                <p class="bold">Private and confidential</p>
                <p>{offer.applicant_name}</p>
                <p>{get_now()}</p>
            </section>

            <section>
                <p class="bold">Dear {offer.applicant_name.split(" ")[0]}</p>
                <p>We are pleased to offer you the position of <span class="bold">{offer.title}</span> at <span class="bold">{offer.company_name}</span>, with the following terms and conditions of employment</p>
            </section>

            <section>
                <p class="bold">Start Date</p>
                <p>{offer.start_date}</p>
            </section>

            {offer.probation.exists ? <section>
                <p class="bold">Probation Period</p>
                <p>{offer.probation.duration} months</p>
                <p>During your probation you'll be paid {offer.probation.salary} and a maximum of {offer.probation.bonus} per month in bonuses.</p>
            </section> : null}

            <section>
                <p class="bold">Remuneration</p>
                <p> {offer.probation.exists ? "After successful completion of your probation, y" : "Y"}our salary will be calculated as follows:</p>
                <li>Base Salary = {offer.salary}</li>
                {form_info("Your hourly rate is calculated using this base salary at 40 hours per week")}
                <li>Hourly Rate = {}</li>
                <li>Bonus - Up to {offer.bonus}</li>
            </section>

            <section>
                <p class="bold">Hours and Leave</p>
                <p>{offer.hours.length} per week</p>
                {offer.hours.fixed ? <p>Fixed hours are {offer.hours.start} until {offer.hours.end} with {offer.hours.lunch} hour(s) {offer.hours.paid_lunch ? "paid" : "unpaid"} for lunch Monday to Friday</p> : null}
                <p>{offer.annual_leave} annual leave days</p>
                <p>{offer.paid_sick} paid sick days</p>
            </section>

            {offer.benefits.length === 0 ? null : <section>
                <p class="bold">Additional Benefits:</p>
                {offer.benefits.map(item => <p>- {item}</p>)}
            </section>}
            <Button_Main action={submit_handler}>Accept Offer</Button_Main>

        </main>
    )

    return contract;
};

export default View_Offer;
