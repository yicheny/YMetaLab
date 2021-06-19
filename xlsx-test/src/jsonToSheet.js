const XLSX = require('xlsx');

main();

function main(){
    // writeXlsx();
    readXlsx();
}

function writeXlsx(){
    const ws = XLSX.utils.json_to_sheet([
        { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
        { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
        { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  }
    ], {header:["A","B","C","D","E","F","G"], skipHeader:true});

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,'sheetOne');

    XLSX.writeFile(wb,'jsonToSheet.xlsx',{
        bookType:"xlsx"
    })
}

function readXlsx(){
    const workbook = XLSX.readFile('./jsonToSheet.xlsx');
    console.log('workbook',workbook);
}
