export async function parseExcel(fileOrBuffer, callback) {
  let Excel;
  let arrayBuffer;

  if (typeof window !== 'undefined' && window.ExcelJS) {
    // ✅ В браузере: ExcelJS подключён через <script>
    Excel = window.ExcelJS;

    if (fileOrBuffer instanceof File) {
      arrayBuffer = await fileOrBuffer.arrayBuffer();
    } else {
      arrayBuffer = fileOrBuffer;
    }
  } else {
    // ✅ В Node.js: импорт из npm
    const exceljsModule = await import('exceljs');
    Excel = exceljsModule.default || exceljsModule;  // <--- ВАЖНО!
    arrayBuffer = fileOrBuffer;
  }

  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.getWorksheet(1);
  const data = [];

  const headers = worksheet.getRow(1).values.slice(1); // пропуск нулевого индекса

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      rowData[headers[colNumber - 1]] = cell.text;
    });
    data.push(rowData);
  });

  callback(data);
}
