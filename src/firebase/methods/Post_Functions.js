import { firebase, db, auth } from '../Firebase';
import { get_interviews, get_post_applicants } from './Applicant_Functions';
import { get_user_data } from './User_Functions';


const create_post = async (data) => {
    return await db.collection("posts").doc(data.id).set({
        post_id: data.id,
        title: data.title,
        salary: data.salary,
        company_id: data.company_id, 
        company_name: data.company_name,
        category: data.category,
        location: data.location, 
        remote: data.remote,
        hours: data.hours, 
        about: data.about,
        min_skills: data.min_skills, 
        pref_skills: data.pref_skills,
        info: data.info,
        closed: false,
        paused: false,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        templates: {
            applied: "Thanks for your application! We'll review it and get back to you shortly.",
            review: "We're currently reviewing your application.",
            shortlist: "We like your application and have added you to the shortlisted candidates.",
            interviews: "We'd love to invite you for an interview to tell you about us and get to know you.",
            offer: "Thanks for being patient through our application process, we've loved your application and want to make you an offer!"
        }
    }).then(async () => {
          await data.managers.forEach(item => create_post_recruiter(item.id, data.id, data.company_id))
          await data.invited_managers.forEach(item => invite_post_recruiter(item.email, data.id, data.company_id))
      })
};


const update_post = async (post_id, data) => {
    return await db.collection("posts").doc(post_id).update(data);
}


const get_recruiters = async (post_id) => {
    return await db.collection("posts").doc(post_id).collection("recruiters").get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};


const get_companies_posts = async (company_id) => {
    return await db.collection("posts").where("company_id", "==", company_id).get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const candidates = await get_post_applicants(doc.id);
            const managers = await get_recruiters(doc.id);
            const interviews = await get_interviews(doc.id);
            return {...doc.data(), candidates, managers, interviews}  
        }))
    })
}   
   

const get_posts = async (array) => {
    if(array) {
        return await db.collection("posts").where("post_id", "in", array).get().then(async (querySnapshot) => {
            return await Promise.all(querySnapshot.docs.map(async (doc) => {
                const candidates = await get_post_applicants(doc.id);
                const managers = await get_recruiters(doc.id);
                const interviews = await get_interviews(doc.id);
                return {...doc.data(), candidates, managers, interviews}     
              }));
          }).catch(error => error.message);
    } else {
        return await db.collection("posts").get().then(async (querySnapshot) => {
            return await Promise.all(querySnapshot.docs.map(async (doc) => {
                const candidates = await get_post_applicants(doc.id);
                return {...doc.data(), candidates}     
              }));
        }).catch(error => error.message);
    }
};

const get_post = async (post_id) => {
    return await db.collection("posts").doc(post_id).get().then(doc =>  doc.data());  
};

const get_post_tasks = async (post_id) => {
    return await db.collection("posts").doc(post_id).collection("task").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
const get_post_messages = async (post_id) => {
    return await db.collection("posts").doc(post_id).collection("messages").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
 
const get_recruitments = async (user_id) => {
    return await db.collectionGroup("recruiters").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            const id = doc.data().post_id;
            const post = await get_post(id);
            const candidates = await get_post_applicants(id);
            const managers = await get_recruiters(id);
            const interviews = await get_interviews(id);
            const tasks = await get_post_tasks(id);
            const messages = await get_post_messages(id);
            return {...post, candidates, managers, interviews, tasks}      
        }));
    });
  };


/////////////////////////////////////////////////////////////////////////////////////////

const create_post_recruiter = async (user_id, post_id, company_id) => {
    return db.collection("posts").doc(post_id).collection("recruiters").doc(user_id).set({
        user_id: user_id,
        company_id: company_id,
        post_id: post_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const invite_post_recruiter = async (email, post_id, company_id) => {
    return db.collection("posts").doc(post_id).collection("invited_recruiters").add({
        email: email,
        company_id: company_id,
        post_id: post_id,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };
  
  const delete_post_recruiter = async (user_id, post_id) => {
      return db.collection("posts").doc(post_id).collection("recruiters").doc(user_id).delete();
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_recruiter_tasks = async (post_id, task_id, task, company_id) => {
    return db.collection("posts").doc(post_id).collection("task").doc(task_id).set({
        post_id: post_id,
        company_id: company_id,
        task_id: task_id,
        task: task,
        opened: false,
        completed: false,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  const get_recruiter_tasks = async (post_id) => {
    return await db.collection("posts").doc(post_id).collection("tasks").get().then(querySnapshot => {
       return querySnapshot.docs.map(doc => doc.data());
    });
  };
  
  const delete_recruiter_tasks = async (post_id, task_id, company_id) => {
      return db.collection("posts").doc(post_id).collection("task").doc(task_id).delete();
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_recruiter_message = async (user_id, chat_id, post_id, content, company_id) => {
    return db.collection("posts").doc(post_id).collection("messages").doc(user_id).set({
        chat_id: chat_id,
        company_id: company_id,
        user_id: user_id,
        post_id: post_id,
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
    create_post, get_posts, get_post, update_post,
    get_recruiter_messages, get_recruiter_tasks,
    get_companies_posts,
    get_recruitments
}
