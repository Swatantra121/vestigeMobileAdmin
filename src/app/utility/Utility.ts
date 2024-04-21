import {
    TIME_INTERVAL,
    IS_CUSTOMER_ACTIVE_LIST,
    MONTH_LIST
} from 'src/app/utility/Constant';

/**
 * @function 
 * @param array => array
 * @param value =>object
 * @description remove particular object from the array
 */
export function removeObjectFromArray(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === 0) {
            array.splice(i, 1)
        }
    }
    return array;
}

/**
 * @function hoursFromList list of { 00:00 to 23:45 }
 * @description returns a list of hours format from 00:00 to 23:45
*/
export function hoursFromList() {
    let times = [];
    for (let i = 0; i < 24; i++) {
        if (i < 12) {
            for (let j = 0; j < 4; j++) {
                times.push(('0' + i).slice(-2) + ":" + TIME_INTERVAL[j] + ' AM');
            }
        }
        else {
            for (let j = 0; j < 4; j++) {
                times.push(('0' + i).slice(-2) + ":" + TIME_INTERVAL[j] + ' PM');
            }
        }
    }
    times = times.map(function (time, index) {
        return { key: index, value: time }
    })
    return times;
}

/**
 * @function hoursFromList list of { 00:00 to 23:45 with disabled key }
 * @description returns a list of hours format from 00:00 to 23:45
*/
export function hoursToList() {
    const times = [];
    for (let i = 0; i < 24; i++) {
        if (i < 12) {
            for (let j = 0; j < 4; j++) {
                times.push({ time: ('0' + i).slice(-2) + ":" + TIME_INTERVAL[j] + ' AM', disabled: false });
            }
        } else {
            for (let j = 0; j < 4; j++) {
                times.push({ time: ('0' + i).slice(-2) + ":" + TIME_INTERVAL[j] + ' PM', disabled: false });
            }
        }
    }

    return times;
}

/**
 * @function isCustomerActive customer status
 * @param active string status of customers
 * @description returns status
 * @return customer status
*/
export function isCustomerActive(active) {
    for (let customer in IS_CUSTOMER_ACTIVE_LIST) {
        if (customer === active) {
            return IS_CUSTOMER_ACTIVE_LIST[active]
        }
    }
}

/**
 * @function formatDate format date into readable format
 * @param data isoString date
 * @description converts the ISOString date into readable format
 * @returns return date into readable format
 */
export function formatDate(date) {
    return `${MONTH_LIST[new Date(date).getMonth()]} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`;
}

/**
 * @function formatTimeWithAMPM format time into readable format
 * @description extract the time from the date into readable format
 * @param date dateObject
 * @returns readable time
 */
export function formatTimeWithAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours < 10 ? '0' + hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

/**
 * @function
 * @param length length of the id
 * @description return an array of given length
 */
export function idGenerator(length, disabled) {
    const idList = [];
    if (disabled) {
        for (let i = 1; i <= length; i++) {
            idList.push({ value: i });
        }
    } else {
        for (let i = 1; i <= length; i++) {
            idList.push(i);
        }
    }
    return idList;
}

/**
 * @function search the key from the array 
 * @param value { object which you want to search } array { array in the object you will search }
 * @description return object if value exists otherwise return null
*/
export function searchFromArray(value, array) {
    let results = {};
    array.map(object => {
        for (let key in object) {
            (object[key] === value) ?
                results = object : null
        }
    });
    return results;
}

