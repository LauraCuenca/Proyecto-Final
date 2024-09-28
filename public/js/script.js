console.log("script.js cargado");
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const today = new Date();

    
    const todayStr = today.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    console.log('Fecha actual (today): ', todayStr);
    console.log('Fecha de inicio (startDate): ', startDateStr);
    console.log('Fecha de vencimiento (endDate): ', endDateStr);

    if (startDateStr < todayStr) {
        alert('La fecha de inicio no puede ser anterior a la fecha actual.');
        return;
    }

    if (endDateStr < startDateStr) {
        alert('La fecha de vencimiento no puede ser anterior a la fecha de inicio.');
        return;
    }

    addTask(taskName, startDateStr, endDateStr);
    saveTasks();

    document.getElementById('taskForm').reset();
});

function addTask(name, start, end) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
        <span class="task-name">${name}</span>
        <span class="task-dates">Inicio: ${start}, Vencimiento: ${end}</span>
        <span class="task-status"> (Pendiente)</span>
        <button onclick="markComplete(this)">Completar</button>
        <button onclick="editTask(this)">Editar</button>
        <button onclick="deleteTask(this)">Eliminar</button>
    `;

    taskList.appendChild(taskItem);
}

function markComplete(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
    const status = taskItem.classList.contains('completed') ? 'Completada' : 'Pendiente';
    taskItem.querySelector('.task-status').textContent = ` (${status})`;
    saveTasks();
}

function editTask(button) {
    const taskItem = button.parentElement;
    const name = prompt('Nuevo nombre de la tarea:', taskItem.querySelector('.task-name').textContent);

    if (name) {
        taskItem.querySelector('.task-name').textContent = name;
        saveTasks();
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const taskItems = Array.from(document.querySelectorAll('.task-item'));
    const tasks = taskItems.map(item => ({
        name: item.querySelector('.task-name').textContent,
        start: item.querySelector('.task-dates').textContent.split('Inicio: ')[1].split(', ')[0],
        end: item.querySelector('.task-dates').textContent.split('Vencimiento: ')[1],
        completed: item.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.name, task.start, task.end);
        if (task.completed) {
            const taskItem = document.querySelectorAll('.task-item')[document.querySelectorAll('.task-item').length - 1];
            taskItem.classList.add('completed');
            taskItem.querySelector('.task-status').textContent = ' (Completada)';
        }
    });
}
const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
    darkModeBtn.textContent = 'Modo Claro';
    } else {
    darkModeBtn.textContent = 'Modo Oscuro';
    }
});
const taskList = document.querySelector('.task-list');
