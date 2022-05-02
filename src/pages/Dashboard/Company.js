import { useState, useContext, useEffect } from 'react';
import { MenuContext } from '../../contexts/Menu.context';
import useMenu from '../../tools/useMenu';
import { listenRealTimeEmployees, listenRealTimePosts, listenRealTimeRota } from '../../tools/fetches';
import Header from '../../components/headers/Header';
import Missing from '../../components/UI/404';

import Main from './Company/Main';
import Employees from './Company/Employees';
import Recruitment from './Company/Recruitment';
import Automation from './Company/Automation';
import Settings from './Company/Settings';
import Office from './Company/Office';
import Invoices from './Company/Invoices';


function Company (props) {
    const { set_options, selected } = useContext(MenuContext);
    const data = props.data;
    const [employees, set_employees] = useState([]);
    const [posts, set_posts] = useState([]);
    const [rota, set_rota] = useState([]);
    
    const menu_options = ["Overview", "Employees", "Recruitment", "Automation", "Settings", data.office ? "Office" : null, data.invoices ? "Invoices" : null].filter(item => item);

    useMenu({menu: menu_options, title: data.name});

    useEffect(() => {
        set_options(menu_options);
    }, [data.office, data.invoices]);

    useEffect(() => {
        const unlistenEmployees = listenRealTimeEmployees(set_employees, data.id);
        const unlistenPosts = listenRealTimePosts(set_posts, data.id);
        const unlistenRota = listenRealTimeRota(set_rota, data.id);
        return () => { 
           unlistenEmployees();
           unlistenPosts();
           unlistenRota();
        };
    }, []);


    if(data === undefined) return <Missing />

    const content = [
        <Main data={data} />,
        <Employees data={data} employees={employees} />, 
        <Recruitment data={data} posts={posts} />,
        <Automation data={data} />,
        <Settings data={data} />, 
        data.office ? <Office data={data} rota={rota} /> : null,
        data.invoices ? <Invoices data={data}  /> : null,
    ].filter(item => item);


    return (
        <main> 
            <Header name={data.name} tasks={data.tasks}>{menu_options[selected]}</Header>
            {content[selected]}
        </main>
    );
};

export default Company;