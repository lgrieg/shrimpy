import { parseExcel } from './trainingParser.js';

let db, ref, set, get, child;

if (typeof window !== 'undefined') {
  db = window.db;
  ref = window.ref;
  set = window.set;
  get = window.get;
  child = window.child;
} else {
  const path = new URL('../../firebase.node.js', import.meta.url);
  const firebase = await import(path);
  db = firebase.db;
  ref = firebase.ref;
  set = firebase.set;
  get = firebase.get;
  child = firebase.child;
}

export function initApp() {
  const upload = document.getElementById('uploadExcel');
  if (upload) {
    upload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      parseExcel(file, (data) => {
        displayProgram(data);
        localStorage.setItem('program', JSON.stringify(data));
        saveToFirebase(data);
      });
    });
  }

  // Сначала пробуем localStorage
  const saved = localStorage.getItem('program');
  if (saved) {
    displayProgram(JSON.parse(saved));
  } else {
    // Если нет локальных данных, пробуем Firebase
    loadFromFirebase().then(data => {
      if (data) {
        displayProgram(data);
        localStorage.setItem('program', JSON.stringify(data));
      }
    }).catch(err => {
      console.error('Ошибка при загрузке из Firebase:', err);
    });
  }
}

export function displayProgram(program) {
  const container = document.getElementById('program');
  if (!container) return;

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

async function loadFromFirebase() {
  const userId = "demoUser";
  const snapshot = await get(child(ref(db), 'programs/' + userId));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.warn("Нет данных в Firebase");
    return null;
  }
}

export { db, ref, set, get, child };