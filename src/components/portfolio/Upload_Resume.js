import React from 'react';
import styles from '../../styles/components/portfolio/Uploads.module.scss';

function Upload_Resume(props) {

    const upload_handler = (e) => {
        const file = e.target.files[0];
        props.file(file);
    };

    
    return (
        <div className={styles.resume}>
            Upload Resume
            <input className={styles.resume__input} name="doc" type="file" accept=".doc, .docx, .pdf, .rtf" onChange={(e) => upload_handler(e)} />    
        </div>
    )
};

export default Upload_Resume;