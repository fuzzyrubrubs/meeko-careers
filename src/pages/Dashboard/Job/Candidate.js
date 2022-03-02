import styles from '../../../styles/pages/Dashboard/Candidate.module.scss';
import Button_Main from '../../../components/items/Button_Main';
import { FaChevronLeft, FaLinkedin } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import { useEffect, useState } from 'react';
import { interview_types } from '../../../tools/global_variables';
import Button_Modal from '../../../components/items/Button_Modal';


const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const List = (props) => <div className={styles.list}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;

function Candidate (props) {
    const data = props.data;
    const job_data = props.job_data;
    const stages = props.stages;
    const [status, set_status] = useState(0);
    const [closed, set_closed] = useState(false);
    const [open_task, set_open_task] = useState(false);
    const [shortlisted, set_shortlisted] = useState(data.shortlist);
    const [found_interview, set_found_interview] = useState(data.interview_data.filter(item => item.complete === false)[0]);

    /// if not shortlisted show shortlist button, if upcoming interview show correct interview 
    /// if shortlisted and no upcoming interviews and offers - set open options 
    /// list all options - remove interviews that already happened 

    const _get_status = () => {
        if(shortlisted === false) { set_status(0); return };
        if(found_interview.length > 0) { set_status(1); return };
        set_status(2);
    };

    useEffect(() => {
        _get_status();
    }, [shortlisted, found_interview]);

    const _shortlist = () => {
        // update user profile 
        set_shortlisted(true);
    };

    const open_interview = (interview) => {
        console.log(interview);
    };

    const create_interview = (item) => {
        console.log(item)
    };

    const _filter_interviews = job_data.interview_template.filter(item => {
        const _d = data.interview_data.filter(ele => ele.order === item.order)[0];
        return _d === undefined ? true : false;
    });

    const _options = (
        <div>
            {_filter_interviews.map(item => <Button_Modal action={(obj) => create_interview(obj)} data={{interview_data: item, user_data: data, job_data: job_data}}>{interview_types[item.type]}</Button_Modal>)}
            <Button_Modal>Make offer</Button_Modal>
        </div>
    );


    const _action = [<Button_Main action={_shortlist}>Shortlist</Button_Main>, <Button_Main action={() => open_interview(found_interview)}>{interview_types[found_interview.type]}</Button_Main>, _options]
    
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
                    {/* <Button_Main>Resume</Button_Main>
                    <Button_Main hollow={true}>Messages</Button_Main> */}
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
                    {_action[status]}
                </section>
                <section>
                    <p>Close Application</p>
                </section>
            </section>
        </main>
    )
}

export default Candidate;

// function interview_window {
//     return (
//         <div></div>
//     )
// };



