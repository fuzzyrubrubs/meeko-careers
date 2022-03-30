import React, { createContext, useState, useEffect, useContext } from "react";


export const MenuContext = createContext();

export function MenuProvider(props) {
    const [selected, set_selected] = useState(0);
    const [options, set_options] = useState([]);
    const [title, set_title] = useState("");
    const [tasks, set_tasks] = useState([]);
    const [messages, set_messages] = useState([]);
    const [hide_header, set_hide_header] = useState(false);

    return (
        <MenuContext.Provider value={{ selected, set_selected, options, set_options, title, set_title, hide_header, set_hide_header }}>
            {props.children}
        </MenuContext.Provider>
    );

}