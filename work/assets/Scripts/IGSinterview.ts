
const { ccclass, property } = cc._decorator;

@ccclass
export default class IGSinterview extends cc.Component {

    protected start(): void {
        this.test4([1, 1, 2, 1, 1, 1], 1);
        // this.test4([1, 2, 2, 4, 3, 2], 2);
        // this.test5([2, 2, 3, 4, 2]);
        // this.test1([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
    }
    // 最大的連續數
    test4(arr: Array<number>, key: number) {
        let temp = 0;
        // let ansarr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == key && arr[i] == arr[i - 1] || arr[i] == arr[i + 1])
                // ansarr.push(key);
                temp++;
            else
                temp = 0;
        }

        console.log("test4=ans==" + temp);

        return temp;
    }

    // 判斷陣列內的值有無重複
    test5(arr: Array<number>) {
        let temp = 0;
        let ans = false;
        for (let i = 0; i < arr.length; i++) {
            arr[temp] = arr[i];
            if (temp == arr[i])
                ans = true;
            else
                ans = false;
        }
        // temp++; // 包在外面
        console.log("test5=ans==" + ans);

        return ans;
    }
    // 合併兩個array，從小到大排序
    test1(arr1: Array<number>, arr2: Array<number>) {
        let ansArray = [];
        let temp = 0;
        for (let index = 0; index < arr1.concat(arr2).length; index++) {
            if (ansArray[temp] <= ansArray[index])
                ansArray.push(ansArray[temp]);
            // else
            // ansArray.unshift(ansArray[temp]); 重新比對
        }
        // temp++; // 包在外面
        console.log(["ansArray===" + ansArray]);

        return ansArray;
    }
    // 計算小寫字母有幾個
    test2() {

    }
    // 判斷字母異位詞，順序不同但字母相同
    test3() {

    }
    // 二元樹的深度，找左右邊最小最大
    test6() {

    }
}
