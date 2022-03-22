import Header from "../../components/headers/Header";
import styles from '../../styles/pages/Dashboard/Job.module.scss';


function Job (props) {
    const data = props.data;
    console.log(props)

    return (
        <>
        <Header name="Employee">{data.company_data.name}</Header>
        <main>
            
        </main>
       </>
    )
}

export default Job;