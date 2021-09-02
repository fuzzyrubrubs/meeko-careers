import styles from '../../styles/components/forms/Register.module.scss';
import Button_Main from '../items/Button_Main';
import Text_Input from '../items/Text_Input';

function Login (props) {
    const close_modal = () => {
        document.body.style.overflow = 'unset';
        props.close();
    }

    return (
        <main className="modal" onClick={close_modal}>
            <section className={styles.register} onClick={{}}>
                <section className={styles.content}>
                    <p>Meeko</p>
                    <h2>Login</h2>
                    <Text_Input>Email</Text_Input>
                    <Text_Input>Password</Text_Input>
                    <Button_Main>Login</Button_Main>
                    <p>Don't have an account? <span className="bold">Register</span></p>
                </section>
                <section className={styles.image}></section>
            </section>
        </main>
    )
}

export default Login;