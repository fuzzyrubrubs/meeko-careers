import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth.context";


export const TasksContext = createContext();

export function TasksProvider(props) {
    const { all_ids } = useContext(AuthContext);
    const [tasks, set_tasks] = useState(null);
    
    useEffect(() => {
        const fetch_tasks = await get_all_tasks(all_ids);
    }, [])

    return (
        <TasksContext.Provider value={{ tasks }}>
            {props.children}
        </TasksContext.Provider>
    );

}