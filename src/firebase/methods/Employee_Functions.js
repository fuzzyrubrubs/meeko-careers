import { firebase, db, auth } from '../Firebase';
import { get_company } from './Company_Functions';


const create_employee = (employee_id, user_id, company_id, position) => {
    return db.collection("employee").doc(employee_id).set({
        employee_id: employee_id,
        user_id: user_id,
        position: "Software Dev",
        contact: null,
        probation: false,
        company_id: company_id,
        start_date: firebase.firestore.Timestamp.fromDate(new Date()),
        end_date: null,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    })
};

const get_employements = async (user_id) => {
  return await db.collection("employee").where("user_id", "==", user_id).get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const company_data = await get_company(data.company_id);
          console.log(data)
          console.log(company_data)
          return {...data, company_data}
      }));
  });
}

const get_company_employees = async (company_id) => {
    return await db.collection("employee").where("company_id", "==", company_id).get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};

export {
    get_employements,
    get_company_employees,
}