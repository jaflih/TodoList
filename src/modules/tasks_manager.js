import Task from './task.js';

export default class TasksManager {
  constructor() {
    this.tasks = [];
  }

  getTasks = () => this.tasks.sort((a, b) => a.index - b.index);

  addTask = (description, completed = false) => {
    const newTask = new Task(this.tasks.length, description, completed);
    this.tasks.push(newTask);
    return newTask;
  };

  deleteTask = (e) => {
    const newTasks = [];

    this.tasks.forEach((t, index) => {
      if (index < e) {
        newTasks.push(t);
      } else if (index > e) {
        t.index = index - 1;
        newTasks.push(t);
      }
    });
    this.tasks = newTasks;
  };

  updateTask = (index, description, completed) => {
    this.tasks[index].description = description;
    this.tasks[index].completed = completed;

    return this.tasks[index];
  };
}
