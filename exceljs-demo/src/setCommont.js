const ExcelJS = require('exceljs');

// 创建一个新的工作簿
const workbook = new ExcelJS.Workbook();

// 添加一个工作表
const worksheet = workbook.addWorksheet('Sheet1');

// 添加标题行
worksheet.addRow(['A', 'B', 'C']);

// 添加数据行
worksheet.addRow([1, 2, 3]);
worksheet.addRow([4, 5, 6]);
worksheet.addRow([7, 8, 9]);

// 添加悬停批注
const cellA1 = worksheet.getCell('A1');
cellA1.note = '这是标题A的悬停批注';

// 将工作簿保存为Excel文件
workbook.xlsx.writeFile('../dist/comment.xlsx')
    .then(function() {
        console.log("Excel 文件已创建并保存。");
    });
