import { useState } from 'react';
import styles from '../../styles/pages/Dashboard/Create_Task.module.scss';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/Modal';
import Upload_Resume from '../tasks/Upload_Resume';
import Complete_Portfolio from '../tasks/Complete_Portfolio';
import Apply_Job from '../tasks/Apply_Job';
import Arrange_Interview from '../tasks/Arrange_Interview';

function Task (props) {
    const data = props.data;

    const content = [
        [<Upload_Resume />, <Complete_Portfolio />, <Apply_Job />],
        [<Arrange_Interview />]
    ]

    return content[data.category][data.type]
}

export default Task;