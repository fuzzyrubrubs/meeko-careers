import { useState } from 'react';
import styles from '../../styles/pages/Dashboard/Create_Task.module.scss';
import { useHistory } from 'react-router-dom';
import { interview_types } from '../../tools/global_variables';
import Button_Main from '../items/Button_Main';
import Create_Interview from './Create_Interview';

function Create_Task (props) {
    const history = useHistory();
    const type = props.type;
    const data = props.data;

    return (
       <Create_Interview data={data} />
    )
}

export default Create_Task;