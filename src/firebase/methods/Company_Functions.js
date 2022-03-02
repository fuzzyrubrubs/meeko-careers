import { firebase, db } from '../Firebase';
import { get_companies_jobs } from './Job_Functions';



////////////////////////////////////////////////////////////////////////////////////////////

const get_companies = async (array) => {
  if(array) {
    return await db.collection("companies").where("id", "in", array).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
        const employees = await get_employees(doc.id);
        const posts = await get_companies_jobs(doc.id);
        return {...doc.data(), employees, posts}     
      }));
    }).catch(error => error.message);
  } else {
    return await db.collection("companies").get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
        const employees = await get_employees(doc.id);
        return {...doc.data(), employees}     
      }));
    }).catch(error => error.message);
  }
};

const get_company = async (company_id) => {
    const company_data = await db.collection("companies").doc(company_id).get().then(doc =>  doc.data());  
    const employees = await get_employees(company_id);
    const posts = await get_companies_jobs(company_id);
    return {...company_data, employees, posts};
};


const get_employees = async (company_id) => {
    return await db.collection("companies").doc(company_id).collection("employees").get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};



////////////////////////////////////////////////////////////////////////////////////////

const create_company = async (data) => {
  return await db.collection("companies").doc(data.id).set({
      id: data.id,
      name: data.name,
      avatar: null,
      industry: data.industry,
      location: data.location,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  }).then(async () => {
      await data.managers.forEach(item => create_company_manager(item.id, data.id, item.level))
      await data.invited_managers.forEach(item => invite_company_manager(item.email, data.id, item.level))
  })
};

/////////////////////////////////////////////////////////////////////////////////////////

const create_company_manager = async (user_id, company_id, level) => {
  return db.collection("companies").doc(company_id).collection("managers").doc(user_id).set({
      user_id: user_id,
      company_id: company_id,
      level: level,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

const invite_company_manager = async (email, company_id, level) => {
  return db.collection("companies").doc(company_id).collection("invited_managers").add({
      email: email,
      company_id: company_id,
      level: level,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

const update_company_manager = async (user_id, company_id, level) => {
  return db.collection("companies").doc(company_id).collection("managers").doc(user_id).update({level: level});
};

const delete_company_manager = async (user_id, company_id) => {
    return db.collection("companies").doc(company_id).collection("managers").doc(user_id).delete();
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_manager_tasks = async (company_id, task_id, task) => {
  return db.collection("companies").doc(company_id).collection("task").doc(task_id).set({
      company_id: company_id,
      task_id: task_id,
      task: task,
      opened: false,
      completed: false,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

const get_manager_tasks = async (company_id) => {
  return await db.collection("companies").doc(company_id).collection("tasks").get().then(querySnapshot => {
     return querySnapshot.docs.map(doc => doc.data());
  });
};

const delete_manager_tasks = async (company_id, task_id, task) => {
    return db.collection("companies").doc(company_id).collection("task").doc(task_id).delete();
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_company_message = async (user_id, chat_id, company_id, content) => {
  return db.collection("companies").doc(company_id).collection("messages").doc(user_id).set({
      chat_id: chat_id,
      user_id: user_id,
      company_id: company_id,
      content: content,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};


export { 
  create_company, get_companies, get_company,
  get_manager_tasks
}
