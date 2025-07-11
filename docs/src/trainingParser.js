// docs/src/trainingParser.js

export function parseExcel(file, callback) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      callback(json);
    } catch (err) {
      console.error("Ошибка разбора Excel:", err);
      alert("Ошибка чтения Excel-файла");
    }
  };

  reader.readAsArrayBuffer(file);
}
