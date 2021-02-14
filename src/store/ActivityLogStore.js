import {writable, readable} from 'svelte/store';

/*START OF ACTIVITY LOGGING*/

export const activityLog = writable([]);
export const getDateTime = () => {
  var date = new Date().toJSON().slice(0,10);
  var time = new Date().toJSON().slice(11,19)
  return date+' '+time;
}

export const pushLog = (event, description, currTime) => {
  activityLog.update(v => [...v, {
    "event": event,
    "time": currTime,
    "description": description,
  }]);

/* console.log(activityLog); */
}


/*END OF ACTIVITY LOGGING*/

