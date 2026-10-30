// Grab DOM elements
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskSubjectInput = document.getElementById('task-subject');
const taskPriorityInput = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');

// Load tasks from Local Storage or create an empty array
let tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
}

// Render tasks to screen
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-details">
                    <span class="task-title">${task.title}</span>
                    <span class="task-subject">${task.subject ? task.subject : 'No Subject'} • <strong>${task.priority || 'Medium'} Priority</strong></span>
                </div>
                <div class="task-actions">
                    <button class="btn-toggle" onclick="toggleTask(${index})">
                        ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}

// Add new task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const titleValue = taskTitleInput.value.trim();
    const subjectValue = taskSubjectInput.value.trim();
    const priorityValue = taskPriorityInput ? taskPriorityInput.value : 'Medium';

    if (titleValue === '') {
        alert('Please enter a task title.');
        return;
    }

    const newTask = {
        title: titleValue,
        subject: subjectValue,
        priority: priorityValue,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskTitleInput.value = '';
    taskSubjectInput.value = '';
});

// Toggle completion status
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Initial render
renderTasks();