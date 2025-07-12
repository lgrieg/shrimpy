let db, ref, set, get, child;

if (typeof window !== 'undefined') {
  // 📦 Получаем из глобального контекста (если подключено firebase.js через <script>)
  db = window.db;
  ref = window.ref;
  set = window.set;
  get = window.get;
  child = window.child;
  console.log('Firebase init (browser):', { db, ref, set, get, child });
} else {
  // 🧪 Node.js: импортируем firebase.node.js
  const path = new URL('../firebase.node.js', import.meta.url);
  const firebase = await import(path);
  db = firebase.db;
  ref = firebase.ref;
  set = firebase.set;
  get = firebase.get;
  child = firebase.child;
  console.log('Firebase init (node):', { db, ref, set, get, child });
}


function makeSafeId(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export function initApp() {
  const upload = document.getElementById('uploadExcel');
  if (upload) {
    upload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      parseExcel(file, (data) => {
        displayProgram(data, saveCheckboxStatus);
        localStorage.setItem('program', JSON.stringify(data));
        saveToFirebase(data);
      });
    });
  }

  const saved = localStorage.getItem('program');
  if (saved) {
    displayProgram(JSON.parse(saved), saveCheckboxStatus);
  } else {
    loadFromFirebase().then(data => {
      if (data) {
        displayProgram(data, saveCheckboxStatus);
        localStorage.setItem('program', JSON.stringify(data));
      }
    }).catch(err => {
      console.error('Ошибка при загрузке из Firebase:', err);
    });
  }
}

export function displayProgram(program, saveCheckboxStatus = () => {}) {
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

    exercises.forEach((ex, index) => {
      const uidRaw = `${day}-${index}`;
      const uid = makeSafeId(uidRaw);  // ✅ Теперь в нужной области видимости

      const exDiv = document.createElement('div');
      exDiv.innerHTML = `
        <strong>${ex['Упражнение']}</strong><br>
        Подходы: <input type="number" value="${ex['Подходы']}" /><br>
        Повторы: <input type="number" value="${ex['Повторы']}" /><br>
        Вес: <input type="number" value="${ex['Вес (кг)']}" step="0.5" /> кг<br>
        <label><input type="checkbox" id="${uid}" ${ex.done ? 'checked' : ''}/> Выполнено</label><hr>
      `;

      const checkbox = exDiv.querySelector(`#${uid}`);
      checkbox.addEventListener('change', () => {
        saveCheckboxStatus(uid, checkbox.checked);
      });

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
  console.log('loadFromFirebase ref =', ref);
  console.log('loadFromFirebase typeof ref =', typeof ref);
  console.log('loadFromFirebase db =', db);

  const snapshot = await get(child(ref(db), 'programs/' + userId));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.warn("Нет данных в Firebase");
    return null;
  }
}

function saveCheckboxStatus(exerciseId, status) {
  const userId = "demoUser";
  set(ref(db, `programs/${userId}/completed/${exerciseId}`), status);
}

async function loadCheckboxStatuses() {
  const userId = "demoUser";
  const snapshot = await get(child(ref(db), `programs/${userId}/completed`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
}

export { db, ref, set, get, child };
