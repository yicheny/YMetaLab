const XLSX = require('xlsx');

main();

function main(){
    const wb = XLSX.readFile('../static/overtime.xlsx',{cellText:true});
    const json = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1,{});
    formatDate(json,['加班日期'])
    console.log('wb',json);

    function formatDate(data,keys){
        data.forEach(x=>{
            keys.forEach((k)=>{
                x[k] = XLSX.SSF.format('y-m-d HH:MM:SS',x[k]);
            })
        });
    }
}

//官方文档：
//By default, Excel stores dates as numbers with a format code that specifies date processing. For example, the date 19-Feb-17 is stored as the number 42785 with a number format of d-mmm-yy. The SSF module understands number formats and performs the appropriate conversion.
//
// XLSX also supports a special date type d where the data is an ISO 8601 date string. The formatter converts the date back to a number.
//
// The default behavior for all parsers is to generate number cells. Setting cellDates to true will force the generators to store dates.
