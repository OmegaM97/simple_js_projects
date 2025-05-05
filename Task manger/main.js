let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save the tasks to storage.
function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderOnPage();

// to render all the tasks in to the page with their buttons and important elements.
function renderOnPage () {
  let tasksListHTML = "";

  //generate html for each task array elements.
  tasks.forEach((task, index) => {
    let html = `<ul>
        <li>
          <div class="wrap">
            <input class="input-radio js-input-radio" data-index="${index}" type="checkbox">
            <span>${task.task}</span>
          </div>
          <div class="nowrap">${task.date}</div>
          <div class="remove-btn-div">
          <button data-index="${index}" class="js-remove-btn">Remove</button>
          </div>
        </li>
      </ul>`;

    tasksListHTML += html;
  });

  //render the generated html to the container.
  document.querySelector('.js-list-container')
  .innerHTML = tasksListHTML;

  document.querySelector('.js-clear-all-div')
  .innerHTML = '';

  //to create clear all button if there are more than two tasks.
  if(tasks.length > 1) {
    const clearAllDiv = document.querySelector('.js-clear-all-div')

    clearAllDiv.innerHTML = `<button class="clear-all-btn js-clear-all-btn">Clear all</button>`;

    //to make sure if the user really want to all clear the tasks.
    document.querySelector('.js-clear-all-btn')
    .addEventListener('click', () => {

      //render are you sure message with yes or no button.
      clearAllDiv.innerHTML = `Are you sure you want to clear all <span class="yes-or-no-span">
      <button class="yes-btn js-yes-btn">Yes</button> <button class="no-btn js-no-btn">No</button>
      </span>`;

      //if yes clear all the tasks in the tasks array and rerender the page.
      document.querySelector('.js-yes-btn')
      .addEventListener('click', () =>{
        tasks = [];

        saveToStorage();
        renderOnPage();
      });

      //if no just rerender the page.
      document.querySelector('.js-no-btn')
      .addEventListener('click', () => {
        renderOnPage();
      });

    });

  }

  //check if the checkbox is checked and store the value to the relevant tasks array element.
  document.querySelectorAll('.js-input-radio')
  .forEach((input) => {
    if(tasks[input.dataset.index].checked) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      tasks[input.dataset.index].checked = input.checked;
      saveToStorage();
    });
  });

  //create remove button to remove the relevant element from tasks array and rerender the page.
  document.querySelectorAll('.js-remove-btn')
.forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.dataset.index;

    tasks.splice(index,1);

    saveToStorage();
    renderOnPage();
  });
});

//add button to add task into the tasks array and renderit on page.
document.querySelector('.js-add-btn')
.addEventListener('click', () => {
  const taskInput = document.querySelector('.js-input-task');
  const dateInput = document.querySelector('.js-input-date');

  if(taskInput.value && dateInput.value) {
    tasks.push({
      task: taskInput.value,
      date: dateInput.value,
      checked: false
    });
  }

  taskInput.value = '';
  dateInput.value = '';

  saveToStorage();
  renderOnPage();
});


}