import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import { displayProgram } from '../../docs/src/app.js';

describe('displayProgram()', () => {
  it('отображает программу', () => {
    const dom = new JSDOM(`<div id="program"></div>`);
    global.document = dom.window.document;

    const program = [{
      'Неделя': 1,
      'День': 'Понедельник',
      'Упражнение': 'Присед',
      'Подходы': 3,
      'Повторы': 10,
      'Вес (кг)': 60
    }];

    displayProgram(program);

    const divs = document.querySelectorAll('h2');
    expect(divs.length).to.be.greaterThan(0);
  });
});
