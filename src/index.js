import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import Task from './modules/task.js';
import DisplayManager from './modules/display_manager.js';

const selector = (element) => document.querySelector(element);

let tasks = [new Task(1, 'one', 'ok'), new Task(2, 'two', 'ok'), new Task(4, 'four', 'ok'), new Task(3, 'three', 'ok'), new Task(5, 'five', 'ok')];

tasks = tasks.sort((a, b) => a.index - b.index);

tasks.forEach((task) => DisplayManager.displayTask(selector('.tasks'), task));
