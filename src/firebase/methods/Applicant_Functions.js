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
        closed: false,
        offer: null,
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
            const interviews = await get_application_interviews(data.application_id);
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
    return await db.collection("applicant").doc(application_id).collection("interviews").get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const manager = await get_user_data(data.managers);
            return {...data, manager}
        }));
    });
};

const get_interviews = async (post_id) => {
    return await db.collectionGroup("interviews").where("post_id", "==", post_id).get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const manager = await get_user_data(data.managers);
            return {...data, manager}
        }));
    });
};


const create_interview = async (data) => {
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
        slots: data.slots,
        status: 2,
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

const delete_interview = async (application_id, interview_id) => {
    db.collection("applicant").doc(application_id).collection("interviews").doc(interview_id).delete();
};

const update_interview_contact = async (application_id, interview_id, contact) => {
    await db.collection("applicant").doc(application_id).collection("interviews").doc(interview_id).update({contact: contact})
};

const update_interview = async (application_id, interview_id, type, update) => {
    await db.collection("applicant").doc(application_id).collection("interviews").doc(interview_id).update({[type]: update})
};


const update_application_status = async (application_id, status) => {
    await db.collection("applicant").doc(application_id).update({status: status})
};

const update_application_message = async (application_id, message) => {
    await db.collection("applicant").doc(application_id).update({message: message})
};

const close_application = async (application_id) => {
    await db.collection("applicant").doc(application_id).update({closed: true})
}

const create_offer = async (application_id, data) => {
    await db.collection("applicant").doc(application_id).update({
        offer: {
            ...data, 
            accepted: false
        }
    })
}

const cancel_offer = async (application_id) => {
    await db.collection("applicant").doc(application_id).update({
        offer: null
    })
}


export {
    create_application,
    get_applications,
    get_post_applicants, 
    get_application_interviews,
    get_applicant_messages, 
    get_applicant_tasks,
    get_interviews,
    create_interview, update_interview_contact, update_interview,
    update_application_status, update_application_message,
    delete_interview,
    create_offer, 
    cancel_offer,
    close_application
}