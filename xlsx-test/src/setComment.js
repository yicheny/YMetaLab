const XLSX = require('xlsx');

// 创建一个包含标题和数据的数组
const data = [
    ['A', 'B', 'C'],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// 创建一个空的工作簿
const wb = XLSX.utils.book_new();

// 将数据添加到工作表中
const ws = XLSX.utils.aoa_to_sheet(data);

// 添加批注
const cellRef = 'A1';
const comment = {
    t: '这是标题A的批注', // 批注内容
    h: 'Author', // 批注作者
};
ws[cellRef].c = [comment];

// 将工作表添加到工作簿
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// 将工作簿保存为Excel文件
XLSX.writeFile(wb, '../static/comment-example.xlsx');
