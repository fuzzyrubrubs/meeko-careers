import styles from '../../styles/pages/Landing.module.scss';
import Image from '../../assets/landing-full.jpg';


function Header () {
    return (
        <main className={styles.header}>
            <section className={styles.header__content}>
                <h1>Lorem ipsum dolor sit amet</h1>
                <h5>Ut pharetra placerat felis, sit amet sagittis ex tincidunt at. Duis tincidunt tincidunt erat sit amet semper.</h5>
                <div className={styles.header__action}>
                    <input className={styles.header__action__input} placeholder="email" />
                    <input className={styles.header__action__input} placeholder="password" />
                    <div className={styles.header__action__button}>Login</div>
                    <div className={styles.header__action__or}>OR</div>
                    <div className={styles.header__action__button}>Find Jobs</div>
                </div>
            </section>
            <section className={styles.header__image}>
                <img src={Image} />
            </section>
        </main>
    );
};

export default Header;