"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeObjectsFromCsv = void 0;
const MakeMatrixFromCsv_1 = require("./MakeMatrixFromCsv");
/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
function MakeObjectsFromCsv(csv, delimiter = `,`, maxIterations) {
    const matrix = (0, MakeMatrixFromCsv_1.MakeMatrixFromCsv)(csv, delimiter, maxIterations);
    const [headers, ...rest] = matrix;
    const headersLength = headers.length;
    const objects = [];
    for (const row of rest) {
        const object = {};
        for (let headerIndex = 0; headerIndex < headersLength; ++headerIndex) {
            const header = headers[headerIndex];
            object[header] = row[headerIndex];
        }
        objects.push(object);
    }
    return objects;
}
exports.MakeObjectsFromCsv = MakeObjectsFromCsv;
