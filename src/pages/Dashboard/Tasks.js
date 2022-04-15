import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from "../../components/headers/Header";
import styles from '../../styles/pages/Dashboard/Tasks.module.scss';

function Tasks (props) {
    const location = useLocation();
    console.log(location)
    console.log(props)
    const [selected, set_selected] = useState(0);
    const [category, set_category] = useState(0);

    const array = [...props.posts.map(item => {
        const tasks = item.tasks.map(task => {
            return {name: item.title, type: "task", ...task}
        });
        const interviews = item.interviews.map(interview => {
            return {name: item.title, type: "interviews", ...interview}
        });
        return [...tasks, ...interviews]
        
    })]

    console.log(array)

    console.log(props)

    const interviews = props.applications.map(item => item.interviews).flat();

    const applications = props.applications.filter(item => item.interviews.filter(interview => interview.status < 5).length > 0);
    const jobs = props.jobs.filter(item => item.tasks.length > 0);
    const posts = props.posts.filter(item => item.tasks.length > 0);
    const companies = props.companies.filter(item => item.tasks.length > 0);

    console.log(interviews)

    return (
        <>
       <Header name={location.state ? location.state.name : "All"} back={true}>Tasks</Header>
       <main className={styles.main}>
            <section className={styles.menu}>
                <div className={`${styles.menu__item} ${selected === null ? styles.menu__item__active : null}`} onClick={() => {set_selected(null); set_category(0)}}><p>All</p></div>
                {applications.length === 0 ? null : (
                    <>
                    <p>Interview</p>
                    {applications.map((item, index) => <div className={`${styles.menu__item} ${selected === item.application_id ? styles.menu__item__active : null}`} onClick={() => set_selected(item.application_id)}><p>{item.job_data.title}</p>{item.interviews.length > 0 ? <p className={styles.menu__item__icon}>{item.interviews.length}</p> : null }</div>)}  
                    </>
                )}
                {jobs.length === 0 ? null : (
                    <>
                    <p>Employee</p> 
                    {jobs.map((item, index) => <div className={`${styles.menu__item} ${selected === index ? styles.menu__item__active : null}`} onClick={() => set_selected(index)}><p>{item.company_data.name}</p>{item.tasks.filter(task => task.complete === false).length > 0 ? <p className={styles.menu__item__icon}>{item.tasks.filter(task => task.complete === false).length}</p> : null }</div>)}  
                    </>
                )}
                {posts.length === 0 ? null : (
                    <>
                    <p>Recruitment</p> 
                    {posts.map((item, index) => <div className={`${styles.menu__item} ${selected === index ? styles.menu__item__active : null}`} onClick={() => set_selected(index)}><p>{item.title}</p>{item.tasks.filter(task => task.complete === false).length > 0 ? <p className={styles.menu__item__icon}>{item.tasks.filter(task => task.complete === false).length}</p> : null }</div>)}  
                </>
                )}
                {companies.length === 0 ? null : (
                    <>
                    <p>Management</p> 
                    {companies.map((item, index) => <div className={`${styles.menu__item} ${selected === index ? styles.menu__item__active : null}`} onClick={() => set_selected(index)}><p>{item.name}</p>{item.tasks.filter(task => task.complete === false).length > 0 ? <p className={styles.menu__item__icon}>{item.tasks.filter(task => task.complete === false).length}</p> : null }</div>)} 
                    </>
                )}

               
               
            </section>
            <section className={styles.tasks}>
                <h2>{selected === null ? "All" : "All"}</h2>
                <div className={styles.candidates__list}>
                    <div>Task</div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Tasks;