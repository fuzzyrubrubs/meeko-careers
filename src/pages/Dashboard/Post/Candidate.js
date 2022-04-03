import styles from '../../../styles/pages/Dashboard/Candidate.module.scss';
import Button_Main from '../../../components/items/Button_Main';
import { FaChevronLeft, FaLinkedin, FaTimes, FaPen, FaStar } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { useEffect, useState, useContext } from 'react';
import { interview_icons, interview_types } from '../../../tools/global_variables';
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
import { update_application_message, update_application_status } from '../../../firebase/methods/Applicant_Functions';
import Click_Modal from '../../../components/items/Click_Modal';
import View_Interview from '../../../components/dashboard/Tasks/View_Interview';


const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Candidate (props) {
    const { set_hide_header } = useContext(MenuContext);
    const data = props.data;
    const job_data = props.job_data;
    const stages = props.stages;
    const [shortlist, set_shortlist] = useState(data.status >= 2);
    const [status, set_status] = useState(data.status);

    const history = useHistory();

    const update_status = async (num) => {
        update_application_status(data.application_id, num)
    };

    useEffect(() => {
        set_hide_header(true);
        if(status === 0) { update_status(1) }
        return () => { 
           set_hide_header(false);
        };
    }, []);
    

    const active_interview = data.interviews.find(item => item.completed === false);

    const _shortlist = () => {
        if(status <= 2) { 
            update_status(2);
            update_application_message(data.application_id, job_data.templates.shortlist);
        }
        set_shortlist(true);
    };

    const interview_item = (item) => {
        return (
            <div className={styles.interviews__item}>
                {/* <p>{}</p> */}
                {interview_icons[item.type]}
            </div>
        )
    };

    const interview_create = (
        <div className={styles.interviews__create}>
            <IoIosAdd />
        </div>
    )


    return (
        <>
        <section className={styles.header}>
            <div className={styles.header__title}>
                <div className={styles.header__row}>
                    {/* <span onClick={() => props.go_back()}><FaChevronLeft /></span> */}
                    <h5>Applicant</h5>
                    <div class="small_button">{stages[data.status]}</div>
                </div>
                <h1>{data.user_data.name}</h1> 
            </div>
            {shortlist ? null : <div onClick={_shortlist} className={`${styles.header__icon} ${shortlist ? styles.header__icon__star : null}`}><FaStar /></div>}
            <Link to="/dashboard/messages" className={styles.header__icon}><FaPen /></Link>
            <Link to="/dashboard/messages" className={styles.header__icon}><FiMessageSquare /></Link>
            <div onClick={() => props.go_back()} className={`${styles.header__icon} ${styles.header__icon__red}`}><FaTimes /></div>
        </section>

        <main className={styles.main}>
            <section>

                <div className={styles.portfolio}>
                    <section className={styles.portfolio__urls}>
                        <p><FaLinkedin /> {data.user_data.linkedIn ? data.user_data.linkedIn : "Not listed"}</p>
                        <p><MdWeb /> {data.user_data.website ? data.user_data.website : "Not listed"}</p>
                        <p><MdWeb /> View Resume</p>
                    </section>


                    <section className={styles.interviews}>
                        <h5 class="bold">Interviews</h5>
                        <div className={styles.interviews__items}>
                            {data.interviews.map(item => <Click_Modal content={interview_item(item)}><View_Interview data={item} user_data={data.user_data} /></Click_Modal>)}
                            <Click_Modal content={interview_create}>{!active_interview ? <h1>You already have an interview</h1> : <Arrange_Interview application_data={data} job_data={job_data} user_data={data.user_data} />}</Click_Modal>
                        </div>
                    </section>

                    <section className={styles.portfolio__summary}>
                        <h5 class="bold">Professional Summary</h5>
                        <p>{data.user_data.summary}</p>
                    </section>

                    <section className={styles.portfolio__history}>
                        <h5 class="bold">Work Experience</h5>
                        {data.user_data.experience.map(item => (
                            <div className={styles.portfolio__history__item}>
                                <p>{item.job}</p>
                                <p>{item.company}</p>
                                <p>{item.years} years, {item.months} months</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.portfolio__history}>
                        <h5 class="bold">Education</h5>
                        {data.user_data.education.map(item => (
                            <div className={styles.portfolio__history__item}>
                                <p>{item.job}</p>
                                <p>{item.company}</p>
                                <p>{item.years} years</p>
                            </div>
                        ))}     
                    </section>
                </div>
            </section>


            <section className={styles.profile}>
                <div className={styles.profile__header}>
                    <div className={styles.profile__header__image} style={{"backgroundImage": `url(${data.user_data.avatar})`}}></div>
                    <small>{data.user_data.title}</small>
                    <h4>{data.user_data.name}</h4> 
                </div>

                <div className={styles.profile__grid}>
                    <div><p class="bold">Phone</p></div>
                    <div><p>{data.phone}</p></div>
                    <div><p class="bold">Email</p></div>
                    <div><p>anna@gmail.com</p></div>
                    <div><p class="bold">Location</p></div>
                    <div><p>Kyiv, Ukraine</p></div>
                    <div><p class="bold">Apply Date</p></div>
                    <div><p>25/02/2022</p></div>
                </div>

                <div>
                    <p>Make Offer</p>
                    <p>Close Application</p>
                </div>
            </section>
        </main>
        </>
    )
}

export default Candidate;




            
                {/* <section className={styles.profile__actions}>
                    {shortlist ? null : <Button_Main action={() => _shortlist()}>Shortlist</Button_Main>}
                    {data.interviews.map(item => <Button_Modal name="View Interview"><View_Interview data={item} user_data={data.user_data} /></Button_Modal>)}
                    {active_interview ? null : <Button_Modal type={0} name="Arrange Interview"><Arrange_Interview data={job_data} user_data={data.user_data} /></Button_Modal>}
                    <Button_Main>Make offer</Button_Main>
                </section> */}
