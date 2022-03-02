import styles from '../../../styles/pages/Dashboard/Hiree.module.scss';
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Dashboard_Header from '../../../components/UI/Dashboard_Header';
import Button_Main from '../../../components/items/Button_Main';

function Hiree (props) {


    return (
        <>
        <Dashboard_Header no_margin={true} back_handler={() => props.go_back()}>Employee - Probation</Dashboard_Header>
        <main className={styles.hiree}>
            <section className={styles.profile}><Profile /></section>
            <section className={styles.portfolio}><Portfolio /></section>
            <section className={styles.list}><List /></section>     
        </main>
        </>
    )
}

export default Hiree;


function Profile () {
    return (
        <>
            <section className={styles.profile__header}>
                <div className={styles.profile__header__image}></div>
                <small>Software Developer</small>
                <h4>Anna Taylor</h4>
                <Button_Main>Contract</Button_Main>
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
                <p>Add Task</p>
                <p>Offboard</p>
            </section>
        </>
    )
};

function Messages () {

};

function Portfolio () {
    return (
            <>
            <section className={styles.portfolio}>
                <p>Status</p>
                <p>Employee</p>
                <p>Position</p>
                <p>Software Developer</p>
                <p>Start Date</p>
                <p>18/09/2021</p>
                <p>End Date</p>
                <p>---</p>
                <p>Probation</p>
                <p>6 months/Complete</p>
            </section>


            <section>
                <p>Onboarding tasks</p>
                <p>2/4</p>
            </section>

            <section>
                
            </section>
        </>
    );
}


function List () {
    return (
        <div>
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
            <Hiree_Preview />
        </div>        
    )
};

function Hiree_Preview (props) {
    return (
        <div onClick={() => props.select()} className={styles.preview}>
            <div className={styles.preview__image}></div>
            <p>Anna Taylor</p>
            <small>Hired</small>
        </div>
    )
};