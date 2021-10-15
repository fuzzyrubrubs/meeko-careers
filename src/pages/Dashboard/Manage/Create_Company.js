import styles from '../../../styles/pages/Dashboard.module.scss';
import Text_Input from '../../../components/inputs/Text_Input';
import Button_Main from '../../../components/items/Button_Main';
import { create_company } from '../../../firebase/methods/Company_Functions';
import { useState } from 'react';
import generatePushID from '../../../tools/IDGenerator';
import Dashboard_Header from '../../../components/UI/Dashboard_Header';


function Create_Company (props) {
    const [name, set_name] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);

    const save_handler = () => {
        set_loader(true);
        const id = generatePushID();
        try {
            create_company({id: id, name: name})
            set_loader(false);
            set_name("");
            set_status("Created");
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    }

    return (
        <main>
            <Dashboard_Header back_handler={() => props.go_back()}>Create Company</Dashboard_Header>
             <section className={styles.content}>
                    <Text_Input value={name} input={set_name}>Company name</Text_Input>
                    <Button_Main loader={loader} action={save_handler}>Create</Button_Main>
                    <p>{status}</p>
                </section>
        </main>
    )
}

export default Create_Company;