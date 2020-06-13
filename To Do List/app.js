//clear the local storage out
//localStorage.clear();

//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-items');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS
//add item
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    //add items to local storage
    saveLocalTodos(todoInput.value);

    //create checked and delete button
    const checkedBtn = document.createElement("button");
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkedBtn.classList.add("checked-btn");
    todoDiv.appendChild(checkedBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    //append to list
    todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value = "";
};

//check or delete items
function deleteItem(e) {
    let todo;
    const item = e.target;

    //check items
    if(item.classList[0] === "checked-btn") {
        todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    //delete items
    if(item.classList[0] === "delete-btn") {
        todo = item.parentElement;

        //animation
        todo.classList.add("fall");
        removeLocalStorage(todo);

        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
};

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
                break;

            case "uncomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
                break;
        }
    });
};

function saveLocalTodos(todo) {
    //check if there's data in local storage
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };

    todos.forEach(todo => {
        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");

        todoDiv.appendChild(newTodo);

        //create checked and delete button
        const checkedBtn = document.createElement("button");
        checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkedBtn.classList.add("checked-btn");
        todoDiv.appendChild(checkedBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete-btn");
        todoDiv.appendChild(deleteBtn);

        //append to list
        todoList.appendChild(todoDiv);
    });
};

function removeLocalStorage(todo) {
    //check if there's data in local storage
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};