import styles from '../styles/pages/Portfolio.module.scss';
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdWebAsset, MdEdit } from "react-icons/md";


function Portfolio () {
    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div>
                    <img className={styles.profile__avatar} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    <h3>Anna Taylor</h3>
                    <p>Front end developer</p>
                </div>
                <div className={styles.profile__details}>
                    <p><FiMail /> anna.taylor@gmail.com</p>
                    <p><FaLinkedin />linkedin</p>
                    <p><MdWebAsset /> website</p>
                </div>
                <div><p>Downnload Resume</p></div>
            </section>
            <section className={styles.resume}>
                <div>
                    <h3>Professional Summary<span><MdEdit /></span></h3>
                    <p></p>
                </div>
                <div>
                    <h3>Work Experience<span><MdEdit /></span></h3>
                </div>
                <div>
                    <h3>Education<span><MdEdit /></span></h3>
                </div>
            </section>
        </main>
    );
};

export default Portfolio;