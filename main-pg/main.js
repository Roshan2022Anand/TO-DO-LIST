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

//funtion to open the task page for user
const displayTaskPage = (name, password) => {
    taskBox.show();
    
    return;
}
//funtion to show the form list for the old user
document.getElementById('old-user-btn').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById('old-user-dialog').show();
})
//funtion to check if the current old user exits
document.getElementById('old-user-login-btn').addEventListener("click", (e) => {
    // e.preventDefault();
    console.log('hai');

    let name = oldUserName.value;
    let password = oldUserPassword.value;
    if (name == "" || password == "") {
        alert("please fill your name and password");
        return;
    } else {
        for (let i = 0; i < storage.length; i++) {
            if (storage.key(i) == name && JSON.parse(storage[storage.key(0)]).password == password) {
                welcome.innerHTML=`<h1>Welcome back ${name}</h1>`

                displayTaskPage(name,password);
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
        for (let i = 0; i < storage.length; i++)
            if (storage.key(i) == name) {
                alert("User already exist");
                return;
            }
        document.getElementById('header').innerHTML = `<h1>Hai there ${name}</h1>`
        let newTaskList = { 'password': password };
        newTaskList = JSON.stringify(newTaskList)
        storage.setItem(name, newTaskList);
        displayTaskPage(name, password)
    }
})
document.getElementById('open-add-task-btn').addEventListener("click", (e) => {
    e.preventDefault();
    addTaskPg.show();
})
document.getElementById('cancle-btn').addEventListener("click",()=>{
    addTaskPg.close();
})
addTaskBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let title = document.getElementById('task-title').value;
    let date = document.getElementById('task-date').value;
    let desc = document.getElementById('task-desc').value;
    currentTaskList.innerHTML +=`
<div class="single-task-list">
    <p>Title :${title}</p>
    <p>Date:${date}</p>
    <p>Description:${desc}</p>
</div>
    `
    addTaskPg.close();
    // console.log(title,date,desc); 
})
// storage.clear();

