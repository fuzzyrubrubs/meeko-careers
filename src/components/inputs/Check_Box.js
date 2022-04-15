import React, { useState } from 'react';
import styles from '../../styles/components/inputs/Toggle.module.scss';

function Check_box (props) {
    const value = props.value;
    const input = props.input;

    return (
        <div className={styles.toggle}>
            <div>
                <p className={styles.name}>{props.children}</p>
            </div>
            <div>
                <input defaultChecked={value} onChange={(e) => input(!value)} className={styles.input} type="checkbox" name={props.children} id={props.children} />
                <label for={props.children}></label>  
            </div>
        </div>
    );
};

export default Check_box;