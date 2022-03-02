import moment from 'moment';

const time_since = (date) => moment.unix(date.seconds).fromNow();
const calculate_age = (date) => moment().diff(date, 'years');
const calendar = (date) => moment.unix(date.seconds).format("DD-MM-YYYY");


export { 
    time_since, 
    calculate_age,  
    calendar
}
