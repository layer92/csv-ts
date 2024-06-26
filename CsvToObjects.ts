import { CsvParseOptions } from "./CsvParseOptions";
import { CsvToMatrix } from "./CsvToMatrix";

/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * @returns an array of objects, where the fields are the first row of the csv, and each row after that becomes an object with those values. If a cell is empty/the row isn't long enough to have a cell, then the field for that object will be undefined.
 * */
export function CsvToObjects(csv:string,options?:CsvParseOptions):{[column:string]:(string|undefined)}[]{
    const matrix = CsvToMatrix(csv,options);
    const [headers,...rest] = matrix;
    const headersLength = headers.length;
    const objects = [];
    for(const row of rest){
        const object:{[column:string]:(string|undefined)} = {};
        for(let headerIndex=0;headerIndex<headersLength;++headerIndex){
            const header = headers[headerIndex];
            const value = row[headerIndex];
            if(value!=="" && value!==undefined){
                object[header] = value;
            }
        }
        objects.push(object);
    }
    return objects;
}
