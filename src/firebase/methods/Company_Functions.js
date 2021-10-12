import { firebase, db, auth } from '../Firebase';

const create_company = async (data) => {
    return db.collection("companies").doc(data.id).set({
        id: data.id,
        name: data.name
    });
};


const get_companies = async () => {
    return await db.collection("companies").get().then(async (querySnapshot) => {
      return await Promise.all(querySnapshot.docs.map(async (doc) => {
        const employees = await get_employees(doc.id);
        return {...doc.data(), employees}     
      }));
    }).catch(error => error.message);
};

const get_company = async (company_id) => {
    const company_data = await db.collection("companies").doc(company_id).get().then(doc =>  doc.data());  
    const employees = await get_employees(company_id);
    return {...company_data, employees};
};


const get_employees = async (company_id) => {
    return await db.collection("companies").doc(company_id).collection("employees").get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
};


export { create_company, get_companies, get_company }
