import { useEffect, useState } from "react";
import Dashboard_Header from "../../components/UI/Dashboard_Header";
import Application from '../../components/items/Application';
import { get_applications } from "../../firebase/methods/User_Functions";
import Job_Preview from "../../components/jobs/Job_Preview";
import Job from "../../components/jobs/Job";


function Applications (props) {
    const [selected, set_selected] = useState(false);
    const [applications, set_applications] = useState([]);
    const [loader, set_loader] = useState(true);

    useEffect(() => {
        const fetch_data = async () => {
            const applications_data = await get_applications(props.user_id);
            set_applications(applications_data);
        };
        fetch_data();
        set_loader(false);
    }, []);


    const select_handler = (id) => set_selected(id);
    const back_handler = () => selected === false ? props.go_home() : set_selected(false);

    const main = (
        <main>
            <Dashboard_Header back_handler={back_handler}>Applications</Dashboard_Header>
            {applications.map((item) => <Application select={() => select_handler(item.job_id)} data={item} />)}
        </main>
    );

    console.log(selected)
    // data={jobs[selected]} applied={check_status(jobs[selected].id)}
    const display_content = selected !== false ? <Job id={selected} go_back={back_handler} applied={false} /> : main;

    return display_content;

}

export default Applications;