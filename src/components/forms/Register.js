import { useState } from 'react';
import styles from '../../styles/components/forms/Register.module.scss';
import { useHistory } from 'react-router-dom';
import Button_Main from '../items/Button_Main';
import Text_Input from '../inputs/Text_Input';
import Password_Input from '../inputs/Password_Input';
import { create_task, register_user } from '../../firebase/methods/User_Functions';
import Radio_Input from '../inputs/Radio_Input';

function Register (props) {
    const history = useHistory();
    const [stage, set_stage] = useState(0);
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [type, set_type] = useState(0);
    const [password, set_password] = useState("");
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");

    const close_modal = (e) => {
        if(e.target.className == "modal") {
            document.body.style.overflow = 'unset';
            props.close();
        }
    }

    console.log(type)

    const add_starter_tasks = () => {
        create_task()
    };

    const submit_handler = () => {
        if(loader === false) {
            set_loader(true);
            const user_main = {email, password};
            const user_profile = {name};
            register_user(user_main, user_profile).then(result => {
                if(result === true) {
                    set_stage(1);
                    add_starter_tasks(user_main, user_profile);
                } else {
                    set_loader(false);
                    set_status(result);
                };
            });
        };
    };  
    

    const first_screen = (
            <section className={styles.content}>
                <p>Meeko</p>
                <h2>Sign up</h2>
                <Text_Input value={name} input={set_name}>Full name</Text_Input>
                <Text_Input value={email} input={set_email}>Email</Text_Input>
                <Password_Input value={password} input={set_password}>Password</Password_Input>
                <Radio_Input options={["Applicant", "Employee", "Manager"]} input={set_type}>Account type</Radio_Input>
                <Button_Main loader={loader} action={submit_handler}>Get started</Button_Main>
                <p>{status}</p>
                <p>Already have an account? <span className="bold">Login</span></p>
            </section>
    );

    const second_screen = (
        <section className={styles.second_content}>
            <h2>Lorem ipsum</h2>
            <h5>Nullam posuere libero non tincidunt tincidunt. Phasellus tempus libero et purus eleifend mattis.</h5>
            <Button_Main action={() => history.push("/portfolio")}>Build Portfolio</Button_Main>
        </section>
    );

    const content = [first_screen, second_screen];

    return (
        <main className="modal" onClick={(e) => close_modal(e)}>
            <section className={styles.register} onClick={null}>
                {content[stage]}
                <section className={styles.image}></section>
            </section>
        </main>
    )
}

export default Register;