import styles from '../../../styles/pages/Dashboard/Candidate.module.scss';
import Button_Main from '../../../components/items/Button_Main';
import { FaChevronLeft, FaLinkedin } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { useEffect, useState } from 'react';
import { interview_types } from '../../../tools/global_variables';
import Button_Modal from '../../../components/items/Button_Modal';
import { populate_24_hours, populate_30_days } from '../../../tools/DateTime_Methods';
import Dates_List from '../../../components/lists/Dates_List';
import Times_List from '../../../components/lists/Times_List';
import moment from 'moment';
import Text_Input from '../../../components/inputs/Text_Input';
import Textarea_Input from '../../../components/inputs/Textarea_Input';
import Arrange_Interview from '../../../components/dashboard/Tasks/Arrange_Interview';


const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Candidate (props) {
    const data = props.data;
    const job_data = props.job_data;
    const stages = props.stages;
    const [shortlist, set_shortlist] = useState(data.shortlist);
    

    console.log(data)
    console.log(job_data)
    console.log(data.interviews)

    const active_interview = data.interviews.find(item => item.completed === false);

    console.log(active_interview)


    const _shortlist = () => {
        // shortlist_candiate(data.user_id, data.post_id);
        set_shortlist(true);
    };

    return (
        <main className={styles.main}>
            <section>
                <header className={styles.header}><div onClick={() => props.go_back()}><FaChevronLeft /> <h2>Applicant</h2></div> <span> <p>{data.company_name}</p></span></header>
                <div className={styles.portfolio}>
                    <section className={styles.portfolio__urls}>
                        <p><FaLinkedin /> {data.user_data.linkedIn ? data.user_data.linkedIn : "Not listed"}</p>
                        <p><MdWeb /> {data.user_data.website ? data.user_data.website : "Not listed"}</p>
                        <div class="small_button">{stages[data.status]}</div>
                    </section>

                    <section>
                      <div class="small_button" style={{width: "15rem"}}>View Resume</div>
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
                <section className={styles.profile__header}>
                    <div className={styles.profile__header__image} style={{"backgroundImage": `url(${data.user_data.avatar})`}}></div>
                    <small>{data.user_data.title}</small>
                    <h4>{data.user_data.name}</h4> 
                </section>

                <section>
                    <small class="medium">Location</small>
                    <h4>Ukraine, Kiev</h4>
                </section>

                <section className={styles.profile__portfolio}>
                    <small class="medium">Contact</small>
                    <p class="bold">{data.phone}</p>
                    <p class="bold">{data.email}</p>
                    {/* <p class="bold">0 Messages</p> */}
                </section>

            
                <section className={styles.profile__actions}>
                    {shortlist ? null : <Button_Main action={() => _shortlist()}>Shortlist</Button_Main>}
                    {data.interviews.map(item => <Button_Modal name="View Interview"><View_Interview data={item} user_data={data.user_data} /></Button_Modal>)}
                    {active_interview ? null : <Button_Modal name="Arrange Interview"><Arrange_Interview data={job_data} user_data={data.user_data} /></Button_Modal>}
                    <Button_Main>Make offer</Button_Main>
                </section>

                <section>
                    <p>Close Application</p>
                </section>
            </section>
        </main>
    )
}

export default Candidate;


function View_Interview (props) {
    const data = props.data;
    const user_data = props.user_data;
    console.log(data)

    return (
        <main className={styles.view_interview}>
            <section>
                <p>Status: Pending</p>
            </section>

        </main>
    )
}
