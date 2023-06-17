export default async function setScheduleWithSettings (settings:any, setState:any) {
    let schedule:number[] = [];
    if (!settings) {
        return
    } else if (settings) {              
      const SchedulePromise = new Promise((resolve:any, reject:any) => {
        for (let i = settings.start_time; i < settings.end_time; i += settings.reminder) { schedule.push(i)}
        resolve(schedule.length ? schedule : "schedule fail")
      })
      return SchedulePromise
      .then( (schedule) => {
        setState({payload: schedule})
        return schedule
      })
    }
}
    // SET_HYDRO_SCHEDULE({payload: schedule})