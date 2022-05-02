import styles from '../styles/components/global.module.scss';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const form_header = (title, text) => {
    return (
        <div className={styles.form__header}>
            <p>{title}</p>
            <small>{text}</small>
        </div>
    )
};

const form_selectable = (state, index, text, action) => {
    const handler = () => {
        if(state === index) { action(null) } else { action(index) }
    }
    return (
        <>
        {state !== index && state !== null ? null : <div className={`${styles.form__selectable} ${state === index ? styles.form__selectable__active : null}`} onClick={() => handler()}>
            <p>{text}</p>
            <FaChevronRight />
        </div>}
        </>
    )
}

const form_action = (state, index, text, action) => {
    const handler = () => {
        if(state === index) { action(null) } else { action(index) }
    }
    return (
        <>
        {state !== index && state !== null ? null : <div className={`${styles.form__selectable} ${state === index ? styles.form__selectable__active : null}`} onClick={() => handler()}>
            <p>{text}</p>
            <FaChevronRight />
        </div>}
        </>
    )
}

const form_info = (text) => (
    <div className={styles.form}>
        <IoMdInformationCircleOutline />
        <small>{text}.</small>
    </div>
)

const Modal = (props) => <section className={styles.modal} style={{height: `${props.height}%`, width: `${props.width}%`}}>{props.children}</section>

const Line = (props) => (
    <div className={styles.line}>
        <small>{props.children}%</small>
        <div className={styles.line__bar}><span style={{width: `${props.children}%`}}></span></div>
    </div>
);

const Table = (props) => <div className={styles.table}>{props.children}</div>

const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows, height: `${props.height}rem`}}>{props.children}</div>;
const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;
const Column = (props) => <div className={styles.column} style={{gap: `${props.gap}rem`, marginTop: `${props.marginTop}rem`, overflow: `${props.fixed ? "initial" : "auto"}`}} >{props.children}</div>;
const ColumnCentered = (props) => <div className={styles.column} style={{gap: `${props.gap}rem`, marginTop: `${props.marginTop}rem`, alignItems: "center"}}>{props.children}</div>;
const ColumnSpaced = (props) => <div className={styles.columnSpaced} style={{gap: props.gap, marginTop: props.marginTop}}>{props.children}</div>;
const Row = (props) => <div className={styles.row} style={{gap: `${props.gap}rem`, marginTop: `${props.marginTop}rem`}}>{props.children}</div>

export { form_header, form_selectable, form_info, Grid, Column, ColumnSpaced, ColumnCentered, Header, Row, Modal, Line, Table }