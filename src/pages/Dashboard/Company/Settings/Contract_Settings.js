import React, { useState } from 'react';
import Button_Main from '../../../../components/items/Button_Main';
import styles from '../../../../styles/pages/Dashboard/Company/Settings.module.scss';
import { form_header, form_selectable } from '../../../../tools/global_components';

function Contract_Settings (props) {
    const data = props.data;
    const [type, set_type] = useState(null);

    return (
        <main className={styles.modal}>
            <h2>Contracts</h2>
            <p class="bold">Contracts will be set out as onboarding tasks</p>
            {form_header("Form", "The default template is Meeko's typical contract.")}
            <div className={styles.grid__column}>
                {form_selectable(type, 0, "Default", set_type )}
                {form_selectable(type, 1, "Custom", set_type )}
            </div>

            <Button_Main>Save</Button_Main>
        </main>
    )
}

export default Contract_Settings;
