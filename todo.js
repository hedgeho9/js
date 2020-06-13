const toDoForm = document.querySelector(".js-toDoForm");
const toDoList = document.querySelector(".js-toDoList");
const toDoInput = toDoForm.querySelector("input");

const TODOS_LS = 'toDos';

let toDos = [];

function handleSubmit (event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paingToDo(currentValue);
    toDoInput.value = "";
}

function paingToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn. innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();

}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paingToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();