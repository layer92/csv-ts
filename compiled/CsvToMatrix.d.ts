import { CsvParseOptions } from "./CsvParseOptions";
/**
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
export declare function CsvToMatrix(csv: string, options?: CsvParseOptions): string[][];
