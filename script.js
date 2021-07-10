let toDoList;
const addBtn = document.getElementById('addBtn');
const taskTxt = document.getElementById('taskTxtBox');

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStorage();
});

taskTxt.addEventListener('keyup', (e) => {
    if(e.key === 'Enter')
        addTask();
});
addBtn.addEventListener('click', addTask);

function addTask() {
    toDoList.push(taskTxt.value);

    createNewTask(taskTxt.value);
    taskTxt.value = '';
    saveToLocalStorage();
}

function createNewTask(value) {
    const container = document.getElementById('container');

    let task = document.createElement('div');
    task.classList.add('task');

    let buttonCheck = document.createElement('button');
    buttonCheck.innerHTML = '<i class="far fa-square"></i>';// fas fa-check
    buttonCheck.addEventListener('click', checkTask);

    let textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.value = value;

    let buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    buttonDelete.addEventListener('click', deleteTask);

    task.appendChild(buttonCheck);
    task.appendChild(textBox);
    task.appendChild(buttonDelete);
    container.appendChild(task);
}

function checkTask(event) {
    event.target.parentElement.classList.toggle('checked');
    
    if(event.target.parentElement.classList.contains('checked')) {
        event.target.classList.remove('far', 'fa-square');
        event.target.classList.add('fas', 'fa-check');
    } else {
        event.target.classList.add('far', 'fa-square');
        event.target.classList.remove('fas', 'fa-check');
    }

}

function deleteTask(event) {
    let delBtn = event.target.parentElement;
    delBtn.classList.toggle('deleted');
    delBtn.parentElement.remove();
    let item = delBtn.parentElement.children[1].value;
    toDoList.splice(toDoList.indexOf(item), 1);
    saveToLocalStorage();
}

function loadLocalStorage() {
    if( localStorage.getItem('toDoList') === null )
        toDoList = [];
    else {
        toDoList = JSON.parse(localStorage.getItem('toDoList'));
        toDoList.forEach(element => {
            createNewTask(element);
        });
    }
}

function saveToLocalStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}