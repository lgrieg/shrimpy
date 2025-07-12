import { describe, it, before } from 'mocha';
import chai from 'chai';
import { JSDOM } from 'jsdom';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseExcel } from '../src/trainingParser.js'; // поправь путь, если отличается
import { displayProgram } from '../src/app.js';    // поправь путь, если отличается

// __dirname и __filename для ES-модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

before(() => {
  // Создаём мок-браузерное окружение
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`, {
    url: 'http://localhost/',
  });

  global.window = dom.window;
  global.document = dom.window.document;

  // Моки для localStorage
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
  };
});

describe('parseExcel', function () {
  it('парсит fake.xlsx', async function () {
    const filePath = path.resolve(__dirname, 'mocks/fake.xlsx');
    const buffer = await fs.readFile(filePath);

    let output = null;
    await parseExcel(buffer, d => (output = d));

    chai.expect(output).to.be.an('array').and.have.length.greaterThan(0);
    chai.expect(output[0]).to.have.property('Упражнение');
  });
});


describe('displayProgram', function () {
  it('отображает DOM элементы', function () {
    const div = document.createElement('div');
    div.id = 'program';
    document.body.appendChild(div);

    const mock = [{
      'Неделя': 1,
      'День': 'Пн',
      'Упражнение': 'A',
      'Подходы': 1,
      'Повторы': 1,
      'Вес (кг)': 10
    }];

    displayProgram(mock);
    
    chai.expect(div.querySelectorAll('h2').length).to.be.greaterThan(0);
    chai.expect(div.querySelectorAll('input').length).to.be.greaterThan(0);
  });
});
