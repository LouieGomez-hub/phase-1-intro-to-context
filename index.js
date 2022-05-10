function createEmployeeRecord(recArray) {
    return {
       firstName: recArray[0],
       familyName: recArray[1],
       title: recArray[2],
       payPerHour: recArray[3],
       timeInEvents: [],
       timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
   const [date, hour] = dateStamp.split(" ");
   const inEvent = {
       type: "TimeIn",
       hour: parseInt(hour),
       date: date
   }
   employeeRecordObj.timeInEvents.push(inEvent)
   return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employeeRecordObj.timeOutEvents.push(outEvent)
    return employeeRecordObj
 }
   
function hoursWorkedOnDate(employeeRecordObj, targetDate) {
   const inEvent = employeeRecordObj.timeInEvents.find(inEvent => inEvent.date === targetDate)
   const outEvent = employeeRecordObj.timeOutEvents.find(outEvent => outEvent.date === targetDate)
   return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecordObj, targetDate) {
    return hoursWorkedOnDate(employeeRecordObj, targetDate) * employeeRecordObj.payPerHour
}

function allWagesFor(employeeRecordObj) {
    const eligibleDates = employeeRecordObj.timeInEvents.map(function (e){
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, dates){
        return memo + wagesEarnedOnDate(employeeRecordObj, dates)
    }.bind(employeeRecordObj), 0)
    return payable
}

function calculatePayroll(recsArray) {
    return recsArray.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}
