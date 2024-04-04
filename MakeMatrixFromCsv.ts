/**
 * CSV according to RFC 4180
 * @param delimiter: an alternative delimiter to comma, cannot be double quote
 * */
export function MakeMatrixFromCsv(csv:string,delimiter=`,`,maxIterations?:number){
    const csvLength = csv.length;
    if(delimiter.includes(`"`)){
        throw new Error(`Unsupported delimiter: " cannot be used as csv delimiter.`)
    };
    let matrix = [];
    let currentRow:string[] = [];
    matrix.push(currentRow);
    let cursor = 0;
    let iterations = 0;
    while(true){
        if(maxIterations){
            if(++iterations > maxIterations){
                throw new Error(`Exceeded max iterations.`);
            }
        }
        
        const isQuotedValue = csv[cursor] === `"`;
        let value = ``;
        // in a quoted value case, we pull the quoted part into the value early,
        // then let the logic continue
        if(isQuotedValue){
            const valueStart = cursor+1;
            const valueEnd = GetIndexOfSingleQuote(csv,valueStart);
            if(valueEnd==-1){
                throw new Error(`CSV had unterminated quote.`);
            }
            // move cursor past the end quote
            cursor = valueEnd+1;
            value = csv.slice(valueStart,valueEnd);
            // undelimit quotes
            value = value.split(`""`).join(`"`);
        }
        // in a quoted value case, this logic will simply add an empty string to the already populated value
        const valueStart = cursor;
        let delimiterIndex = csv.indexOf(delimiter,valueStart);
        if(delimiterIndex===-1){
            delimiterIndex = csvLength;
        }
        let returnEndIndex = csv.indexOf(`\r\n`,valueStart);
        if(returnEndIndex===-1){
            returnEndIndex = csvLength;
        }
        let newlineIndex = csv.indexOf(`\n`,valueStart);
        if(newlineIndex===-1){
            newlineIndex = csvLength;
        }
        const valueEnd = Math.min(delimiterIndex,returnEndIndex,newlineIndex);
        value += csv.slice(valueStart,valueEnd);
        currentRow.push(value);
        if(valueEnd==csvLength){
            return matrix;
        }
        cursor = valueEnd;
        if(valueEnd===delimiterIndex){
            // move past delmiter
            cursor += delimiter.length;
            // since we have more to do on this line
            continue;
        }
        // END OF LINE section
        if(csv[cursor]===`\r`){
            // move past \r
            ++cursor;
        }
        // move past the \n
        ++cursor;
        // create new row
        currentRow = [];
        matrix.push(currentRow);
    }
}

/** Skips any pairs of quotes, so in string `"""" """ "` would return 7 */
function GetIndexOfSingleQuote(string:string,position:number){
    const stringLength = string.length;
    let cursor:number=position;
    while(true){
        if(cursor >= stringLength){
            return -1;
        }
        cursor = string.indexOf(`"`,cursor);
        if(cursor===-1){
            return -1;
        }
        if(string[cursor+1]===`"`){
            // if it's a quote pair, move past the pair
            cursor += 2;
        }else{
            return cursor
        }
    }
}
