import { parseExcel } from './trainingParser.js';
let db, ref, set;

if (typeof window !== 'undefined') {
  // Браузер: значения уже определены в window.firebase.js
  db = window.db;
  ref = window.ref;
  set = window.set;
} else {
  // Node.js (тесты)
  const firebase = await import('../../firebase.node.js');
  db = firebase.db;
  ref = firebase.ref;
  set = firebase.set;
}

export function initApp() {
  const upload = document.getElementById('uploadExcel');
  if (!upload) return;

  upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    parseExcel(file, (data) => {
      displayProgram(data);
      saveToFirebase(data);
    });
  });
}

export function displayProgram(program) {
  const container = document.getElementById('program');
  container.innerHTML = '';
  const grouped = {};

  program.forEach(entry => {
    const key = `Неделя ${entry['Неделя']}, ${entry['День']}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  });

  for (const [day, exercises] of Object.entries(grouped)) {
    const section = document.createElement('div');
    section.innerHTML = `<h2>${day}</h2>`;
    exercises.forEach(ex => {
      const exDiv = document.createElement('div');
      exDiv.innerHTML = `
        <strong>${ex['Упражнение']}</strong><br>
        Подходы: <input type="number" value="${ex['Подходы']}" /><br>
        Повторы: <input type="number" value="${ex['Повторы']}" /><br>
        Вес: <input type="number" value="${ex['Вес (кг)']}" step="0.5" /> кг<br>
        <label><input type="checkbox" /> Выполнено</label><hr>
      `;
      section.appendChild(exDiv);
    });
    container.appendChild(section);
  }
}

function saveToFirebase(data) {
  const userId = "demoUser";
  set(ref(db, 'programs/' + userId), data);
}