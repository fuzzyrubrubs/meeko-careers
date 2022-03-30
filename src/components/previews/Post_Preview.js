import styles from "../../styles/components/previews/Post_Preview.module.scss";
import { IoMdAnalytics } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { time_since } from "../../tools/DateTime_Methods";
import { useEffect, useState } from "react";
import { get_user_data } from "../../firebase/methods/User_Functions";

function Job_Status(props) {
  const data = props.data;

  console.log(data)

  return (
    <Link to={`/dashboard/posts/${data.post_id}`} className={styles.container}>
       
        <div className={styles.icon}><FaRegListAlt /></div>
        <h5 class="bold">{data.title}</h5>
        <h5>{data.salary}k</h5>

        <div className={styles.applicants}>
          <div className={styles.applicants__wrapper}>
            <div className={styles.applicants__list}>
              {data.candidates.map(person =><> <Person data={person} /><Person data={person} /><Person data={person} /></>)}
              <small className={styles.applicants__end}>{data.candidates.length}</small>
            </div>
          </div>
        </div>

        <small>{data.closed ? "Closed" : time_since(data.timestamp)}</small>

    </Link>
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
