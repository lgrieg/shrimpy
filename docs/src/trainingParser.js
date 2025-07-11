// Импорт локальной версии библиотеки xlsx.mjs
import * as XLSX from './xlsx.mjs';

/**
 * Читает Excel-файл и преобразует его в массив объектов (одна строка — одно упражнение)
 * @param {File} file - Загруженный файл .xlsx
 * @param {Function} callback - Функция, вызываемая с результатом (JSON-массив)
 */
export function parseExcel(file, callback) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Берем первый лист
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Преобразуем лист в JSON
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      callback(json);
    } catch (error) {
      console.error("Ошибка при чтении Excel-файла:", error);
      alert("Не удалось прочитать файл. Проверь формат и содержимое.");
    }
  };

  reader.onerror = function () {
    console.error("Ошибка чтения файла:", reader.error);
    alert("Ошибка чтения файла");
  };

  reader.readAsArrayBuffer(file);
}
