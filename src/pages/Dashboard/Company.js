import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Job_Status from '../../components/previews/Post_Preview';
// import { Grid, Header, Row } from '../../components/styles/Containers';
import styles from '../../styles/pages/Dashboard/Company/Company.module.scss';
import Job from './Post';
import Employees from './Company/Employees';
import { MenuContext } from '../../contexts/Menu.context';
import Settings from './Company/Settings';
import Recruitment from './Company/Recruitment';
import Main from './Company/Main';
import Header from '../../components/headers/Header';
import Automation from './Company/Automation';

function Company (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;

    const menu_options = ["Overview", "Employees", "Recruitment", "Automation", "Settings"];

    useEffect(() => {
        set_options(menu_options);
        set_title(data.name);
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);

    if(data === undefined) return <h1>Not found</h1>

    const content = [
        <Main data={data} />,
        <Employees data={data} />, 
        <Recruitment data={data} />,
        <Automation data={data} />,
        <Settings data={data} />, 
    ];


    return (
        <main> 
            <Header name={data.name} tasks={data.tasks}>{menu_options[selected]}</Header>
            {content[selected]}
        </main>
    ) 
}

export default Company;