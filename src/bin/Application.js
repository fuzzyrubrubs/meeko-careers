import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/components/items/Application.module.scss';

function Application (props) {
    const data = props.data;
    const status = data.status;

    return (
        <div className={styles.application}>

            <div className={styles.job} onClick={() => props.select()}>
                {/* LINK */}
                <h5>Software Developer</h5>
                <p>Lucidica</p>
            </div>

            <div className={styles.steps}>
                <Application_Step status={status} step={1} name={"Applied"} />
                <Application_Step status={status} step={2} name={"Review"} />
                <Application_Step status={status} step={3} name={"Shortlisted"} />
                {data.interviews.map((item, index) => <Application_Step status={status} step={4 + index} name={item} />)}
                <Application_Step status={status} step={4 + data.interviews.length} name={"Accepted"} end={true} />
            </div>

        </div>
    );
};

export default Application;


function Application_Step (props) {
    return (
        <>
        <div className={`${styles.steps__step} ${props.status >= props.step -1 ? styles.steps__active : null}`}><p class="bold">{props.step}</p><small>{props.name}</small></div>
        {props.end ? null : <div className={styles.steps__divider}></div> }
        </>
    )
};