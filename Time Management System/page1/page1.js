let tasks = []; 
let taskTimers = {}; 


window.onload = function() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks); 
        tasks.forEach((task, index) => {
            displayTask(task, index); 
        });
    }
};


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('add-task-btn').addEventListener('click', function() {
    let title = document.getElementById('title').value;
    let estimatedTime = document.getElementById('number').value;
    let day = document.getElementById('day').value;
    let hours = document.getElementById('hours').value;
    let minutes = document.getElementById('minutes').value;
    let description = document.getElementById('description').value.trim(); 

    if (title && estimatedTime && day && hours && minutes) {
        let task = {
            title: title,
            estimatedTime: estimatedTime,
            day: day,
            time: `${hours}:${minutes}`,
            description: description,  
            elapsedTime: 0, 
            interval: null 
        };

        tasks.push(task);
        saveToLocalStorage(); 
        displayTask(task, tasks.length - 1); 
        
       
        document.getElementById('title').value = '';
        document.getElementById('number').value = '';
        document.getElementById('day').value = '';
        document.getElementById('hours').value = '01';
        document.getElementById('minutes').value = '00';
        document.getElementById('description').value = ''; 
    } else {
        alert("Please fill in all fields.");
    }
});

function displayTask(task, taskIndex) {
    const taskContainer = document.getElementById('task-list');
    const taskHTML = `
        <div class="task" id="task-${taskIndex}">
            <h2>Title: ${task.title}</h2>
            <h2>Estimated Time (hrs): ${task.estimatedTime}</h2>
            <h2>Day: ${task.day}</h2>
            <h2>Time: ${task.time}</h2>
            <h2>Description: ${task.description || 'No description provided'}</h2>  <!-- Display task description -->
            <h2 id="elapsed-time-${taskIndex}">Elapsed Time: 0:00</h2>
            <button class="start-task-btn" onclick="startTask(${taskIndex})">Start</button>
            <button class="pause-task-btn" onclick="pauseTask(${taskIndex})">Pause</button>
            <button class="stop-task-btn" onclick="stopTask(${taskIndex})">Stop</button>
            <button class="delete-task-btn" onclick="deleteTask(${taskIndex})">Delete</button>
        </div>
    `;
    taskContainer.innerHTML += taskHTML;
}

function startTask(taskIndex) {
    let task = tasks[taskIndex];
    if (task.interval) {
        return; 
    }

    task.interval = setInterval(() => {
        task.elapsedTime++;
        updateElapsedTime(taskIndex);
    }, 1000); 
}

function pauseTask(taskIndex) {
    let task = tasks[taskIndex];
    clearInterval(task.interval); 
    task.interval = null;
}

function stopTask(taskIndex) {
    let task = tasks[taskIndex];
    clearInterval(task.interval); 
    task.interval = null;
    task.elapsedTime = 0; 
    updateElapsedTime(taskIndex);
}

function updateElapsedTime(taskIndex) {
    let task = tasks[taskIndex];
    let hours = Math.floor(task.elapsedTime / 3600);
    let minutes = Math.floor((task.elapsedTime % 3600) / 60);
    let seconds = task.elapsedTime % 60;

   
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    
    document.getElementById(`elapsed-time-${taskIndex}`).textContent = `Elapsed Time: ${hours}:${minutes}:${seconds}`;
}

function deleteTask(taskIndex) {
    
    tasks.splice(taskIndex, 1);


    const taskElement = document.getElementById(`task-${taskIndex}`);
    taskElement.remove();

    
    reRenderTasks();
    saveToLocalStorage(); 
}

function reRenderTasks() {
    const taskContainer = document.getElementById('task-list');
    taskContainer.innerHTML = ''; 

  
    tasks.forEach((task, index) => {
        displayTask(task, index);
    });
}
