import moment from 'moment';

const time_since = (date) => moment.unix(date).fromNow();
const calculate_age = (date) => moment().diff(date, 'years');


export { 
    time_since, 
    calculate_age,  
}
