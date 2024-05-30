// excelUtils.js

// 生成 Excel 文件的方法
async function generateExcelWorkbook(data, columns) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const headers = columns.map(col => col.header);
    worksheet.addRow(headers);

    data.forEach(item => {
        const rowData = columns.map(col => item[col.bind]);
        worksheet.addRow(rowData);
    });

    columns.forEach((col, index) => {
        const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}1`);
        cell.note = col.comment;
    });

    return workbook;
}

export { generateExcelWorkbook };
