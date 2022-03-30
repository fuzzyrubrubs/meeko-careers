import { useLocation } from "react-router-dom";
import Header from "../../components/headers/Header";


function Tasks (props) {
    const location = useLocation();

    console.log(location)
    console.log(props)

    return (
       <Header name={location.state ? location.state.name : "All"} back={true}>Tasks</Header>
    )
}

export default Tasks;