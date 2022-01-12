import './style.css';
import TasksManager from './modules/tasks_manager.js';
import DisplayManager from './modules/display_manager.js';

const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);
const input = selector('input');
const manager = new TasksManager();

const deleteTask = (index) => {
  manager.deleteTask(index);
  DisplayManager.reset(selector('.tasks'));
  manager.getTasks().forEach((task) => DisplayManager.displayTask(selector('.tasks'), task));
  selectorAll('.fa-trash').forEach((e) => e.addEventListener('click', () => {
    deleteTask(e.dataset.id);
  }));
};

const updateTask = (event, index) => {
  if (event.key === 'Enter') {
    manager.updateTask(index, selector(`.task_${index}`).value, selector(`.task_${index}_checkbox`).checked);
  }
};

input.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    const t = manager.addTask(input.value);
    DisplayManager.displayTask(selector('.tasks'), t);

    selector(`#task_${t.index}`).addEventListener('click', () => {
      deleteTask(t.index);
    });

    selector(`#input_task_${t.index}`).addEventListener('keyup', (event) => {
      updateTask(event, t.index);
    });
  }
});
