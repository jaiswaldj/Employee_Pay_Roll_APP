var empIndex;

window.addEventListener('DOMContentLoaded', (event) => {

    const text = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    text.addEventListener('input', function () {
        if (text.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = text.value;
            textError.textContent = ""
        } catch (e) {
            textError.textContent = e;
        }
    });


    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    empIndex = new URLSearchParams(window.location.search).get('index');
    const empPayroll = getEmployeePayrollDataFromStorage(parseInt(empIndex));

    if (empPayroll) {
        setRecords(empPayroll);
    }
});

const getEmployeePayrollDataFromStorage = (index) => {
    return localStorage.getItem('editEmp') ?
        JSON.parse(localStorage.getItem('editEmp'))[index] : [];
}

const setRecords = (empPayroll) => {
    setValue("#name", empPayroll._name)
    setSelectedValues('[name=profile]', empPayroll._profilePic);
    setValue("#salary", empPayroll._salary);
    setValue("#notes", empPayroll._note);
    setValue("#day", new Date(empPayroll._startDate).toLocaleString('default', {day: 'numeric'}));
    setValue("#month", new Date(empPayroll._startDate).toLocaleString('default', {month: 'long'}));
    setValue("#year", new Date(empPayroll._startDate).getFullYear());
    setTextValue(".salary-output", empPayroll._salary);
    document.getElementById(empPayroll._gender).checked = true;
    empPayroll._department.forEach(dept => document.getElementById(dept.toLowerCase()).checked = true);
}

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (error) {
        console.log(error);
        return;
    }
}

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", "");
    setValue("#notes", "");
    setValue("#day", "1");
    setValue("#month", "Jan");
    setValue("#year", "2016");
    setTextValue(".salary-output", "400000");
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
        item.checked = false;
    });
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;

    });
}

const setTextValue = (id, value) => {
    //not used anywhere!
    const element = document.querySelector(id);
    element.value = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};


const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueById("#name");
    } catch (e) {
        setTextValue(".text-error", e);
        throw e;
    }
    employeePayroll.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayroll.gender = getSelectedValues("[name=gender]").pop();
    employeePayroll.department = getSelectedValues("[name=department]");
    employeePayroll.salary = getInputValueById("#salary");
    employeePayroll.note = getInputValueById("#notes");
    let date =
        getInputValueById("#day") +
        "-" +
        getInputValueById("#month") +
        "-" +
        getInputValueById("#year");
    employeePayroll.startDate = new Date(date);
    alert(employeePayroll.toString());
    return employeePayroll;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(
        localStorage.getItem("editEmp")
    );

    const index = new URLSearchParams(window.location.search).get('index');
    if (index == null || parseInt(index) < 0) {
        if (employeePayrollList != undefined) {
            employeePayrollList.push(employeePayrollData);
        } else {
            employeePayrollList = [employeePayrollData];
        }
    } else {
        employeePayrollList[parseInt(index)] = employeePayrollData;
    }
    alert(employeePayrollList.toString());
    localStorage.setItem(
        "employeePayrollList",
        JSON.stringify(employeePayrollList)
    );
}

/**
 * gets the values of all the selected elements
 */
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach((item) => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
};

/**
 * querySelector is the newer feature.
 * It is used when selecting by element name,nesting or class-name.
 * It will let you find elements with rules that can't be expressedwith getElementById.
 */
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

/**
* getElementById is better supported than qurySelector method in older versions of the browsers.
* It will allow to select element by only it's id.
*/
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
};