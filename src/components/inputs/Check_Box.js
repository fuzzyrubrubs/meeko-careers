import styles from '../../styles/components/inputs/Inputs.module.scss';

function Check_Box (props) {

    const check_handler = (e) => {
        console.log(e.target.value)
    };

    return (
        <div className={styles.check_box}>
            <input type="checkbox" value={true} onClick={(e) => check_handler(e)} checked />
            <p>{props.children}</p>
        </div>
    )
}

export default Check_Box;