//accessing all the html elements
const storage = window.localStorage;
const newUserName = document.getElementById('new-user-name');
const newUserPassword = document.getElementById('new-user-password');
const oldUserName = document.getElementById('old-user-name');
const oldUserPassword = document.getElementById('old-user-password');
const welcome = document.getElementById('header');
const taskBox = document.getElementById('task-box');
const currentTaskList = document.getElementById('current-task-list');
const addTaskPg = document.getElementById('add-task-page');
const addTaskBtn = document.getElementById('add-task-btn');
let currentUserName;
let tasks = 0;
const clearInputValue=()=>{
    newUserName.value="";
    newUserPassword.value="";
    oldUserName.value="";
    oldUserPassword.value="";
}
//funtion to open the task page for user
const displayTaskPage = (name) => {
    let oldUserTaskObj = JSON.parse(storage[name]);
    oldUserTaskObj = oldUserTaskObj.userTaskObj;
    let tasks = 0;
    for (let obj in oldUserTaskObj){
        tasks++;
        currentTaskList.innerHTML += `
    <div class="single-task-list">
    <div class="task-tick-div"><input type="checkbox"  class="task-tick-box" value="input-${tasks}"></div>
    <div class="task-info" id="task-info-input-${tasks}">
    <p>Title :${oldUserTaskObj[obj].title}</p>
    <p>Date:${oldUserTaskObj[obj].date}</p>
    <p>Description:${oldUserTaskObj[obj].desc}</p>
    </div>
</div>
    `;
        addEventToCheckBox();
    }
}
//funtion to show the form list for the old user
document.getElementById('old-user-btn').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('old-user-dialog').show();
    clearInputValue();
})
//funtion to check if the current old user exits
document.getElementById('old-user-login-btn').addEventListener("click", (e) => {
    e.preventDefault();
    let name = oldUserName.value;
    currentUserName=name;
    let password = oldUserPassword.value;
    if (name == "" || password == "") {
        alert("please fill your name and password");
        return;
    } else {
        for (let i = 0; i < storage.length; i++) {
            if (storage.key(i) == name && JSON.parse(storage[storage.key(0)]).password == password) {
                welcome.innerHTML = `<h1>Welcome back ${name}</h1>`;
                taskBox.show();
                displayTaskPage(name);
                clearInputValue();
            } else {
                alert('invalid name or password');
            }
        }
    }
})
//function to list the new user to the app
document.getElementById('new-user-login-btn').addEventListener("click", (e) => {
    e.preventDefault();
    let name = newUserName.value;
    let password = newUserPassword.value;
    if (name == "" || password == "") {
        alert("please fill your name and password");
        return;
    } else {
        currentUserName = name;
        for (let i = 0; i < storage.length; i++)
            if (storage.key(i) == name) {
                alert("User already exist");
                return;
            }
        document.getElementById('header').innerHTML = `<h1>Hai there ${name}</h1>`
        let newTaskList = { 'password': password, 'userTaskObj': {} };
        newTaskList = JSON.stringify(newTaskList);
        storage.setItem(name, newTaskList);
        taskBox.show();
        clearInputValue();
    }
})
document.getElementById('back-to-login-btn').addEventListener("click",()=>{
    currentTaskList.innerHTML = "";
    taskBox.close();
})
document.getElementById('open-add-task-btn').addEventListener("click", (e) => {
    e.preventDefault();
    addTaskPg.show();
})
document.getElementById('cancle-btn').addEventListener("click", () => {
    addTaskPg.close();
})
const addEventToCheckBox = () => {
    document.querySelectorAll('.task-tick-box').forEach((check) => {
        check.addEventListener("change", () => {
            let oneTask=document.getElementById(`task-info-${check.value}`)
            if (check.checked)
                oneTask.style.textDecoration = 'line-through'
            else
                oneTask.style.textDecoration = 'none'
        })
    })
}
addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.getElementById('task-title').value;
    let date = document.getElementById('task-date').value;
    let desc = document.getElementById('task-desc').value;
    tasks++;
    currentTaskList.innerHTML += `
    <div class="single-task-list">
    <div class="task-tick-div"><input type="checkbox"  class="task-tick-box" value="input-${tasks}"></div>
    <div class="task-info" id="task-info-input-${tasks}">
    <p>Title :${title}</p>
    <p>Date:${date}</p>
    <p>Description:${desc}</p>
    </div>
</div>
    `;
    let userTaskObj = JSON.parse(storage[currentUserName]);
    userTaskObj['userTaskObj'][`task${tasks}`] = { 'title': title, 'date': date, 'desc': desc };
    userTaskObj = JSON.stringify(userTaskObj);
    storage.setItem(currentUserName, userTaskObj);
    addEventToCheckBox();
    addTaskPg.close();
})
// storage.clear();

// oneTask.style.textDecoration = 'line-through';