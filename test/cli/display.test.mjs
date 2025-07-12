import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { displayProgram } from '../../src/app.js';

describe('displayProgram()', () => {
  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="program"></div>`);
    global.window = dom.window;
    global.document = dom.window.document;
  });

  it('отображает программу', () => {
    const program = [{
      'Неделя': 1,
      'День': 'Понедельник',
      'Упражнение': 'Присед',
      'Подходы': 3,
      'Повторы': 10,
      'Вес (кг)': 60
    }];

    displayProgram(program, () => {}); // Пустая функция-заглушка

    const headers = document.querySelectorAll('h2');
    expect(headers.length).to.be.greaterThan(0);
    expect(headers[0].textContent).to.include('Неделя 1');
  });
});
