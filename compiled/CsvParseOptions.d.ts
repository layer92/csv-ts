export type CsvParseOptions = {
    maxIterations?: number;
    includeEmptyRows?: boolean;
    /** default is `,` */
    delimiter?: string;
};
