import { selector, hasClass, addClass, removeClass } from './tools.js';

let dernierElementParcouru;

export default class DragAndDrop {
  static dragStartEvent = (evt) => {
    addClass(evt.target, 'dragStart');
    evt.dataTransfer.setData('tex/html', evt.target.id);
  };

  static dragEndEvent = (evt) => {
    removeClass(evt.target, 'dragStart');
  };

  static dragEnterEvent = (evt) => {
    if (!hasClass(evt.target, 'input_task') && !hasClass(evt.target, 'task_input')) {
      addClass(evt.target, 'dragSurvol');
    }
  };

  static dragLeaveEvent = (evt) => {
    if (evt.target == dernierElementParcouru) {
    }
    removeClass(evt.target, 'dragSurvol');
  };

  static dragOverEvent = (evt) => {
    if (hasClass(evt.target, 'task')) {
      dernierElementParcouru = evt.target;
    }
    evt.preventDefault();
  };

  static dropEvent = (evt) => {
    if (evt.currentTarget.contains(evt.relatedTarget)) {
      return;
    }
    if (evt.target.id == 'depot') {
      console.log('CAS E');
    } else {
      //let element = selector('#' + evt.target.id);
      let dt = evt.dataTransfer;
      let elementADeplacer = selector('#' + dt.getData('tex/html'));
      let items = document.querySelectorAll('.task');

      if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position == 1) {
        // inversion
        //console.log('CAS A');
        let old = elementADeplacer.dataset.position;
        dernierElementParcouru.before(elementADeplacer);
        elementADeplacer.dataset.position = dernierElementParcouru.dataset.position;
        dernierElementParcouru.dataset.position = old;
      } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position == -1) {
        // inversion
        //console.log('CAS B');

        dernierElementParcouru.after(elementADeplacer);
        let old = elementADeplacer.dataset.position;
        elementADeplacer.dataset.position = dernierElementParcouru.dataset.position;
        dernierElementParcouru.dataset.position = old;
      } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position > 1) {
        //console.log('CAS C');

        let min = dernierElementParcouru.dataset.position;
        let max = elementADeplacer.dataset.position;

        dernierElementParcouru.before(elementADeplacer);

        for (let i = 0; i < items.length; i++) {
          let e = items[i];
          let position = e.dataset.position;

          if (min <= position && position <= max) {
            if (e.id == elementADeplacer.id) {
              e.dataset.position = min;
            } else {
              let w = Number.parseInt(position) + 1;
              e.dataset.position = w;
            }
          }
        }
      } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position < 1) {
        //console.log('CAS D');

        let max = dernierElementParcouru.dataset.position;
        let min = elementADeplacer.dataset.position;

        dernierElementParcouru.after(elementADeplacer);

        for (let i = 0; i < items.length; i++) {
          let e = items[i];
          let position = e.dataset.position;

          if (min <= position && position <= max) {
            if (e.id == elementADeplacer.id) {
              e.dataset.position = max;
            } else {
              let w = Number.parseInt(position) - 1;
              e.dataset.position = w;
            }
          }
        }
      }

      removeClass(dernierElementParcouru, 'dragSurvol');
    }
  };
}
