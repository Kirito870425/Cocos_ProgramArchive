import { propsInit } from "../Backpack/PropsInit";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Sudoku extends cc.Component {

    @property(cc.Prefab)
    private SudokuLabel: cc.Node = null;
    @property
    private InputIndex: number = 0;

    private sudokuArray: Array<Array<string>> =
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
        // 符合規則，R全部，+限制
        for (let i = 0; i < 81; i++) {
            let sudokuLabel = cc.instantiate(this.SudokuLabel);
            // sudokuLabel.name = i.toString();
            sudokuLabel.getComponent(cc.Label).string = "";
            this.node.addChild(sudokuLabel);
        }

        for (let j = 0; j < this.InputIndex; j++) {
            this.createOfRule();
        }
    }

    createOfRule() {
        let r = this.getRandom(0, 81);

        for (const iterator of this.sudokuArray[this.sudokuTakeTheQuotient(r)]) {
            console.log("iterator=" + iterator);

        }

        console.log("if ===" + this.sudokuArray[this.sudokuTakeTheQuotient(r)].indexOf(this.sudokuTakeTheQuotient(r).toString()));

        if (this.sudokuArray[this.sudokuTakeTheQuotient(r)].indexOf(this.sudokuTakeTheQuotient(r).toString()) == -1) {
            if (this.node.children[r].getComponent(cc.Label).string == "") {
                this.node.children[r].getComponent(cc.Label).string = this.getRandom(1, 9).toString();
                this.sudokuArray[this.sudokuTakeTheQuotient(r)][this.sudokuTakeTheRemainder(r)] = this.node.children[r].getComponent(cc.Label).string;

                console.log("this.sudokuArray==" + this.sudokuTakeTheQuotient(r),
                    "==sudokuTakeTheQuotient=" + this.sudokuArray[this.sudokuTakeTheQuotient(r)],
                    "string===" + this.node.children[r].getComponent(cc.Label).string);
            }
            // else {
            //     this.createOfRule();
            // }
        }
        // else {
        //     this.createOfRule();
        // }
        // else {
        //     // console.log("else===" + this.sudokuArray[this.sudokuTakeTheQuotient(r)].indexOf(this.sudokuTakeTheQuotient(r).toString()));

        // }
    }

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
