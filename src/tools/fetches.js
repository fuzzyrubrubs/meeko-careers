import { db } from "../firebase/Firebase";
import { get_interviews, get_post_applicants } from "../firebase/methods/Applicant_Functions";
import { get_recruiters } from "../firebase/methods/Post_Functions";
import { get_user_data } from "../firebase/methods/User_Functions";


const listenRealTimeEmployees = (state, id) => {
    return db.collection("employee").where("company_id", "==", id).onSnapshot(async (querySnapshot) => {
        const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const user_data = await get_user_data(data.user_id)
            return {...data, user_data}
        }))
        state(data)
      });
}

const listenRealTimePosts = (state, id) => {
    return db.collection("posts").where("company_id", "==", id).onSnapshot(async (querySnapshot) => {
        const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const candidates = await get_post_applicants(doc.id);
            const managers = await get_recruiters(doc.id);
            const interviews = await get_interviews(doc.id);
            return {...doc.data(), candidates, managers, interviews}  
        }))
        state(data)
      });
}

const listenRealTimeRota = (state, id) => {
    return db.collection("company").doc(id).collection("rota").onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        state(data)
      });
}

export { 
    listenRealTimeEmployees, listenRealTimePosts, listenRealTimeRota
}