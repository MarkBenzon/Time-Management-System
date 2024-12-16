// Function to add tasks dynamically
function addTask(section, taskText) {
    // Create a new task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.textContent = taskText;

    // Append the task to the appropriate section
    const taskList = document.getElementById(section);
    taskList.appendChild(taskElement);
}

// Example usage:
// Adding daily tasks
addTask('daily-tasks', 'Finish project report');
addTask('daily-tasks', 'Check emails');
addTask('daily-tasks', 'Attend team meeting');

// Adding weekly tasks
addTask('weekly-tasks', 'Plan project roadmap');
addTask('weekly-tasks', 'Update website content');
addTask('weekly-tasks', 'Review financial reports');