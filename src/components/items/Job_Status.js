import styles from "../../styles/components/items/Job_Status.module.scss";
import { IoMdAnalytics } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { time_since } from "../../tools/DateTime_Methods";
import { useEffect, useState } from "react";
import { get_user_data } from "../../firebase/methods/User_Functions";

function Job_Status(props) {
  const data = props.data;

  const array1 = [1, 1, 1, 1, 1, 1, 1, 1, 1].slice(0, 2);
  const array2 = [1, 1, 1, 1, 1, 1, 1, 1, 1].slice(0, 5);

  return (
    <div className={styles.container} onClick={() => props.select()}>
       
        <div className={styles.status__display}><FaRegListAlt /></div>


      <p>{data.title}</p>

      <div className={styles.applicants}>
        <div className={styles.applicants__wrapper}>
          <div className={styles.applicants__list}>
            {data.candidates.map(person =><> <Person data={person} /><Person data={person} /><Person data={person} /></>)}
            <small className={styles.applicants__end}>{data.candidates.length}</small>
          </div>
        </div>
      </div>

      <small className={styles.applicants__end}>{data.candidates.length}</small>

        <small>{data.closed ? "Closed" : time_since(data.timestamp)}</small>

    </div>
  );
}

export default Job_Status;

function Person(props) {
  const [avatar, set_avatar] = useState("");

  useEffect(() => {
    const fetch_data = async () => {
      const user_data = await get_user_data(props.data.user_id);
      set_avatar(user_data.avatar);
    };
    fetch_data();
  }, []);


  return <div className={styles.applicants__applicant} style={{ backgroundImage: `url(${avatar})` }}></div>
}
