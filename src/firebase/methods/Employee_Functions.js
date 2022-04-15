import { firebase, db, auth } from '../Firebase';
import { get_company } from './Company_Functions';
import { get_user_data } from './User_Functions';


const create_employee = (employee_id, user_id, company_id, data) => {
    return db.collection("employee").doc(employee_id).set({
        ...data, 
        accepted: false,
        address: "",
        employee_id: employee_id,
        user_id: user_id,
        offboard: false,
        contact: null,
        company_id: company_id,
        start_date: firebase.firestore.Timestamp.fromDate(new Date()),
        end_date: null,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    })
};


const get_employee_tasks = async (employee_id) => {
    return await db.collection("employee").doc(employee_id).collection("task").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
  }
const get_employee_messages = async (employee_id) => {
return await db.collection("employee").doc(employee_id).collection("messages").get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}

const get_employements = async (user_id) => {
  return await db.collection("employee").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const company_data = await get_company(data.company_id);
          const tasks = await get_employee_tasks(data.employee_id);
          const messages = await get_employee_messages(data.employee_id);
          return {...data, company_data, tasks, messages}
      }));
  });
}

const get_company_employees = async (company_id) => {
    return await db.collection("employee").where("company_id", "==", company_id).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const user_data = await get_user_data(data.user_id)
          return {...data, user_data}
      }))
    });
};

export {
    create_employee,
    get_employements,
    get_company_employees,
}