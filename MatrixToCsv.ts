/**
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
export function MatrixToCsv(matrix:string[][],delimiter=`,`,lineDelimiter=`\n`):string{
    let csv = ``;
    for(const row of matrix){
        if(csv.length){
            csv+=lineDelimiter;
        }
        let csvRow = ``;
        for(let cell of row){
            if(csvRow.length){
                csvRow+=delimiter;
            }
            const needsQuotes = (
                cell.includes(delimiter)
                ||cell.includes(`\r`)
                ||cell.includes(`\n`)
            );
            if(needsQuotes){
                cell = `"`+cell.split(`"`).join(`""`)+`"`;
            }
            csvRow += cell;
        }
        csv += csvRow;
    }
    return csv;
}