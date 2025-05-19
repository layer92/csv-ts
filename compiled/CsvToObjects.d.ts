import { CsvParseOptions } from "./CsvParseOptions";
/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * @returns an array of objects, where the fields are the first row of the csv, and each row after that becomes an object with those values. If a cell is empty/the row isn't long enough to have a cell, then the field for that object will be undefined.
 * */
export declare function CsvToObjects(csv: string, options?: CsvParseOptions & {
    /** default is to not write the value onto the object. You can set to "" to make empty cells become empty strings on the object. */
    emptyCellValue?: string;
}): {
    [column: string]: (string | undefined);
}[];
