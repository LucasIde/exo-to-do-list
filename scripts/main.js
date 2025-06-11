// ==============================
// 🌱 Sélection des éléments
// ==============================

const nameInput = document.querySelector(".task-name");
const dateInput = document.querySelector(".task-date");
const descInput = document.querySelector(".task-desc");
const addBtn = document.querySelector(".task-add");
const triBtn = document.querySelector(".tri");
const listHTML = document.querySelectorAll(".message");

// ==============================
// 🌍 Variables globales
// ==============================

class task {
    constructor(nameinput, dateinput, descriptioninput) {
        this.name = nameinput;
        this.date = dateinput;
        this.description = descriptioninput;
    }
}

const done = [];
const toDo = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================

function createTask(obj, node) {
    let len = (node) ? toDo.length - 1 : done.length - 1;3
    console.log(done);
    console.log(done.length - 1);
    const details = document.createElement("details");
    details.classList.add("task");
    details.id = len;
    details.innerHTML = `
    <summary>
        <div class="wrapperSum">
            <input type="checkbox">
            <div class="txt">
                <div class="title">${obj.name}</div>
                <div class="date">${obj.date}</div>
            </div>
        </div>
    </summary>
    ${obj.description}
    `
    return (details);
}

function changeindex(querry) {
    querry.forEach((element, index) => {
        element.id = index;
    });
}

function removeTask(id, array, querry) {
    array.splice(id, 1);
    if (querry) {
        changeindex(querry);
    }
}

function addTask(obj, node) {
    const taskElement = createTask(obj, node);
    listHTML[node].append(taskElement);
}

// ==============================
// 🧲 Événements
// ==============================

addBtn.addEventListener("click", ()=> {
    if (nameInput.value && dateInput.value && descInput.value) {
        const newTask = new task(nameInput.value, dateInput.value, descInput.value);
        toDo.push(newTask);
        console.log(toDo);
        addTask(newTask, 1);
    }
})

listHTML.forEach(element => {
    element.addEventListener("change", (e)=> {
        const id = e.target.closest(".task").id
        if (e.target.checked) {
            done.push(toDo[id]);
            addTask(toDo[id], 0);
            e.target.closest(".task").remove();
            const querry = document.querySelectorAll(".to-do .task");
            removeTask(id,toDo, querry);
        }
        else {
            toDo.push(done[id]);
            addTask(done[id], 1);
            e.target.closest(".task").remove();
            const querry = document.querySelectorAll(".done .task");
            removeTask(id,done, querry);
        }
    })
});