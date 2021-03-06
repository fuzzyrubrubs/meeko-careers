import styles from '../../styles/components/UI/Dashboard_Header.module.scss';
import { FaChevronLeft } from "react-icons/fa";

function Dashboard_Header (props) {

    return <section style={props.no_margin ? null : {marginBottom: "4rem"}} className={styles.header}><div onClick={props.back_handler}><FaChevronLeft /> <h2>{props.children}</h2></div></section>;
};

export default Dashboard_Header;