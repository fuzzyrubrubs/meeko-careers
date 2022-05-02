import Header from "../../components/headers/Header";
import styles from '../../styles/pages/Dashboard/Job.module.scss';
import { useState, useContext, useEffect } from 'react';
import { MenuContext } from '../../contexts/Menu.context';
import Main from "./Job/Main";
import Contract from "./Job/Contract";
import Finance from "./Job/Finance";
import Office from "./Job/Office";


function Job (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;

    const menu_options = ["Employee", "Finance", "Contract"];
    if(data.company_data.office === true) { menu_options.push("Office") }

    useEffect(() => {
        set_options(menu_options);
        set_title(data.company_data.name);
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);

    if(data === undefined) return <h1>Not found</h1>

    const content = [
        <Main data={data} />,
        <Finance data={data} />,
        <Contract data={data} />,
    ];

    if(data.company_data.office === true) { content.push(<Office data={data} />) }


    return (
        <main> 
            <Header name={data.company_data.name} tasks={data.tasks}>{menu_options[selected]}</Header>
            {content[selected]}
        </main>
    ) 
}

export default Job;