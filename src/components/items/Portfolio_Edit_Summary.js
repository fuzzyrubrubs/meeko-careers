import { useState } from "react";
import styles from '../../styles/components/items/Portfolio_Entry.module.scss';
import Button_Main from "./Button_Main";

function Portfolio_Edit_Summary (props) {
    const [summary, set_summary] = useState(props.summary);

    const add_handler = () => {
        props.input({...props.value, summary: summary })
        props.save(summary);
        props.close(false);
    };

    return (
        <>
            <textarea className={styles.summary} value={summary} onChange={(e) => set_summary(e.target.value)} />
            <div className={styles.action}><Button_Main action={add_handler}>Save</Button_Main></div>
        </>
    )
}

export default Portfolio_Edit_Summary;