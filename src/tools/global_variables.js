import { FaPhone } from "react-icons/fa";

const job_categories = ["Accountant", "Administrator", "Project Manager", "IT Engineer", "Developer", "Designer", "Researcher"];
const job_remote = ["Office", "Remote", "Flexible"];
const job_hours = ["Full-time", "Part-time"];

const interview_types = ["Phone Call", "Video Call", "In-Person", "Test"];
const interview_duration = ["15 min", "30 min", "45 min", "60 min"];

const application_status = ["Applied", "In Review", "Shortlisted", "Interviews", "Offer"];

const candidate_status = ["New", "Reviewed", "Shortlisted", "Interviews", "Offers"];

const interview_icons = [<FaPhone />, <FaPhone />, <FaPhone />, <FaPhone />]
const interview_status = ["Cancelled", "Expired", "Pending", "Upcoming", "Finished", "Complete"];

const colors = ['#7d7ddc','#fd8567','#f5a002','#69b996','#ff6688','#e66e50'];

export { job_categories, job_remote, job_hours, interview_types, interview_duration, application_status, interview_icons, interview_status, candidate_status, colors };