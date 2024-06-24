/**
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
export declare function MatrixToCsv(matrix: string[][], delimiter?: string, lineDelimiter?: string): string;
