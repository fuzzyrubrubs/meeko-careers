import { firebase, db, auth } from '../Firebase';


const create_job = async (data) => {
    return db.collection("jobs").doc(data.id).set({
        id: data.id,
        title: data.title,
        salary: data.salary,
        company_id: data.company_id, 
        category: data.category,
        location: data.location, 
        hours: data.hours, 
        about: data.about,
        min_skills: data.min_skills, 
        pref_skills: data.pref_skills,
        info: data.info,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    });
};


const get_jobs = async () => {
    return await db.collection("jobs").get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => doc.data()));
    }).catch(error => error.message);
};

const get_job = async (job_id) => {
    return await db.collection("jobs").doc(job_id).get().then(doc =>  doc.data());  
};

const apply_job = async (job_id, user_id, contact) => {
    return db.collection("jobs").doc(job_id).collection("candidates").doc(user_id).set({
        user_id: user_id,
        job_id: job_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        status: 0,
        email: contact.email, 
        phone: contact.phone
    })
}



export { create_job, get_jobs, get_job, apply_job }
