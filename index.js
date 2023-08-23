function createEmployeeRecord (employeeArray) {    
    const employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeRecord;
}

function createEmployeeRecords (nestedArray) {
    const employeeRecords = [];

    for (let i = 0; i < nestedArray.length; i++) {
        const employeeRecord = createEmployeeRecord(nestedArray[i]);
        employeeRecords.push(employeeRecord);
    }
    return employeeRecords;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.substring(11, 15));
    const date = dateStamp.substring(0, 10);

    const timeInObj = {
        type: "TimeIn",
        hour: hour,
        date: date
    };

    employeeRecord.timeInEvents.push(timeInObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.substring(11, 15));
    const date = dateStamp.substring(0, 10);

    const timeOutObj = {
        type: "TimeOut",
        hour: hour,
        date: date
    };

    employeeRecord.timeOutEvents.push(timeOutObj);
    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date) {

    const timeOutNum = employeeRecord.timeOutEvents.find(event => event.date === date);
    const timeInNum = employeeRecord.timeInEvents.find(event => event.date === date);

    const hoursWorked = (timeOutNum.hour - timeInNum.hour)/100;
    return hoursWorked;
}

function wagesEarnedOnDate (employeeRecord, date) {
    const wageEarned = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return wageEarned;
}

function allWagesFor (employeeRecord) {
    const allWages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate (employeeRecord, event.date));
    const totalWage = allWages.reduce((total, wage) => total + wage);
    return totalWage;
}

function calculatePayroll (arrayOfEmpRecords) {
    const totalWageForEmp = arrayOfEmpRecords.map(employeeRecord => allWagesFor(employeeRecord));
    const totalEarned = totalWageForEmp.reduce((total, employeeTotal) => total + employeeTotal);
    return totalEarned;
}