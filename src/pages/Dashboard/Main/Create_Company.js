import styles from '../../../styles/pages/Dashboard/Form.module.scss';
import Text_Input from '../../../components/inputs/Text_Input';
import Button_Main from '../../../components/items/Button_Main';
import { create_company } from '../../../firebase/methods/Company_Functions';
import { useContext, useState } from 'react';
import generatePushID from '../../../tools/IDGenerator';
import Requirements from '../../../components/dashboard/Requirements';
import Add_Managers from '../../../components/dashboard/Add_Managers';
import { AuthContext } from '../../../contexts/Auth.context';
import { useHistory } from 'react-router-dom';


function Create_Company (props) {
    const { user_data } = useContext(AuthContext)
    const [name, set_name] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);
    const [managers, set_managers] = useState([{name: user_data.name, avatar: user_data.avatar, id: user_data.id, email: user_data.email}]);
    const [invited_managers, set_invited_managers] = useState([]);
    const [location, set_location] = useState("");
    const [domain, set_domain] = useState("");
    const [industry, set_industry] = useState("");
    const [website, set_website] = useState("");
    const history = useHistory();

    const save_handler = () => {
        set_loader(true);
        const id = generatePushID();
        const formatted_managers = managers.map(item => ({id: item.id, level: user_data.id === item.id ? 2 : 1}))
        const formatted_invited_managers = invited_managers.map(item => ({email: item.email, level: 1}))

        try {
            create_company({id: id, name: name, location: location, industry: industry, website: website, managers: formatted_managers, invited_managers: formatted_invited_managers});
            set_loader(false);
            set_name("");
            set_status("Created");
            history.push('/');
        } catch(error) {
            set_status(error.message);
            set_loader(false);
        }
    };

    return (
        <main>
            {/* <Dashboard_Header back_handler={() => props.go_back()}>Create Company</Dashboard_Header> */}
                <section className={styles.form}>
                    <h1>Set up your Company</h1>
                    <p>Use this form to create a company to add employees and create job ads</p>
                    <Text_Input value={name} input={set_name}>Company name</Text_Input>
                    <Add_Managers value={managers} input={set_managers} invited_value={invited_managers} invited_input={set_invited_managers}>Managers</Add_Managers>
                    <Text_Input value={location} input={set_location}>Location</Text_Input>
                    <Text_Input value={domain} input={set_domain}>Domain</Text_Input>
                    <Text_Input value={industry} input={set_industry}>Industry</Text_Input>
                    <Text_Input value={website} input={set_website}>Website</Text_Input>
                    <Button_Main loader={loader} action={save_handler}>Create</Button_Main>
                    <p>{status}</p>
                </section>
        </main>
    )
}

export default Create_Company;