

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestScripts extends cc.Component {

    onLoad() {
        MainScripts = this;
    }

    start() {
        // this.fizzBuzz(16);
        // this.countPrimes(1000);
        // this.romanToInt("MCMXCIV");
        // this.SolutionExample([1, 2, 3, 4, 5]);
        // this.MinStackExample();
        // this.TwoSum([2, 7, 11, 15], 9);
        // this.MaximalRectangle([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);
        // this.strStr("aaaaa", "bba");
        // this.addTwoNumbers([2, 4, 3], [5, 6, 4]);

    }

    /**LeetCode_Math_1_V*/
    fizzBuzz(n: number): string[] {
        let temp = [];

        for (let i = 1; i < n; i++) {
            if (i % 3 != 0 && i % 5 != 0) {
                temp.push(i);
            }
            else {
                if (i % 3 == 0)
                    temp.push("Fizz");
                if (i % 5 == 0)
                    temp.push("Buzz");
                if (i % 3 == 0 && i % 5 == 0)
                    temp.push("FizzBuzz");
            }
        }

        return temp;
    }

    /**LeetCode_Math_2_O_再想一下*/
    countPrimes(n: number): number {
        let isPrime = [];
        let temp = [];
        for (let i = 2; i < n; i++) {
            isPrime[i] = true;
        }

        for (let i = 2; i * i < n; i++) {
            if (!isPrime[i])
                continue;
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }

        let count = 0;
        for (let i = 2; i < n; i++) {
            if (isPrime[i]) {
                temp.push(i);
                count++;
            }
        }
        console.log(count + "==" + temp);

        return count;
    }

    /**LeetCode_Math_3_O_想太複雜 */
    romanToInt(s: string): number {
        // 全拆開，左比右小 相減 左比右大 相加
        // map轉換字

        let r = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
        let result = 0;
        let sarr = s.split("");
        for (let i = 0; i < sarr.length; i++) {
            if (r[sarr[i]] < r[sarr[i + 1]]) {
                result -= r[sarr[i]];
            } else {
                result += r[sarr[i]];
            }
        }

        return result;
        // let temp = s.split("", s.length);
        // let nameSiteMapping = new Map();
        // temp.forEach(element => {
        //     nameSiteMapping.set(element, Roman[element]);
        // });

        // let arrayTemp: Array<number> = [];
        // for (let [key, value] of temp) {
        //     let valueTemp = nameSiteMapping.get(key[0]);
        //     arrayTemp.push(valueTemp);
        // }

        // let sumTemp: number = 0;
        // let sumTemp2: Array<number> = [];
        // for (let i = 1; i < arrayTemp.length; i++) {
        //     if (arrayTemp[i] > arrayTemp[i - 1]) {
        //         sumTemp += arrayTemp[i] - arrayTemp[i - 1];
        //         sumTemp2.push(arrayTemp[i - 1]);
        //         sumTemp2.push(arrayTemp[i]);
        //         console.log("sumTemp2==" + sumTemp2);
        //         // await this.sleep(1000)
        //     }
        //     else {
        //         console.log("" + sumTemp2.indexOf(arrayTemp[i]), "sumTemp2[i]" + arrayTemp[i]);

        //         // BUG
        //         if (sumTemp2.indexOf(arrayTemp[i]) == -1) {
        //             sumTemp += arrayTemp[i];
        //             // continue;0
        //         }
        //         else {
        //             sumTemp += arrayTemp[i];
        //             // console.log("sumTemp2222222222222=" + arrayTemp[i]);
        //         }
        //     }
        // }

        // sumTemp += arrayTemp[0];
        // console.log("arrayTemp===" + arrayTemp, "===" + sumTemp);

        // return sumTemp;
    }

    /**LeetCode_Math_4_V*/
    SolutionExample(nums: number[]) {
        let solutionObj = new Solution(nums);
        solutionObj.shuffle();
        solutionObj.reset();
    }

    /**LeetCode_Math_5_Stack_V*/
    MinStackExample() {
        let minStackObj = new MinStack();
        minStackObj.push(-2);
        minStackObj.push(0);
        minStackObj.push(-3);
        minStackObj.getMin();
        minStackObj.pop();
        minStackObj.top();
        minStackObj.getMin();
    }

    /**LeetCode_Math_6_Two Sum_V*/
    TwoSum(nums: Array<number>, target: number) {
        let temp = 0;
        let arr = [];
        for (let i = 0; i < nums.length; i++) {
            temp += nums[i];
            if (temp == target) {
                arr.push(i);
            }
        }

        return console.log("arr===" + arr);
    }

    /**LeetCode_Math_7_Head 進階寫法 再看一下*/
    MaximalRectangle(matrix: string[][]): number {
        // 用B判斷，填入直行累加，加總比大小
        const M = matrix.length;
        const N = matrix[0].length;

        if (M === 0) return 0;
        if (N === 0) return 0;

        const dp: number[][] = matrix.map(row => row.map(item => Number(item)));

        for (let j = 0; j < N; j++) {
            for (let i = 1; i < M; i++) {
                if (matrix[i][j] === '0') continue;
                if (matrix[i - 1][j] === '0') continue;

                dp[i][j] = dp[i - 1][j] + 1;
            }

        }

        // const getMaxArea = (row: number[]): number => {
        //     let area: number = 0;
        //     for (let i = 0; i < row.length; i++) {
        //         const pivot = row[i];
        //         for (let j = i; j < row.length; j++) {
        //             if (row[j] === 0) break;
        //             const minHeight = Math.min(...row.slice(i, j + 1))
        //             area = Math.max(area, minHeight * (j - i + 1))
        //         }
        //     }
        //     return area;
        // }

        // console.log("===" + Math.max(...dp.map(getMaxArea)));
        // return Math.max(...dp.map(getMaxArea));

        const getMaxArea = (row: number[]): number => {
            const leftBound = Array.from({ length: row.length }, (_, idx) => idx - 1);
            const rightBound = Array.from({ length: row.length }, (_, idx) => idx + 1);

            for (let i = 0; i < row.length; i++) {
                let p = i - 1;
                while (p >= 0 && row[p] >= row[i]) p = leftBound[p];
                leftBound[i] = p;

            }
            for (let i = row.length - 1; i >= 0; i--) {
                let p = i + 1;
                while (p < row.length && row[p] >= row[i]) p = rightBound[p];
                rightBound[i] = p;
            }

            return Math.max(...row.map((val, idx) => val * (rightBound[idx] - leftBound[idx] - 1)));//1,3,6,4
        }

        // console.log("===" + Math.max(...dp.map(getMaxArea)));
        return Math.max(...dp.map(getMaxArea));
    }

    /** charAt&substring使用 */
    strStr(haystack: string, needle: string) {
        if (haystack.length == 0 || needle.length == 0) {
            // console.log("===" + 0);
            return 0;
        }

        for (let i = 0; i < haystack.length; i++) {
            if (haystack.charAt(i) === needle.charAt(0)) {
                if (haystack.substring(i, i + needle.length) === needle) {
                    // console.log("===" + i);
                    return i;
                }
            }
            // console.log("===" + -1);
            return -1;
        }
    }


    addTwoNumbers(l1: Array<number> | null, l2: Array<number> | null): Array<number> | null {


        return;
    };




    protected async sleep(time: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            setTimeout(res, time);
        });
    }

    getRandom(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    }
}

