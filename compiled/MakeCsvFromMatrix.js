"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeCsvFromMatrix = void 0;
/**
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
function MakeCsvFromMatrix(matrix, delimiter = `,`, lineDelimiter = `\n`) {
    let csv = ``;
    for (const row of matrix) {
        if (csv.length) {
            csv += lineDelimiter;
        }
        let csvRow = ``;
        for (let cell of row) {
            if (csvRow.length) {
                csvRow += delimiter;
            }
            const needsQuotes = (cell.includes(delimiter)
                || cell.includes(`\r`)
                || cell.includes(`\n`));
            if (needsQuotes) {
                cell = `"` + cell.split(`"`).join(`""`) + `"`;
            }
            csvRow += cell;
        }
        csv += csvRow;
    }
    return csv;
}
exports.MakeCsvFromMatrix = MakeCsvFromMatrix;
