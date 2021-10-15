import styles from '../../styles/components/dashboard/Candidate.module.scss';
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

function Candidate () {
    return (
        <main className={styles.candidate}>
            <section className={styles.candidate__header}>
                <h5>Open</h5>
                <div className={styles.candidate__header__image}></div>
                <small>Software Developer</small>
                <h3>Anna Taylor</h3>
                <div>Resume</div>
            </section>

            <section className={styles.candidate__portfolio}>
                <small>07231 34322</small>
                <small>anna.taylor@meeko.com</small>
                <small>LinkedIn</small>
                <small>www.annataylor.com</small>
            </section>

            <section className={styles.candidate__summary}>
                <h5>Professional Summary</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus tincidunt ultrices. Aenean semper erat sed lacus cursus pulvinar. Nam sapien ligula, semper quis placerat porttitor, porttitor at lectus. Donec cursus pretium ante vitae mattis. Quisque eget orci risus. Maecenas et facilisis diam. </p>
            </section>
            <section className={styles.candidate__history}>
                <h5>Work Experience</h5>
                <div className={styles.candidate__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.candidate__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.candidate__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.candidate__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
            </section>

            <section className={styles.candidate__history}>
                <h5>Education</h5>
                <div className={styles.candidate__history__item}>
                    <p>Computer Science</p>
                    <p>Oxford University</p>
                    <p>4 years</p>
                </div>
                <div className={styles.candidate__history__item}>
                    <p>Student</p>
                    <p>Cambridge School</p>
                    <p>10 years</p>
                </div>
            </section>

            <section className={styles.candidate__actions}>
                <IoIosCloseCircle />
                <IoMdCheckmarkCircle />
            </section>


        </main>
    )
}

export default Candidate;