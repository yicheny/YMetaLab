const ExcelJS = require('exceljs');

async function generateExcel(data, columns, filePath) {
    // 创建一个新的工作簿
    const workbook = new ExcelJS.Workbook();
    // 添加一个工作表
    const worksheet = workbook.addWorksheet('Sheet1');

    // 生成标题
    const headers = columns.map(col => col.header);
    worksheet.addRow(headers);

    // 填充数据
    data.forEach(item => {
        const rowData = columns.map(col => item[col.bind]);
        worksheet.addRow(rowData);
    });

    // 添加标题的批注
    columns.forEach((col, index) => {
        const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}1`);
        cell.note = col.comment;
    });

    // 将工作簿保存为Excel文件
    await workbook.xlsx.writeFile(filePath);
}

// 示例数据和列配置
const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 },
    { a: 7, b: 8, c: 9 }
];

const columns = [
    { header: '标题1', bind: 'a', comment: "标题1的批注" },
    { header: '标题2', bind: 'b', comment: "标题2的批注" },
    { header: '标题3', bind: 'c', comment: "标题3的批注" }
];

// 指定生成的 Excel 文件路径或名称
const filePath = '../dist/generateExcel.xlsx';

// 调用方法生成 Excel 文件
generateExcel(data, columns, filePath)
    .then(() => {
        console.log("Excel 文件已创建并保存。");
    })
    .catch(error => {
        console.error("生成 Excel 文件时出现错误：", error);
    });
