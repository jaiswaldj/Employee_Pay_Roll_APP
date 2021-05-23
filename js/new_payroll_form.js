// UC --> 2 // On Document Load Set Event Listeners //
window.addEventListener('DOMContentLoaded', (event) => {

    const text = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    text.addEventListener('input', function () {
        if (text.value.length == 0) {
            textError.textContent == "";
            return;
        }
        try {
            (new EmployeePayroll()).name = text.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector("#salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});

// UC ---> 4 // Saving Employee Payroll to Local Storage //
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (error) {
        console.log(error);
        return;
    }
}
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("employeePayrollList", JSON.stringify(employeePayrollList));
}

// UC ---> 3 // On Save Create Employee Payroll Object //
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayroll();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = 
        getInputValueById('#day') + 
        "-" + 
        getInputValueById('#month') + 
        "-" + 
        getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

// const getOption = (id) => {
//     var e = document.getElementById(id);
//     var strUser = e.options[e.selectedIndex].text;
//     return strUser;
// }
// let date= getOption('#day')+" "+getOption('#month')+
//                             " "+getOption('#year');
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) { //if(HR==checked)
            selItems.push(item.value); //[].push(HR) => [HR, Sales]
        }
    });
    return selItems;
}
const getInputValueById = (id) => {
    let element = document.querySelector(id);
    let value = element.value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

// UC ---> 5 // Reset the Employee Payroll Form //

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
    setTextValue('#salary-output', "400000")
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContentvalue = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}