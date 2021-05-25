let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    createInnerHtml();
    // localStorage.removeItem('employeePayrollList');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('employeePayrollList') ?
        JSON.parse(localStorage.getItem('employeePayrollList')) : [];
}
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Nane</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (let index = 0; index < employeePayrollList.length; index++) {

        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${employeePayrollList[index]._profilePic}"></td>
                <td>${employeePayrollList[index]._name}</td>
                <td>${employeePayrollList[index]._gender}</td>
                <td>${getDeptHtml(employeePayrollList[index]._department)}</td>
                <td>${employeePayrollList[index]._salary}</td>
                <td>${stringifyDate(employeePayrollList[index]._startDate)}</td>
                <td>
                    <img id="${index}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${index}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    if (typeof deptList == 'string') {
        deptHtml = `${deptHtml} <div class="dept-label">${deptList}</div>`
        return deptHtml;
    }
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }

    return deptHtml;
}

const remove = (node) => {
    employeePayrollList.splice(parseInt(node.id), 1);
    localStorage.setItem("employeePayrollList", JSON.stringify(employeePayrollList));
    createInnerHtml();
}
const update = (node) => {
    const currentUri = window.location.href;
    const addUri = currentUri.replace("new_payroll_form", "new_home");
    window.location.replace(addUri + "?index=" + node.id);
}