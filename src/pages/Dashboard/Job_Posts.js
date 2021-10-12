import styles from '../../styles/pages/Dashboard.module.scss';


function Job_Posts (props) {

    return (
        <main>
            <h2>Job Posts</h2>
            {props.jobs.map(item => <p>{item.title}</p>)}
        </main>
    )
}

export default Job_Posts;