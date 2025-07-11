import ExcelJS from './exceljs.min.js';

export async function parseExcel(file, callback) {
  const reader = new FileReader();

  reader.onload = async function (e) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(e.target.result);

    const worksheet = workbook.getWorksheet(1);
    const data = [];

    const headers = worksheet.getRow(1).values.slice(1); // Пропуск нулевого индекса

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.text;
      });
      data.push(rowData);
    });

    callback(data);
  };

  reader.readAsArrayBuffer(file);
}
