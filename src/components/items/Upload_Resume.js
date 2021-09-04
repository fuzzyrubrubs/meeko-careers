import React from 'react';
import styles from '../../styles/components/items/Uploads.module.scss';

function Upload_Resume(props) {

    const upload_handler = (e) => {
        const file = e.target.files[0];
        console.log(e)
        props.file(file);
    }
    
    return <input className={styles.resume} name="doc" type="file" accept=".doc, .docx, .pdf, .rtf" onChange={(e) => upload_handler(e)} />
}

export default Upload_Resume;