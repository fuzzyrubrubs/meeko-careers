import { firebase, db, auth } from '../Firebase';
import { get_user_data } from './User_Functions';


const create_job = async (data) => {
    return await db.collection("jobs").doc(data.id).set({
        job_id: data.id,
        title: data.title,
        salary: data.salary,
        company_id: data.company_id, 
        company_name: data.company_name,
        category: data.category,
        location: data.location, 
        interview_template: [{order: 1, type: 0, contact: "0777788832"}, {order: 2, type: 1, contact: "www.zoom.com"}],
        hours: data.hours, 
        about: data.about,
        min_skills: data.min_skills, 
        pref_skills: data.pref_skills,
        info: data.info,
        closed: false,
        paused: false,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    }).then(async () => {
          await data.managers.forEach(item => create_job_recruiter(item.id, data.id, data.company_id))
          await data.invited_managers.forEach(item => invite_job_recruiter(item.email, data.id, data.company_id))
      })
};

const create_interview = async (data) => {
    try {
        await db.collection("jobs").doc(data.job_id).collection("interviews").doc(data.id).set({
            managers: data.managers,
            id: data.id,
            type: data.type,
            applicant: data.applicant,
            duration: data.duration,
            job_id: data.job_id,
            company_id: data.company_id,
            contact: data.contact, 
            description: data.description,
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
        return true
    } catch(error) {
        return false
    }
}


const get_candidates = async (job_id) => {
    return await db.collection("jobs").doc(job_id).collection("candidates").get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
          const user_data = await get_user_data(doc.id);
          const interview_data = await get_user_interviews(job_id, doc.id);
          return {...doc.data(), user_data, interview_data}
      }))
    });
};

const update_candiate_status = async (user_id, job_id, status) => {
    return db.collection("jobs").doc(job_id).collection("candidates").doc(user_id).update({status: status})
};

const get_recruiters = async (job_id) => {
    return await db.collection("jobs").doc(job_id).collection("recruiters").get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_interviews = async (job_id) => {
    return await db.collection("jobs").doc(job_id).collection("interviews").get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_interview = async (job_id, interview_id) => {
    return await db.collection("jobs").doc(job_id).collection("interviews").doc(interview_id).get().then(doc =>  doc.data());  
};

const get_user_interviews = async (job_id, user_id) => {
    return await db.collection("jobs").doc(job_id).collection("interviews").where("user_id", "==", user_id).get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};

const get_companies_jobs = async (company_id) => {
    return await db.collection("jobs").where("company_id", "==", company_id).get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const candidates = await get_candidates(doc.id);
            const managers = await get_recruiters(doc.id);
            const interviews = await get_interviews(doc.id);
            return {...doc.data(), candidates, managers, interviews}  
        }))
    })
}   
   

const get_jobs = async (array) => {
    if(array) {
        return await db.collection("jobs").where("job_id", "in", array).get().then(async (querySnapshot) => {
            return await Promise.all(querySnapshot.docs.map(async (doc) => {
                const candidates = await get_candidates(doc.id);
                const managers = await get_recruiters(doc.id);
                const interviews = await get_interviews(doc.id);
                return {...doc.data(), candidates, managers, interviews}     
              }));
          }).catch(error => error.message);
    } else {
        return await db.collection("jobs").get().then(async (querySnapshot) => {
            return await Promise.all(querySnapshot.docs.map(async (doc) => {
                const candidates = await get_candidates(doc.id);
                return {...doc.data(), candidates}     
              }));
        }).catch(error => error.message);
    }
};

const get_job = async (job_id) => {
    return await db.collection("jobs").doc(job_id).get().then(doc =>  doc.data());  
};

const apply_job = async (job_id, interviews, user_id, contact) => {
    return db.collection("jobs").doc(job_id).collection("candidates").doc(user_id).set({
        user_id: user_id,
        job_id: job_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        status: 0,
        interviews: interviews,
        email: contact.email, 
        phone: contact.phone,
        closed: false
    })
}

/////////////////////////////////////////////////////////////////////////////////////////

const create_job_recruiter = async (user_id, job_id, company_id) => {
    return db.collection("jobs").doc(job_id).collection("recruiters").doc(user_id).set({
        user_id: user_id,
        company_id: company_id,
        job_id: job_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const invite_job_recruiter = async (email, job_id, company_id) => {
    return db.collection("jobs").doc(job_id).collection("invited_recruiters").add({
        email: email,
        company_id: company_id,
        job_id: job_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };
  
  const update_job_recruiter = async (user_id, job_id, level) => {
    return db.collection("jobs").doc(job_id).collection("recruiters").doc(user_id).update({level: level});
  };
  
  const delete_job_recruiter = async (user_id, job_id) => {
      return db.collection("jobs").doc(job_id).collection("recruiters").doc(user_id).delete();
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_recruiter_tasks = async (job_id, task_id, task, company_id) => {
    return db.collection("jobs").doc(job_id).collection("task").doc(task_id).set({
        job_id: job_id,
        company_id: company_id,
        task_id: task_id,
        task: task,
        opened: false,
        completed: false,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const get_recruiter_tasks = async (job_id) => {
    return await db.collection("jobs").doc(job_id).collection("tasks").get().then(querySnapshot => {
       return querySnapshot.docs.map(doc => doc.data());
    });
  };
  
  const delete_recruiter_tasks = async (job_id, task_id, company_id) => {
      return db.collection("jobs").doc(job_id).collection("task").doc(task_id).delete();
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_recruiter_message = async (user_id, chat_id, job_id, content, company_id) => {
    return db.collection("jobs").doc(job_id).collection("messages").doc(user_id).set({
        chat_id: chat_id,
        company_id: company_id,
        user_id: user_id,
        job_id: job_id,
        content: content,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const get_recruiter_messages = async (user_id) => {
    return await db.collection("users").doc(user_id).collection("messages").get().then(querySnapshot => {
       return querySnapshot.docs.map(doc => doc.data());
    });
};



export { 
    create_job, get_jobs, get_job, apply_job, 
    get_recruiter_messages, get_recruiter_tasks,
    update_candiate_status,
    create_interview, get_interview,
    get_user_interviews,
    get_companies_jobs
}
