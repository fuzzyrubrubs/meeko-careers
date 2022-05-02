import { firebase, db } from '../Firebase';
import { get_company_employees } from './Employee_Functions';
import { get_companies_posts } from './Post_Functions';



////////////////////////////////////////////////////////////////////////////////////////////

const get_companies = async (array) => {
  if(array) {
    return await db.collection("company").where("id", "in", array).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
        const employees = await get_company_employees(doc.id);
        const posts = await get_companies_posts(doc.id);
        return {...doc.data(), employees, posts}     
      }));
    }).catch(error => error.message);
  } else {
    return await db.collection("company").get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
        const employees = await get_company_employees(doc.id);
        return {...doc.data(), employees}     
      }));
    }).catch(error => error.message);
  }
};

const get_company = async (company_id) => {
    const company_data = await db.collection("company").doc(company_id).get().then(doc =>  doc.data());  
    const employees = await get_company_employees(company_id);
    const posts = await get_companies_posts(company_id);
    const rota = await get_company_rota(company_id);
    return {...company_data, employees, posts, rota};
};

const get_company_rota = async (company_id) => {
  return await db.collection("company").doc(company_id).collection("rota").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
const get_company_tasks = async (company_id) => {
  return await db.collection("company").doc(company_id).collection("task").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
const get_company_messages = async (company_id) => {
  return await db.collection("company").doc(company_id).collection("messages").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}


const get_managements = async (user_id) => {
  return await db.collectionGroup("managers").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
         const id = doc.data().company_id;
         const data = await get_company(id);
         const tasks = await get_company_tasks(id)   
         const messages = await get_company_messages(id)   
         return {...data, tasks, messages}
      }));
  });
};




////////////////////////////////////////////////////////////////////////////////////////

const create_company = async (data) => {
  return await db.collection("company").doc(data.id).set({
      id: data.id,
      name: data.name,
      avatar: null,
      industry: data.industry,
      location: data.location,
      invoices: true,
      office: true,
      events: true,
      contracts: true,
      address: null,
      leave: false,
      equipment: false,
      invoice_data: null,
      office_data: null,
      contract_data: null,
      event_data: null,
      equipment_data: null,

      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  }).then(async () => {
      await data.managers.forEach(item => create_company_manager(item.id, data.id, item.level))
      await data.invited_managers.forEach(item => invite_company_manager(item.email, data.id, item.level))
  })
};


const update_company = async (company_id, name, value) => {
    return await db.collection("company").doc(company_id).update({[name]: value})
}

/////////////////////////////////////////////////////////////////////////////////////////

const create_company_manager = async (user_id, company_id, level) => {
  return db.collection("company").doc(company_id).collection("managers").doc(user_id).set({
      user_id: user_id,
      company_id: company_id,
      level: level,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

const invite_company_manager = async (email, company_id, level) => {
  return db.collection("company").doc(company_id).collection("invited_managers").add({
      email: email,
      company_id: company_id,
      level: level,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_manager_tasks = async (company_id, task_id, task) => {
  return db.collection("company").doc(company_id).collection("task").doc(task_id).set({
      company_id: company_id,
      task_id: task_id,
      task: task,
      opened: false,
      completed: false,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

const get_manager_tasks = async (company_id) => {
  return await db.collection("company").doc(company_id).collection("tasks").get().then(querySnapshot => {
     return querySnapshot.docs.map(doc => doc.data());
  });
};

const delete_manager_tasks = async (company_id, task_id, task) => {
    return db.collection("company").doc(company_id).collection("task").doc(task_id).delete();
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const create_company_message = async (user_id, chat_id, company_id, content) => {
  return db.collection("company").doc(company_id).collection("messages").doc(user_id).set({
      chat_id: chat_id,
      user_id: user_id,
      company_id: company_id,
      content: content,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

//////////////////////////////////////////////

const add_rota = async (id, employee_id, company_id, time, day) => {
    return db.collection("company").doc(company_id).collection("rota").doc(id).set({
      entry_id: id, 
      employee_id: employee_id,
      date: time,
      day: day
    })
};

const remove_rota = async (id, company_id) => {
    return db.collection("company").doc(company_id).collection("rota").doc(id).delete();
};

export { 
  create_company, get_companies, get_company, update_company,
  get_manager_tasks,
  get_managements,
  add_rota, remove_rota,
  get_company_tasks, get_company_messages,
  get_company_rota
}
