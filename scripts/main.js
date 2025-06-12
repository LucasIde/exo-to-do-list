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

function dateFormat(date) {
    const tmp = date.split("-");
    const swap = tmp[0];
    tmp[0] = tmp[2];
    tmp[2] = swap;
    return (tmp.join("/"));
}

function createTask(obj, node) {
    let len = (node) ? toDo.length - 1 : done.length - 1;
    let check = (node) ? "" : "checked";
    const formatedDate = dateFormat(obj.date)
    const details = document.createElement("details");
    details.classList.add("task");
    details.id = len;
    details.innerHTML = `
    <summary>
        <div class="wrapperSum">
            <input type="checkbox" ${check}>
            <div class="txt">
                <div class="title">${obj.name}</div>
                <div class="date">${formatedDate}</div>
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

function removeTask(id, array, qClass) {
    const obj = array.splice(id, 1);
    const querry = document.querySelectorAll(qClass);
    if (querry) {
        changeindex(querry);
    }
    return obj[0];
}

function addTask(obj, node) {
    const taskElement = createTask(obj, node);
    listHTML[node].append(taskElement);
}

function sortDate(a, b) {
    const x = new Date(a.date).getTime();
    const y = new Date(b.date).getTime();
    if (x < y) {
        return (-1);
    }
    else {
        return (1);
    }
}

// ==============================
// 🧲 Événements
// ==============================

addBtn.addEventListener("click", ()=> {
    if (nameInput.value && dateInput.value && descInput.value) {
        const newTask = new task(nameInput.value, dateInput.value, descInput.value);
        toDo.push(newTask);
        addTask(newTask, 1);
        console.log();

    }
})

listHTML.forEach(element => {
    element.addEventListener("change", (e)=> {
        console.log(toDo);
        console.log(done);
        const id = e.target.closest(".task").id;
        if (e.target.checked) {
            e.target.closest(".task").remove();
            const obj = removeTask(id,toDo, ".to-do .task");
            done.push(obj);
            addTask(obj, 0);
        }
        else {
            e.target.closest(".task").remove();
            const obj = removeTask(id,done, ".done .task");
            toDo.push(obj);
            addTask(obj, 1);
        }
    })
});

triBtn.addEventListener("click", ()=> {
    toDo.sort(sortDate)
    listHTML[1].innerHTML = "";
    toDo.forEach(obj => {
        addTask(obj, 1);
    })
    changeindex(document.querySelectorAll(".to-do .task"));
})
