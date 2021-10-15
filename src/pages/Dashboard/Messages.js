import { useState } from "react";
import Dashboard_Header from "../../components/UI/Dashboard_Header"



function Messages (props) {
    const [selected, set_selected] = useState(0)

    const back_handler = () => selected === 0 ? props.go_home() : set_selected(0);

    return (
        <main>
            <Dashboard_Header back_handler={back_handler}>Messages</Dashboard_Header>
            <p>Coming soon</p>
        </main>
    )
}

export default Messages