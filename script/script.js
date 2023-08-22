const inp = document.querySelector('#input');
const form = document.querySelector('#form');
const addTasks = document.querySelector('.active-tasks__content');
const notTask = document.querySelector('.active-tasks__notTask');
const completed = document.querySelector('.completed__tasks');

let tasks = [];
let qq = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
}

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

if (localStorage.getItem('qq')) {
    qq = JSON.parse(localStorage.getItem('qq'));
}

tasks.forEach(e => {

    const add = `<div id=${e.id} data-action='add' data-action='del' class="active-tasks__task">
            <div class="active-tasks__content-i">
                <button data-action="circle" class="active-tasks__click"></button>
                <div class="active-tasks__text">${e.text}</div>
            </div>

            <button onClick="editTask(this)" data-action="edit" class="active-tasks__pen"></button>
    </div>`;

    addTasks.insertAdjacentHTML('beforeend', add);

    
    if(addTasks.children.length > 1) {
        notTask.classList.add('none');
    }
});

qq.forEach(e => {
    const adds = `<div id=${e.id} data-action='add' data-action='del' class="active-tasks__task">

    <div class="active-tasks__content-i">
            <button data-action="circle" class="active-tasks__click"></button>
            <div class="active-tasks__text">${e.text}</div>
    </div>

    <button onClick="editTask(this)" data-action="edit" class="active-tasks__pen" disabled></button>
</div>`;

completed.insertAdjacentHTML('beforeend', adds);

    console.log(adds)
})



form.addEventListener('submit', addTask);
addTasks.addEventListener('click', addCompleted);
completed.addEventListener('click', del);

function addTask(e) {
    e.preventDefault()

    if(!inp.value || inp.value.trim() < 1) return;

    const newTask = {
        id: Date.now(),
        text: inp.value,
        done: false, 
    }

   tasks.push(newTask)

    saveLocal()

    const add = `<div id=${newTask.id} data-action='add' data-action='del' class="active-tasks__task">

            <div class="active-tasks__content-i">
                    <button data-action="circle" class="active-tasks__click"></button>
                    <div class="active-tasks__text">${newTask.text}</div>
            </div>

            <button onClick="editTask(this)" data-action="edit" class="active-tasks__pen"></button>
    </div>`;

    addTasks.insertAdjacentHTML('beforeend', add);

    inp.value = '';

    inp.focus();

    if(addTasks.children.length > 1) {
        notTask.classList.add('none');
    }

}

function addCompleted(el) {
    if (el.target.dataset.action !== 'add') return;

    const parentNode = el.target.closest('.active-tasks__task');
    const id = Number(parentNode.id);
    const delMass = tasks.findIndex(task => task.id === id);

    const trueTask = {
        id: Number(parentNode.id),
        text: tasks[delMass].text,
        done: true, 
    }

    console.log(trueTask)

    // Удаление задачи из массива tasks
    tasks.splice(delMass, 1);

    // Сохранение активных задач в localStorage
    saveLocal();

    // Добавление задачи в выполненные
    qq.push(trueTask);

    // Сохранение выполненных задач в localStorage
    qqLocal()
    
    completed.appendChild(parentNode);

    
    if(addTasks.children.length === 1) {
        notTask.classList.remove('none');
    }
}

function del(el) {
    if (el.target.dataset.action !== 'add') return;

    const parentDel = el.target.closest('.active-tasks__task');
    const id = Number(parentDel.id);
    const delMass = qq.findIndex(task => task.id === id);

    console.log(delMass)

    qq.splice(delMass, 1)

    qqLocal()

    parentDel.remove()
}

function editTask(el) {

    const parentDel = el.parentNode;
    const id = Number(parentDel.id);
    const delMass = tasks.findIndex(task => task.id === id);

    if(!parentDel.classList.contains('edit')) {
        parentDel.classList.add('edit');
        parentDel.querySelector('.active-tasks__text').innerHTML = `<input class="active-tasks__edits" type="test" value="${tasks[delMass].text}" />`;
        const inpEdit = document.querySelector('.active-tasks__edits');
        const end = inpEdit.value.length;
        inpEdit.setSelectionRange(end, end);
        inpEdit.focus()
    } else {
        delEdit(delMass, parentDel);
    }

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.active-tasks__task')) {
            if(parentDel.classList.contains('edit')) {
                delEdit(delMass, parentDel);
            }
        }
    });

    document.addEventListener('keydown', e => {
        if(e.key === 'Enter') {
            if(parentDel.classList.contains('edit')) {
                delEdit(delMass, parentDel);
                console.log('3')
            }
        }
    })

}

function delEdit(e, el) {
    let newTask = el.querySelector('.active-tasks__text > input');
    if(newTask) {
        const newTasks = newTask.value;
        tasks[e].text = newTasks;
        saveLocal();
        el.querySelector('.active-tasks__text').innerText = newTasks;
        el.classList.remove('edit');
    }
}

// сохраним 

function saveLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function qqLocal() {
    localStorage.setItem('qq', JSON.stringify(qq))
}


// найти в комплитеде кнопку редакьирования 
// забрать ее и обрабоать 