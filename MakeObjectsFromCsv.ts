import { CsvParseOptions } from "./CsvParseOptions";
import { MakeMatrixFromCsv } from "./MakeMatrixFromCsv";

/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * @returns an array of objects, where the fields are the first row of the csv, and each row after that becomes an object with those values
 * */
export function MakeObjectsFromCsv(csv:string,options?:CsvParseOptions):any[]{
    const matrix = MakeMatrixFromCsv(csv,options);
    const [headers,...rest] = matrix;
    const headersLength = headers.length;
    const objects = [];
    for(const row of rest){
        const object:{[column:string]:(string|undefined)} = {};
        for(let headerIndex=0;headerIndex<headersLength;++headerIndex){
            const header = headers[headerIndex];
            object[header] = row[headerIndex];
        }
        objects.push(object);
    }
    return objects;
}
