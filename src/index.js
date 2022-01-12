import './style.css';
import TasksManager from './modules/tasks_manager.js';
import DisplayManager from './modules/display_manager.js';

const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);
const input = selector('input');
const manager = new TasksManager();

const updateTask = (event, index) => {
  if (event.key === 'Enter') {
    manager.updateTask(index, selector(`.task_${index}`).value, selector(`.task_${index}_checkbox`).checked);
  }
};

const deleteTask = (index) => {
  manager.deleteTask(index);
  DisplayManager.reset(selector('.tasks'));
  manager.getTasks().forEach((task) => DisplayManager.displayTask(selector('.tasks'), task));

  selectorAll('.fa-trash').forEach((e) => e.addEventListener('click', () => {
    deleteTask(e.dataset.id);
  }));

  selectorAll('.input_task').forEach((e) => e.addEventListener('keyup', (event) => {
    updateTask(event, e.dataset.id);
  }));
};

input.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    const task = manager.addTask(input.value);
    DisplayManager.displayTask(selector('.tasks'), task);

    selector(`#task_${task.index}`).addEventListener('click', () => {
      deleteTask(task.index);
    });

    selector(`#input_task_${task.index}`).addEventListener('keyup', (event) => {
      updateTask(event, task.index);
    });
  }
});
