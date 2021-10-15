import { useState } from "react";
import Dashboard_Header from "../../components/UI/Dashboard_Header";
import Application from '../../components/items/Application';


function Applications (props) {
    const [selected, set_selected] = useState(0);

    const display_name = "Applications";

    const back_handler = () => selected === 0 ? props.go_home() : set_selected(0);

    return (
        <main>
            <Dashboard_Header back_handler={back_handler}>{display_name}</Dashboard_Header>
            <Application />
            <Application />
            <Application />
            <Application />
        </main>
    )

}

export default Applications;