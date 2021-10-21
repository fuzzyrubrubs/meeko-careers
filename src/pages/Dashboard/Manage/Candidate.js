import styles from '../../../styles/pages/Dashboard/Candidate.module.scss';
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Button_Main from '../../../components/items/Button_Main';

function Candidate (props) {


    return (
        <>
        <Dashboard_Header no_margin={true} back_handler={() => props.go_back()}>Candidate - Applied</Dashboard_Header>
        <main className={styles.candidate}>
            <section className={styles.profile}><Profile /></section>
            <section className={styles.portfolio}><Portfolio /></section>
            <section className={styles.list}><List /></section>     
        </main>
        </>
    )
}

export default Candidate;


function Profile () {
    return (
        <>
            <section className={styles.profile__header}>
                <div className={styles.profile__header__image}></div>
                <small>Software Developer</small>
                <h4>Anna Taylor</h4>
                <Button_Main>Resume</Button_Main>
                <Button_Main hollow={true}>Messages</Button_Main>
                
            </section>

            <section>
                <small class="medium">Location</small>
                <h4>Ukraine, Kiev</h4>
            </section>

            <section className={styles.profile__portfolio}>
                <small class="medium">Contact</small>
                <p class="bold">07231 34322</p>
                <p class="bold">anna.taylor@meeko.com</p>
            </section>

            <section className={styles.profile__actions}>
                <p>Arrange Call</p>
                <p>Close</p>
            </section>
        </>
    )
};

function Messages () {

};

function Portfolio () {
    return (
            <>
            <section className={styles.portfolio__urls}>
                <p>LinkedIn</p>
                <p>www.annataylor.com</p>
            </section>
            <section className={styles.portfolio__summary}>
                <h5>Professional Summary</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus tincidunt ultrices. Aenean semper erat sed lacus cursus pulvinar. Nam sapien ligula, semper quis placerat porttitor, porttitor at lectus. Donec cursus pretium ante vitae mattis. Quisque eget orci risus. Maecenas et facilisis diam. </p>
            </section>
            <section className={styles.portfolio__history}>
                <h5>Work Experience</h5>
                <div className={styles.portfolio__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.portfolio__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.portfolio__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
                <div className={styles.portfolio__history__item}>
                    <p>Software Developer</p>
                    <p>Lucidica</p>
                    <p>5 months</p>
                </div>
            </section>

            <section className={styles.portfolio__history}>
                <h5>Education</h5>
                <div className={styles.portfolio__history__item}>
                    <p>Computer Science</p>
                    <p>Oxford University</p>
                    <p>4 years</p>
                </div>
                <div className={styles.portfolio__history__item}>
                    <p>Student</p>
                    <p>Cambridge School</p>
                    <p>10 years</p>
                </div>
            </section>
        </>
    );
}


function List () {
    return (
        <div>
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
            <Candidate_Preview />
        </div>        
    )
};

function Candidate_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <div className={styles.preview__image}></div>
            <p>Anna Taylor</p>
            <small>Applied</small>
        </div>
    )
};