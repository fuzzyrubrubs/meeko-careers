

import React, { useState, useEffect } from 'react';
import { get_event_invites_ids } from '../../firebase/methods/User_Functions';
import Button_Main from './Button_Main';
import { accept_event_invite, add_event_request, get_event_requests, remove_event_request, remove_joiner } from '../../firebase/methods/Event_Functions';

function Event_Action_Button(props){
    const user_id = props.user_id;
    const event_id = props.event_id;
    const group_id = props.group_id;
    const joiners = props.joiners;
    const group_members = props.group_members;

    const [status, set_status] = useState(0);
    const [loader, set_loader] = useState(true);
    const [error, set_error] = useState("");

    useEffect(() => {
        const fetch_data = async () => {
            const request_data = await get_event_requests(event_id);
            if(request_data.includes(user_id)) { set_status(1); set_loader(false); return; }
            if(joiners.includes(user_id)) { set_status(2);  set_loader(false); return; }
            if(group_members.includes(user_id)) { set_status(3);  set_loader(false); return; }
            const users_invites = await get_event_invites_ids(user_id);
            if(users_invites.includes(event_id)) { set_status(3);  set_loader(false); return; }
            set_loader(false);
        };
        fetch_data();
    }, [event_id]);


    const stages = [{name: "New", action: 0, action_name: "Shortlist"}, "Applied", "Qualified", ...data.interview_template.map(item => interview_types[item.type]), "Accepted"]

    const stages = ["Shortlist", "Arrange Call", "Arrange Video Call", "Pending", "Make Offer"];
    const _actions = [Add_Shortlist(), (data) => Open_Interview(data)]

    const error_handler = () => alert("Error");

    const action_handler = async () => {
        set_loader(true);
        if(status === 0) { add_event_request(user_id, event_id, group_id).then(result => result === true ? set_status(1) : error_handler()); }
        if(status === 1) { remove_event_request(user_id, event_id).then(result => result === true ? set_status(0) : error_handler()); }
        if(status === 2) { remove_joiner(user_id, event_id).then(result => result === true ? set_status(0) : error_handler()); }
        if(status === 3) { accept_event_invite(user_id, event_id, group_id).then(result => result === true ? set_status(2) : error_handler()); }
        set_loader(false);
    };

    return <Button_Main error={error} loader={loader} action={_actions[stages[status].action] }>{stages[status].name}</Button_Main>;

};

export default Event_Action_Button;