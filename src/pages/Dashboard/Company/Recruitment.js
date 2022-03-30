import React, { useState } from 'react';
import Post_Preview from "../../../components/previews/Post_Preview";
import styles from '../../../styles/pages/Dashboard/Company/Recruitment.module.scss';


function Recruitment (props) {
    const data = props.data;
    const [selected, set_selected] = useState(0);

    const _open = (
        <>
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}

        </>
    );  

    const _closed = (
        <>
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}
        {data.posts.map(item => <Post_Preview data={item} />)}
        </>
    );  

    return (
        <main className={styles.recruitment}>
            <section className={styles.menu}>
                <h4 className={selected === 0 ? styles.menu__active : null} onClick={() => set_selected(0)}>Open</h4>
                <h4 className={selected === 1 ? styles.menu__active : null} onClick={() => set_selected(1)}>Closed</h4>
            </section>
            <section>
              {selected === 1 ? _closed : _open}
            </section>
        </main>
    )
}

export default Recruitment;