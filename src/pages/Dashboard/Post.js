import React, { useContext } from 'react';
import styles from '../../styles/pages/Dashboard/Post.module.scss';
import { FiFileText, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaRegHourglass } from "react-icons/fa";
import Job_Process from '../../components/dashboard/Job_Process';
import { TiBriefcase } from "react-icons/ti";
import Candidates from './Post/Candidates';
import Interviews from './Post/Interviews';
import Calendar_Preview from '../../components/dashboard/Calendar_Preview';
import { calendar } from '../../tools/DateTime_Methods';
import Edit_Icon from '../../components/items/Edit_Icon';
import Pie_Chart from '../../components/charts/Pie_Chart';
import { MenuContext } from '../../contexts/Menu.context';
import Edit_Post from './Post/Edit_Post';
import Header from '../../components/headers/Header';
import Main from './Post/Main';
import Settings from './Post/Settings';


function Post (props) {
    const { set_options, selected, set_selected, set_title } = useContext(MenuContext);
    const data = props.data;

    const menu_options = ["Overview", "Applicants", "Interviews", "Edit Post", "Settings"];

    useEffect(() => {
        set_options(menu_options);
        set_title(data.title)
        return () => { 
            set_options([]);
            set_selected(0);
            set_title("");
        };
    }, []);


    const go_back = () => set_selected(0);

    const content = [<Main data={data} />, <Candidates data={data} />, <Interviews data={data} />, <Edit_Post data={data} />, <Settings data={data} />]

    return (
        <main> 
            <Header name={data.title}>{menu_options[selected]}</Header>
            {content[selected]}
        </main>
    ) 

};

export default Post;



