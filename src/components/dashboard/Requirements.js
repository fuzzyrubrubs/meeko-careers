import { useState } from 'react';
import styles from '../../styles/components/dashboard/Requirements.module.scss';
import Text_Input from '../inputs/Text_Input';
import Button_Main from '../items/Button_Main';

function Requirements (props) {
    const [skill, set_skill] = useState("");
    const data = props.value;
 

    const add_handler = () => {
        props.input([...data, skill]);
        set_skill("");
    }

    return (
        <div className={styles.requirements}>
            <label>{props.children}</label>
            <div className={styles.requirements__action}>
                <Text_Input value={skill} input={set_skill} />
                <Button_Main no_margin={true} size={"10rem"} action={add_handler}>Add</Button_Main>
            </div>
            {data.map(item => <p>- {item}</p>)}
        </div>
    )
}

export default Requirements;