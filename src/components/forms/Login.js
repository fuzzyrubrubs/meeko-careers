import React, { useState } from 'react';
import styles from '../../styles/components/forms/Register.module.scss';
import Button_Main from '../items/Button_Main';
import Text_Input from '../inputs/Text_Input';
import Password_Input from '../inputs/Password_Input';
import { sign_in } from '../../firebase/methods/User_Functions';

function Login (props) {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");

    const close_modal = (e) => {
        if(e.target.className == "modal") {
            document.body.style.overflow = 'unset';
            props.close();
        }
    }

    const submit_handler = () => {
        if(loader === false) {
            set_loader(true);
            sign_in({email: email, password: password}).then(result => {
                if(result === true) {
                    set_loader(false)
                   close_modal();
                } else {
                    set_loader(false);
                    set_status(result);
                };
            });
        };
    };  

    return (
        <main className="modal" onClick={close_modal}>
            <section className={styles.register} onClick={null}>
                <section className={styles.content}>
                    <p>Meeko</p>
                    <h2>Login</h2>
                    <Text_Input value={email} input={set_email}>Email</Text_Input>
                    <Password_Input value={password} input={set_password}>Password</Password_Input>
                    <Button_Main action={submit_handler}>Login</Button_Main>
                    <p>{status}</p>
                    <p>Don't have an account? <span className="bold">Register</span></p>
                </section>
                <section className={styles.image}></section>
            </section>
        </main>
    )
}

export default Login;