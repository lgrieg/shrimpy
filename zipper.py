from zipfile import ZipFile
from io import BytesIO
import pandas as pd

# Данные для Excel
data = [
    {"Неделя": 1, "День": "Пн", "Упражнение": "Приседания", "Подходы": 3, "Повторы": 10, "Вес (кг)": 40, "Прогрессия": "+2.5 кг/неделя"},
    {"Неделя": 1, "День": "Пн", "Упражнение": "Жим лёжа", "Подходы": 3, "Повторы": 8, "Вес (кг)": 50, "Прогрессия": "+2.5 кг/неделя"},
    {"Неделя": 1, "День": "Ср", "Упражнение": "Становая тяга", "Подходы": 3, "Повторы": 5, "Вес (кг)": 60, "Прогрессия": "+5 кг/неделя"},
    {"Неделя": 2, "День": "Пн", "Упражнение": "Приседания", "Подходы": 3, "Повторы": 10, "Вес (кг)": 42.5, "Прогрессия": "+2.5 кг/неделя"},
    {"Неделя": 2, "День": "Пн", "Упражнение": "Жим лёжа", "Подходы": 3, "Повторы": 8, "Вес (кг)": 52.5, "Прогрессия": "+2.5 кг/неделя"},
    {"Неделя": 2, "День": "Ср", "Упражнение": "Становая тяга", "Подходы": 3, "Повторы": 5, "Вес (кг)": 65, "Прогрессия": "+5 кг/неделя"},
]

# Создание Excel
excel_buffer = BytesIO()
df = pd.DataFrame(data)
df.to_excel(excel_buffer, index=False)
excel_buffer.seek(0)

# Файлы проекта
project_files = {
    "training_program.xlsx": excel_buffer.read(),
    "public/index.html": """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Моя Тренировка</title>
  <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
  <script type="module" src="../src/app.js"></script>
</head>
<body>
  <h1>Программа тренировок</h1>
  <input type="file" id="uploadExcel" />
  <div id="program"></div>
</body>
</html>""",
    "src/app.js": """import { parseExcel } from './trainingParser.js';
import { db, ref, set } from './firebase.js';

document.getElementById('uploadExcel').addEventListener('change', (event) => {
  const file = event.target.files[0];
  parseExcel(file, (data) => {
    displayProgram(data);
    saveToFirebase(data);
  });
});

function displayProgram(program) {
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
  const userId = "demoUser"; // Здесь можно добавить авторизацию
  set(ref(db, 'programs/' + userId), data);
}""",
    "src/trainingParser.js": """export function parseExcel(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(firstSheet);
    callback(json);
  };
  reader.readAsArrayBuffer(file);
}""",
    "src/firebase.js": """import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "your-app.firebaseapp.com",
  databaseURL: "https://your-app.firebaseio.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child };"""
}

# Создание архива
with ZipFile("fitness-app.zip", "w") as zipf:
    for path, content in project_files.items():
        zipf.writestr(path, content)

print("Архив создан: fitness-app.zip")
