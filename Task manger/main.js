const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderOnPage();

function renderOnPage () {
  let tasksListHTML = "";
  tasks.forEach((task, index) => {
    let html = `<ul>
        <li>
          <div class="wrap">
            <input class="input-radio js-input-radio" data-index="${index}" type="checkbox">
            <span>${task.task}</span>
          </div>
          <div class="nowrap">${task.date}</div>
          <button data-index="${index}" class="js-remove-btn">Remove</button>
        </li>
      </ul>`;

    tasksListHTML += html;
  });
  document.querySelector('.js-list-container')
  .innerHTML = tasksListHTML;

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

  document.querySelectorAll('.js-remove-btn')
.forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.dataset.index;

    tasks.splice(index,1);

    saveToStorage();
    renderOnPage();
  });
});

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