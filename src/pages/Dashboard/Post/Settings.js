import React, { useState } from 'react';
import Edit_Icon from '../../../components/items/Edit_Icon';
import Edit_Area from '../../../components/inputs/Edit_Area';
import { update_post } from '../../../firebase/methods/Post_Functions';
import styles from '../../../styles/pages/Dashboard/Post/Settings.module.scss';


function Settings (props) {
    const data = props.data;
    const [templates, set_templates] = useState(data.templates)
    const [applied, set_applied] = useState(false);
    const [review, set_review] = useState(false);
    const [shortlist, set_shortlist] = useState(false);
    const [interviews, set_interviews] = useState(false);
    const [offer, set_offer] = useState(false);

    const save_handler = (name, entry) => {
        update_post(data.post_id, {templates: {...templates, [name]: entry}})
    };

    return (
        <main className={styles.settings}>
            <section className={styles.templates}>
                <div>
                    <h4>Applied <Edit_Icon value={applied} toggle={set_applied} /></h4>
                    {applied ? <Edit_Area entry="applied" close={set_applied} save={save_handler} value={templates.applied} input={set_templates} object={templates}  /> : <p>{templates.applied}</p>}
                </div>
                <div>
                    <h4>In Review <Edit_Icon value={review} toggle={set_review} /></h4>
                    {review ? <Edit_Area entry="review" close={set_review} save={save_handler} value={templates.review} input={set_templates} object={templates}  /> : <p>{templates.review}</p>}
                </div>
                <div>
                    <h4>Shortlist <Edit_Icon value={shortlist} toggle={set_shortlist} /></h4>
                    {shortlist ? <Edit_Area entry="shortlist" close={set_shortlist} save={save_handler} value={templates.shortlist} input={set_templates} object={templates}  /> : <p>{templates.shortlist}</p>}
                </div>
                <div>
                    <h4>Interviews <Edit_Icon value={interviews} toggle={set_interviews} /></h4>
                    {interviews ? <Edit_Area entry="interviews" close={set_interviews} save={save_handler} value={templates.interviews} input={set_templates} object={templates}  /> : <p>{templates.interviews}</p>}
                </div>
                <div>
                    <h4>Offer <Edit_Icon value={offer} toggle={set_offer} /></h4>
                    {offer ? <Edit_Area entry="offer" close={set_offer} save={save_handler} value={templates.offer} input={set_templates} object={templates}  /> : <p>{templates.offer}</p>}
                </div>

            </section>
        </main>
    )
}

export default Settings;