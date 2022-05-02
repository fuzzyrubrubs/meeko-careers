import Signature from "../items/Signature";
import master from '../../styles/components/tasks/tasks.module.scss';



function Contract (props) {

    return (
        <main className={master.main}>
            <h2>Contract</h2>
            <div>
                <Signature />
            </div>
        </main>
    );
};

export default Contract;