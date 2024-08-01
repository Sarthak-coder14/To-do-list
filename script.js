document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskPriority = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);

    loadTasks();

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value;
        const dueDate = taskDate.value;
        const priority = taskPriority.value;

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const task = {
            text: taskText,
            dueDate: dueDate,
            priority: priority
        };

        saveTask(task);
        renderTask(task);

        taskInput.value = '';
        taskDate.value = '';
        taskPriority.value = 'low';
    }

    function removeTask(e) {
        if (e.target.tagName === 'BUTTON') {
            const taskElement = e.target.parentElement;
            const taskText = taskElement.firstChild.textContent;
            deleteTask(taskText);
            taskElement.remove();
        }
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => renderTask(task));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.classList.add(task.priority);
        li.appendChild(document.createTextNode(`${task.text} ${task.dueDate ? `- Due: ${task.dueDate}` : ''}`));

        const removeButton = document.createElement('button');
        removeButton.appendChild(document.createTextNode('Remove'));
        li.appendChild(removeButton);

        taskList.appendChild(li);
    }
});
