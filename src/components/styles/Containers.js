import styles from '../../styles/global/Containers.module.scss'

const Grid = (props) => <div className={styles.grid} style={{gridTemplateColumns: props.columns, gridTemplateRows: props.rows}}>{props.children}</div>;
const Grid_Header = (props) => <h4 className={styles.header}>{props.children}</h4>;
const Grid_Column = (props) => <div className={styles.column}>{props.children}</div>;
const Grid_Row = (props) => <div className={styles.row} style={{gap: props.gap}}>{props.children}</div>


export { Grid, Grid_Column, Grid_Header, Grid_Row }