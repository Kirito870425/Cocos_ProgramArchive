
const { ccclass, property } = cc._decorator;

@ccclass
export default class Sudoku extends cc.Component {

    @property(cc.Prefab)
    private SudokuLabel: cc.Node = null;
    @property
    private InputIndex: number = 0;

    private sudokuArray: Array<Array<string>> =
        [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]];

    private colArray =
        [["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""]];

    onLoad() {
        for (let i = 0; i < 81; i++) {
            let Label = cc.instantiate(this.SudokuLabel);
            Label.getComponent(cc.Label).string = this.sudokuArray[this.sudokuTakeTheQuotient(i)][this.sudokuTakeTheRemainder(i)];
            this.node.addChild(Label);
            Label.on("click", () => {
                console.log("click");

            });
        }

        // this.solveSudoku(this.sudokuArray);
        // for (let j = 0; j < this.InputIndex; j++) {
        //     this.createOfRule();
        // }
    }

    /**答案，看無 */
    solveSudoku(board: string[][]): void {
        const candidates = "123456789";
        const isLegal = (row: number, col: number): boolean => {
            const test = (strs: string[], target): boolean =>
                strs.filter((val) => val === target).length === 1;


            const target = board[row][col];

            const rowItems = board[row];
            if (!test(rowItems, target)) return false;

            const colItems = board.map((_row) => _row[col]);
            if (!test(colItems, target)) return false;

            const boxRowStart = Math.floor(row / 3) * 3;
            const boxColStart = Math.floor(col / 3) * 3;
            const boxItems = board
                .slice(boxRowStart, boxRowStart + 3)
                .map((_row) => _row.slice(boxColStart, boxColStart + 3))
                .reduce((prev, next) => [...prev, ...next], []);


            if (!test(boxItems, target)) return false;

            return true;
        };

        // 換行
        const getNextPos = (row: number, col: number): [number, number] =>
            col + 1 === 9 ? [row + 1, 0] : [row, col + 1];

        let done = false;

        const backtracking = (row: number, col: number): void => {
            // backtracing boundary
            if (row === 9) done = true; // test done

            // in-place, so we use `done` to track the task done, prune others
            if (done) return;


            // go to fill the next empty pos
            if (board[row][col] !== ".") return backtracking(...getNextPos(row, col));

            for (const cand of candidates) {
                board[row][col] = cand;
                if (isLegal(row, col)) {
                    backtracking(...getNextPos(row, col));
                    // this.node.children[cand].getComponent(cc.Label).string = cand;
                    // 答案
                    // console.log("board==" + board);
                }

                if (done) return;
                board[row][col] = ".";
            }
        };

        backtracking(0, 0);
    }

    /**規則 */
    condition(r: number, rText: number) {
        this.colStore();

        if (this.node.children[r].getComponent(cc.Label).string == "" &&
            this.sudokuArray[this.sudokuTakeTheQuotient(r)].indexOf(rText.toString()) == -1 &&
            this.colArray[this.sudokuTakeTheQuotient(r)].indexOf(rText.toString()) == -1
        ) {
            this.node.children[r].getComponent(cc.Label).string = rText.toString();

        }

        else {
            this.createOfRule();
        }
    }

    /**直行計算 */
    colStore() {
        let temp = "";
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                temp = this.sudokuArray[this.sudokuTakeTheRemainder(j)][this.sudokuTakeTheQuotient(i * 9)];
                this.colArray[i].push(temp);
            }
            // console.log("" + this.colArray[i]);

        }
    }

    /**基礎陣列 */
    createOfRule() {
        let r = this.getRandom(0, 81);
        let rText = this.getRandom(1, 9);

        this.sudokuArray[this.sudokuTakeTheQuotient(r)][this.sudokuTakeTheRemainder(r)] = rText.toString();
        this.condition(r, rText);
    }



    // isValidSudoku(board: string[][]): boolean {
    //     let state = new Set();
    //     const side = 9;

    //     for (let row = 0; row < side; row++) {
    //         for (let column = 0; column < side; column++) {
    //             const value = board[row][column];
    //             if (value === ".") continue;
    //             const rowRecord = `row ${row} value ${value}`;
    //             const columnRecord = `column ${column} value ${value}`;
    //             const boxRecord = `box ${Math.floor(row / 3)} / ${Math.floor(column / 3)} value ${value}`;

    //             // console.log("state===" + state.has(rowRecord), "===" + state.has(columnRecord), "====" + state.has(boxRecord));
    //             if (state.has(rowRecord) || state.has(columnRecord) || state.has(boxRecord)) {
    //                 console.log("faaaaaaaaaa");
    //                 return false;
    //             }
    //             // console.log("rowRecord===" + rowRecord);
    //             // console.log("columnRecord===" + columnRecord);
    //             // console.log("boxRecord===" + boxRecord);

    //             state.add(rowRecord).add(columnRecord).add(boxRecord);
    //         }
    //     }

    //     console.log("trrrrrrrrrr");

    //     return true;
    // }

    sudokuTakeTheQuotient(r: number): number {
        let temp = Math.floor(r / 9);
        return temp;
    }

    sudokuTakeTheRemainder(r: number): number {
        let temp = r % 9;
        return temp;
    }

    getRandom(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    }
}
