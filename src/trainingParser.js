export async function parseExcel(file, callback) {
  const reader = new FileReader();
  console.log('Файл получен:', file);

  reader.onload = async function (e) {
    console.log('Файл прочитан, загружаю в ExcelJS...');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(e.target.result);
    console.log('Excel успешно загружен');

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
