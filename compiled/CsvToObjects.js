"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvToObjects = void 0;
const CsvToMatrix_1 = require("./CsvToMatrix");
/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * @returns an array of objects, where the fields are the first row of the csv, and each row after that becomes an object with those values. If a cell is empty/the row isn't long enough to have a cell, then the field for that object will be undefined.
 * */
function CsvToObjects(csv, options) {
    const matrix = (0, CsvToMatrix_1.CsvToMatrix)(csv, options);
    const [headers, ...rest] = matrix;
    const headersLength = headers.length;
    const objects = [];
    for (const row of rest) {
        const object = {};
        for (let headerIndex = 0; headerIndex < headersLength; ++headerIndex) {
            const header = headers[headerIndex];
            const value = row[headerIndex];
            const isEmptyCell = value === "" || value === undefined;
            if (!isEmptyCell) {
                object[header] = value;
            }
            else if (options.emptyCellValue !== undefined) {
                object[header] = options.emptyCellValue;
            }
        }
        objects.push(object);
    }
    return objects;
}
exports.CsvToObjects = CsvToObjects;
