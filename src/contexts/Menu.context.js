import React, { createContext, useState, useEffect, useContext } from "react";


export const MenuContext = createContext();

export function MenuProvider(props) {
    const [selected, set_selected] = useState(0);
    const [options, set_options] = useState([]);
    const [title, set_title] = useState("");
    const [tasks, set_tasks] = useState([]);
    const [messages, set_messages] = useState([]);

    return (
        <MenuContext.Provider value={{ selected, set_selected, options, set_options, title, set_title }}>
            {props.children}
        </MenuContext.Provider>
    );

}