/**
 * treats the first row as headers
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
export declare function MakeObjectsFromCsv(csv: string, delimiter?: string, maxIterations?: number): any[];
