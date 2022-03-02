import styles from '../../styles/global/Containers.module.scss'

const Header = (props) => <h4 className={styles.header}>{props.children}</h4>;
const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const Column = (props) => <div className={styles.column}>{props.children}</div>;
const Row = (props) => <div className={styles.row} style={{gap: props.gap}}>{props.children}</div>


export { Grid, Column, Header, Row }