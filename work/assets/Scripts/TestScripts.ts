

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

    /**LeetCode_Math_2 V再想一下*/
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

    /**LeetCode_Math_3 有BUG */
    romanToInt(s: string): number {
        // 全拆開，左比右小 相減 左比右大 相加
        // map轉換字
        let temp = s.split("", s.length);
        let nameSiteMapping = new Map();
        temp.forEach(element => {
            nameSiteMapping.set(element, Roman[element]);
        });

        let arrayTemp: Array<number> = [];
        for (let [key, value] of temp) {
            let valueTemp = nameSiteMapping.get(key[0]);
            arrayTemp.push(valueTemp);
        }

        let sumTemp: number = 0;
        let sumTemp2: Array<number> = [];
        for (let i = 1; i < arrayTemp.length; i++) {
            if (arrayTemp[i] > arrayTemp[i - 1]) {
                sumTemp += arrayTemp[i] - arrayTemp[i - 1];
                sumTemp2.push(arrayTemp[i - 1]);
                sumTemp2.push(arrayTemp[i]);
                console.log("sumTemp2==" + sumTemp2);
                // await this.sleep(1000)
            }
            else {
                console.log("" + sumTemp2.indexOf(arrayTemp[i]), "sumTemp2[i]" + arrayTemp[i]);

                // BUG
                if (sumTemp2.indexOf(arrayTemp[i]) == -1) {
                    sumTemp += arrayTemp[i];
                    // continue;0
                }
                else {
                    sumTemp += arrayTemp[i];
                    // console.log("sumTemp2222222222222=" + arrayTemp[i]);
                }
            }
        }

        sumTemp += arrayTemp[0];
        console.log("arrayTemp===" + arrayTemp, "===" + sumTemp);

        return sumTemp;
    };

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

    /**LeetCode_Math_6_Two Sum V*/
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