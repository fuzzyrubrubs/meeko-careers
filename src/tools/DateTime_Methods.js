import moment from 'moment';

const time_since = (date) => moment.unix(date.seconds).fromNow();
const calculate_age = (date) => moment().diff(date, 'years');
const calendar = (date) => moment.unix(date.seconds).format("DD-MM-YYYY");
const get_time = (seconds) => moment.unix(seconds).format('hh:mm a');
const get_date = (seconds) => moment.unix(seconds).format('D MMMM')

const populate_30_days = () => {
    const new_array = [];
    for(var i = 0; i < 30; i++){
        var next_day = moment().add(i, 'days');
        var day = next_day.format('dddd');
        var date = next_day.format('D');
        var month = next_day.format('MMMM');
        const full = next_day.format('YYYY-MM-DD');
        new_array.push({date: date, day: day, month: month, full: full, id: i});
    }
    return new_array;
};


function populate_24_hours () {
    const items = [];
    new Array(13).fill().forEach((acc, index) => {
      const num = index + 8;
      items.push(moment( {hour: num} ).format('hh:mm a'));
      items.push(moment({ hour: num, minute: 30 }).format('hh:mm a'));
    })
    return items;
  }


export { 
    time_since, 
    calculate_age,  
    calendar,
    populate_30_days, 
    populate_24_hours,
    get_time, get_date
}
