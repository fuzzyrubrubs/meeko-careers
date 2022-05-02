
const concat_ids = (user_id, recruiter_ids, manager_ids) => {
    return [user_id, ...recruiter_ids, ...manager_ids]
}

const convert_name = (name) => name.toLowerCase().replace(" ", "-");


const _upload_resume = {
    name: "Upload Resume", 
    condition: null,
}

const set_menu = () => {

}

export { concat_ids, convert_name }