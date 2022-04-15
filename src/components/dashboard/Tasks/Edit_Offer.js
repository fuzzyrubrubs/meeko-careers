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
import { cancel_offer, create_offer, update_application_message, update_application_status } from '../../../firebase/methods/Applicant_Functions';


function Edit_Offer (props) {
    const application_id = props.application_id;
    const user_data = props.user_data;
    const job_data = props.job_data;
    const offer = props.offer_data;
    const [selected, set_selected] = useState(0);

    const [hours, set_hours] = useState(offer.hours.fixed ? 0 : 1);
    const [bonus, set_bonus] = useState(offer.bonus ? 0 : 1);
    const [probation, set_probation] = useState(offer.probation.exists ? 0 : 1);

    const [paid_lunch, set_paid_lunch] = useState(offer.hours.paid_lunch);
    const [match_probation_salary, set_match_probation_salary] = useState(offer.probation.salary);
    const [match_probation_bonus, set_match_probation_bonus] = useState(offer.probation.bonus);

    const [start, set_start] = useState(offer.start_date);
    const [salary, set_salary] = useState(parseInt(offer.salary));
    const [bonus_pay, set_bonus_pay] = useState(offer.bonus);
    const [annual_leave, set_annual_leave] = useState(offer.annual_leave);
    const [paid_sick, set_paid_sick] = useState(offer.paid_sick);
    const [benefits, set_benefits] = useState(offer.benefits);

    const [probation_duration, set_probation_duration] = useState(offer.probation.duration);
    const [probation_salary, set_probation_salary] = useState(offer.probation.salary);
    const [probation_bonus, set_probation_bonus] = useState(offer.probation.bonus);
    const [probation_benefits, set_probation_benefits] = useState(null);
    
    const [working_hours, set_working_hours] = useState(offer.hours.length);
    const [lunch_duration, set_lunch_duration] = useState(offer.hours.lunch);

    const [start_time_selected, set_start_time_selected] = useState(null);
    const [end_time_selected, set_end_time_selected] = useState(null);
    
    const [benefits_input, set_benefits_input] = useState("");
    const [form_display, set_form_display] = useState(0);

    const times_list = populate_24_hours();



    const per_week = hours === 1 ? working_hours : (get_diff(times_list[end_time_selected], times_list[start_time_selected]) - lunch_duration) * 5;
    const day_rate = parseInt((salary * 12 / 52) / per_week)

    console.log(props)

    const save_handler = () => {
        const _probation = probation === 0 ? true : false;
        const fixed = hours === 0 ? true : false;

        const item = {
            salary: salary,
            start_date: start,
            bonus: bonus_pay,
            annual_leave: annual_leave,
            paid_sick: paid_sick,
            benefits: benefits,
            probation: {
                exists: _probation,
                duration: probation_duration,
                salary: match_probation_salary ? salary : probation_salary,
                bonus: match_probation_bonus ? bonus : probation_bonus,
            },
            hours: {
                fixed: fixed,
                length: fixed ? per_week : working_hours,
                start: fixed ? times_list[start_time_selected] : null,
                end: fixed ? times_list[end_time_selected] : null,
                lunch: fixed ? lunch_duration : null,
                paid_lunch: fixed ? paid_lunch : null
            }   
        };
        create_offer(application_id, item);
        // update_application_status(application_id, 4);
        update_application_message(application_id, "We've made some chanegs to the offer.");
    };

    const cancel_handler = () => {
        cancel_offer(application_id);
        update_application_message(application_id, "We've had to cancel the offer we inititally sent to you.");
    };

    const form_header = (title, text) => {
        return (
            <div className={styles.form__header}>
                <p>{title}</p>
                <small>{text}</small>
            </div>
        )
    };
    

    const form_selectable = (state, index, text, action) => {
        const selected = index === 0 ? 1 : 0;
        const handler = () => {
            if(state === index) { action(null) } else { action(index) }
        }
        return (
            <>
            {state === selected ? null : <div className={`${styles.grid__selectable} ${state === index ? styles.grid__selectable__active : null}`} onClick={() => handler()}>
                <p>{text}</p>
                <FaChevronRight />
            </div>}
            </>
        )
    }

    const form_info = (text) => (
        <div className={styles.info}>
            <IoMdInformationCircleOutline />
            <small>{text}.</small>
        </div>
    )

    const display = (
        <>     
        <p>Hourly rate: {day_rate}</p>
        <p>Salary with bonus: {parseInt(salary + Number(bonus_pay))}</p>
        <p>Annual Rate: {parseInt(salary * 12)}</p>
        <p>Annual Rate with bonus: {parseInt((salary * 12) + (bonus_pay * 12))}</p>
        </>
    )

    const start_time = <Times_List list={times_list} selector={(e) => {set_start_time_selected(e); set_form_display(0);}} selected={start_time_selected} />
    const end_time = <Times_List list={times_list} selector={(e) => {set_end_time_selected(e); set_form_display(0);}} selected={end_time_selected} />


    const flexible_hours = (
        <Number_Input value={working_hours} input={set_working_hours} tag="hours">Hours per week</Number_Input>
    )

    const fixed_hours = (
        <>
        <div className={styles.grid__row}>
            <p className={styles.grid__button} onClick={() => set_form_display(1)}>{start_time_selected === null ? "Start Time" : times_list[start_time_selected]}</p>
            <p>-</p>
            <p className={styles.grid__button} onClick={() => set_form_display(2)}>{end_time_selected === null ? "Finish Time" : times_list[end_time_selected]}</p>
        </div>
        <div className={styles.grid__row}>
            <Number_Input value={lunch_duration} input={set_lunch_duration} tag="hour(s)">Lunch Duration</Number_Input>
            <Check_box value={paid_lunch} input={set_paid_lunch}>Paid</Check_box>
        </div>
        </>
    )


    const hours_content = [fixed_hours, flexible_hours]

    const probation_form = (
        <>
        <Number_Input value={probation_duration} input={set_probation_duration} tag="months">Duration</Number_Input>
        <div className={styles.grid__row}>
            <Number_Input invalid={match_probation_salary} value={probation_salary} input={set_probation_salary} tag="/month">Salary</Number_Input>
            <Check_box value={match_probation_salary} input={set_match_probation_salary}>Salary</Check_box>
        </div>
        <div className={styles.grid__row}>
            <Number_Input invalid={match_probation_bonus} value={probation_bonus} input={set_probation_bonus} tag="/month">Bonus</Number_Input>
            <Check_box value={match_probation_bonus} input={set_match_probation_bonus}>Bonus</Check_box>
        </div>
        </>
    );

    const display_content = [display, start_time, end_time]

    const form = (
        <main className={styles.offer}>
            <section className={styles.form}>
                <img src={user_data.avatar} />
                <h4 class="bold medium">{user_data.name}</h4>
                <h2>Edit Offer</h2>
                <h4 class="bold medium">{job_data.title} at {job_data.company_name}</h4>
                    <section className={styles.grid}>
                        {form_header("Start Date", "Fill in required start date")}
                        <Text_Input_Alt value={start} input={set_start}>Date</Text_Input_Alt>

            
                        {form_header("Salary", "Fill in required salary per month")}
                        <Number_Input value={salary} input={set_salary} tag="/month">Salary</Number_Input>

                        {form_header("Bonus", "Fill in maximum bonus per month")}
                        <div className={styles.grid__column}>
                            {form_selectable(bonus, 0, "Bonus", set_bonus )}
                            {form_selectable(bonus, 1, "No Bonus", set_bonus )}
                        </div>

                        <div className={styles.grid__column}>
                            {bonus === 0 ?  <Number_Input value={bonus_pay} input={set_bonus_pay} tag="/month">Max Bonus</Number_Input> : null}
                        </div>
                        
                        {form_header("Hours", "Fill in required hours per day info")}

                        <div className={styles.grid__column}>
                            {form_selectable(hours, 0, "Fixed working hours per day", set_hours )}
                            {form_selectable(hours, 1, "Flexible working hours", set_hours )}
                        </div>

                        <div className={styles.grid__column}>
                            {hours_content[hours]}
                        </div>

                        {form_header("Annual Leave", "Fill in amount of paid annual leave")}
                        <Number_Input value={annual_leave} input={set_annual_leave} tag="Days">Annual leave days</Number_Input>

                        {form_header("Sick Leave", "Fill in amount of paid sick days")}
                        <Number_Input value={paid_sick} input={set_paid_sick} tag="Days">Paid Sick Days</Number_Input>

                        {form_header("Probation", "Fill in whether there is a probation period")}
                        <div className={styles.grid__column}>
                            {form_selectable(probation, 0, "Probation", set_probation )}
                            {form_selectable(probation, 1, "No probation", set_probation )}
                        </div>

                        <div className={styles.grid__column}>
                            {probation === 0 ? probation_form : null}
                        </div>

                        {form_header("Benefits", "Fill in additional benefits")}
                        <div className={styles.grid__row}>
                            <Text_Input_Alt value={benefits_input} input={set_benefits_input}>Benefit</Text_Input_Alt>
                            <div className={styles.action}><Button_Main size={"10rem"} action={() => {set_benefits([...benefits, benefits_input]); set_benefits_input("");}}>Add</Button_Main></div>
                        </div>
                        {benefits.map(item => <p class="bold medium">- {item}</p>)}

                        <div className={styles.grid__row}>
                            <Button_Main action={() => save_handler()}>Save Changes</Button_Main>
                            <Button_Main hollow={true} action={cancel_handler}>Cancel Offer</Button_Main>
                        </div>

                    </section>
              
            </section>
            <section className={styles.display}>
                {display_content[form_display]}
            </section>
        </main>
    )

    const contract = (
        <main className={styles.contract}>
            <section>
                <div className={styles.contract__image}></div>
                <p class="bold">Private and confidential</p>
                <p>{user_data.name}</p>
                <p>{get_now()}</p>
            </section>

            <section>
                <p class="bold">Dear {user_data.name.split(" ")[0]}</p>
                <p>We are pleased to offer you the position of <span class="bold">{job_data.title}</span> at <span class="bold">{job_data.company_name}</span>, with the following terms and conditions of employment</p>
            </section>

            <section>
                <p class="bold">Start Date</p>
                <p>{start}</p>
            </section>

            {probation === 0 ? <section>
                <p class="bold">Probation Period</p>
                <p>{probation_duration} months</p>
                <p>During your probation you'll be paid {match_probation_salary ? "the same as normal" : probation_salary} and {match_probation_bonus ? "the same bonus rates as normal" : `a maximum of ${probation_bonus} per month in bonuses.` }</p>
            </section> : null}

            <section>
                <p class="bold">Remuneration</p>
                <p> {probation === 0 ? "After successful completion of your probation, y" : "Y"}our salary will be calculated as follows:</p>
                <li>Base Salary = {salary}</li>
                {form_info("Your hourly rate is calculated using this base salary at 40 hours per week")}
                <li>Hourly Rate = {day_rate}</li>
                <li>Bonus - Up to {bonus}</li>
            </section>

            <section>
                <p class="bold">Hours and Leave</p>
                <p>{hours === 1 ? per_week : working_hours} per week</p>
                {hours === 1 ? <p>Fixed hours are {times_list[start_time_selected]} until {times_list[end_time_selected]} with {lunch_duration} hour(s) {paid_lunch ? "paid" : "unpaid"} for lunch Monday to Friday</p> : null}
                <p>{annual_leave} annual leave days</p>
                <p>{paid_sick} paid sick days</p>
            </section>

            {benefits.length === 0 ? null : <section>
                <p class="bold">Additional Benefits:</p>
                {benefits.map(item => <p>- {item}</p>)}
            </section>}
            <Button_Main action={() => set_selected(1)}>Edit Offer</Button_Main>

        </main>
    )


    const main = [contract, form]

    return main[selected];
};

export default Edit_Offer;
