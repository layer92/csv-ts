// import assert = require("assert");
import { MakeMatrixFromCsv } from "./MakeMatrixFromCsv";
import { MakeCsvFromMatrix } from "./MakeCsvFromMatrix";
import assert from "assert";

// TODO: split these into several edge cases
const TestCsv = `a,"b,b",c\nd,",e""e""",f,\ng,"h\nh",",,,i""i"""\n\nj,,l`;
const TestMatrix = [
    [`a`,`b,b`,`c`],
    [`d`,`,e"e"`,`f`,``],
    [`g`,`h\nh`,`,,,i"i"`],
    [``],
    [`j`,``,`l`],
];


describe("MakeMatrixFromCsv",()=>{
    it("basic test",()=>{
        const matrix = MakeMatrixFromCsv(TestCsv);
        assert.deepStrictEqual(matrix,TestMatrix);
    });
    it("edge case: empty string",()=>{
        const matrix = MakeMatrixFromCsv(``);
        const expectedMatrix = [
            [``]
        ];
        assert.deepStrictEqual(matrix,expectedMatrix);
    });
    it("edge case: carriage return",()=>{
        const matrix = MakeMatrixFromCsv(`\r\n`);
        const expectedMatrix = [
            [``],
            [``]
        ];
        assert.deepStrictEqual(matrix,expectedMatrix);
    });
    it("edge case: unterminated quote",()=>{
        assert.throws( ()=>{
            MakeMatrixFromCsv(`a,"b,c`);
        } );
    });
});


describe("MakeCsvFromMatrix",()=>{
    it("basic test",()=>{
        const csv = MakeCsvFromMatrix(TestMatrix);
        assert.deepStrictEqual(csv,TestCsv);
    });
});