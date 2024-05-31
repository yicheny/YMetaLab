// excelUtils.js

async function generateExcelWorkbook(data, columns) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 生成标题
    const headers = columns.map(col => col.header);
    const headerRow = worksheet.addRow(headers);

    // 设置标题字体颜色
    columns.forEach((col, index) => {
        const cell = headerRow.getCell(index + 1);
        if (col.required) {
            cell.font = {
                color: { argb: 'FFFF0000' } // 红色字体
            };
        }
    });

    // 填充数据
    data.forEach(item => {
        const rowData = columns.map(col => item[col.bind]);
        worksheet.addRow(rowData);
    });

    // 添加标题的批注
    columns.forEach((col, index) => {
        const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}1`);
        if (col.comment) cell.note = col.comment;
    });

    return workbook;
}

export { generateExcelWorkbook };
