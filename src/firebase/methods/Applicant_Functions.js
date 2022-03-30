import { firebase, db, auth } from '../Firebase';
import { get_post } from './Post_Functions';
import { get_user_data } from './User_Functions';


const create_application = async (application_id, post_id, company_id, user_id, contact) => {
    return db.collection("applicant").doc(application_id).set({
        application_id: application_id,
        user_id: user_id,
        post_id: post_id,
        company_id: company_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        status: 0,
        email: contact.email, 
        phone: contact.phone,
        closed: false
    })
};

const get_applicant_tasks = async (applicant_id) => {
    return await db.collection("applicant").doc(applicant_id).collection("task").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
const get_applicant_messages = async (applicant_id) => {
    return await db.collection("applicant").doc(applicant_id).collection("messages").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}

const get_applications = async (user_id) => {
    return await db.collection("applicant").where('user_id', '==', user_id).get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const interviews = await get_application_interviews(data.post_id, user_id);
            const job_data = await get_post(data.post_id);
            const tasks = await get_applicant_tasks(data.application_id)
            const messages = await get_applicant_messages(data.application_id)
            return {...data, interviews, job_data, tasks, messages}
        }))
    });
};


const get_post_applicants = async (post_id) => {
    return await db.collection("applicant").where("post_id", "==", post_id).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const user_data = await get_user_data(data.user_id);
          const interviews = await get_application_interviews(data.application_id);
          return {...data, user_data, interviews}
      }));
    });
};


const get_application_interviews = async (application_id) => {
    return await db.collection("applicant").doc(application_id).collection("interviews").get().then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_interviews = async (post_id) => {
    return await db.collectionGroup("interviews").where("post_id", "==", post_id).get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};


const create_interview = async (data) => {
    console.log(data)
    await db.collection("applicant").doc(data.application_id).collection("interviews").doc(data.id).set({
        managers: data.managers,
        id: data.id,
        type: data.type,
        application_id: data.application_id,
        applicant: data.applicant,
        duration: data.duration,
        post_id: data.post_id,
        company_id: data.company_id,
        contact: data.contact, 
        message: data.message,
        accepted: false,
        completed: false,
        declined: false,
        reschedueled: false,
        expired: false,
        closed: false,
        feedback: "",
        time: null,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    })

}


const update_application_status = async (application_id, status) => {
    await db.collection("applicant").doc(application_id).update({status: status})
};


export {
    create_application,
    get_applications,
    get_post_applicants, 
    get_interviews,
    create_interview,
    update_application_status
}