export let MainScripts = new TestScripts();

/**LeetCode_Math_4*/
class Solution {
    private temp = [];
    private resetArray = [];
    constructor(nums: number[]) {
        this.resetArray = nums;
        this.temp = nums;
    }

    reset(): number[] {
        this.temp = this.resetArray;
        // console.log("=reset==" + this.temp);
        return this.temp;
    }

    shuffle(): number[] {
        let test = [];
        while (test.length != this.temp.length) {
            let r = MainScripts.getRandom(1, this.temp.length);
            if (test.indexOf(r) == -1)
                test.push(r);
        }

        this.temp = test;
        // console.log("=shuffle==" + this.temp);
        return this.temp;
    }
}

/**LeetCode_Math_5_Stack*/
class MinStack {
    private arr = [];
    constructor() {

    }

    push(val: number): void {
        this.arr.push(val);
    }

    pop(): void {
        this.arr.pop();
    }

    top(): number {
        return this.arr[this.arr.length - 1];
    }

    getMin(): number {
        let temp = this.arr[0];
        for (let i = 0; i < this.arr.length; i++) {
            if (temp > this.arr[i]) {
                temp = this.arr[i];
            }
        }

        return temp;
    }
}


enum Roman {
    I = 1,
    V = 5,
    X = 10,
    L = 50,
    C = 100,
    D = 500,
    M = 1000,
}