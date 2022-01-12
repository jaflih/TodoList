import Task from './task.js';
import StorageManager from './storage_manager.js';

export default class TasksManager {
  constructor() {
    this.tasks = [];
  }

  getTasks = () => this.tasks.sort((a, b) => a.index - b.index);

  addTask = (description, completed = false) => {
    const newTask = new Task(this.tasks.length + 1, description, completed);
    this.tasks.push(newTask);
    StorageManager.save(this.tasks);
    return newTask;
  };

  deleteTask = (e) => {
    const newTasks = [];
    const taskIndex = e - 1;

    this.tasks.forEach((t, index) => {
      if (index < taskIndex) {
        newTasks.push(t);
      } else if (index > taskIndex) {
        t.index = index;
        newTasks.push(t);
      }
    });
    this.tasks = newTasks;
    StorageManager.save(this.tasks);
  };

  updateTask = (index, description, completed) => {
    this.tasks[index - 1].description = description;
    this.tasks[index - 1].completed = completed;
    StorageManager.save(this.tasks);

    return this.tasks[index - 1];
  };
}
