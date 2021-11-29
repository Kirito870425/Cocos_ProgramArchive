import { almanac } from "./Almanac";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AlmanacCtrl extends cc.Component {

    onLoad() {
        almanacCtrl = this;
        this.NowMonth = new Date().getMonth();
    }

    OnButton(e, data) {
        let layoutAnimation = this.node.getChildByName("Layout").getComponent(cc.Animation);
        switch (data) {
            case "MoonLayout":
                this.node.getChildByName("Week").opacity = 0;
                layoutAnimation.play("GoMonth");
                this.node.getChildByName("Moon").getComponent(cc.Button).enabled = false;
                layoutAnimation.once("finished", () => {
                    this.node.getChildByName("MoonLayout").opacity = 255;
                    this.node.getChildByName("MoonLayout").active = true;
                });
                break;
            case "Down":
                this.setMonthString(new Date(almanac.date.getFullYear(), this.setMonth(1), almanac.date.getDate()).toLocaleDateString());
                this.changeMonthUpdateDay();
                break;
            case "Up":
                this.setMonthString(new Date(almanac.date.getFullYear(), this.setMonth(-1), almanac.date.getDate()).toLocaleDateString());
                this.changeMonthUpdateDay();
                break;
            default:
                break;
        }
    }

    changeMonthUpdateDay() {
        let firstWeek = new Date(almanac.date.getFullYear(), (this.NowMonth), almanac.date.getDate()).getDay();
        let nextWeek = 0;
        let getMonthSwitch = this.setMonthSwitch(this.NowMonth);
        let getMakeUpBeginningMonth = this.setMakeUpBeginningMonth(getMonthSwitch);
        for (let i = 0; i < 42; i++) {
            let children: cc.Label[] = this.node.getChildByName("Layout").getComponentsInChildren(cc.Label);
            if (i < firstWeek) {
                children[i].node.color = cc.color(100, 100, 100);
                children[i].string = "" + Math.abs(getMonthSwitch + getMakeUpBeginningMonth + i - firstWeek);

                // 待優化，2/28、2/29先寫死
                if (this.NowMonth == 2)
                    children[0].string = "28";
            }
            else if (i > getMonthSwitch + this.getEndMonth() + firstWeek) {
                nextWeek++;
                children[i].node.color = cc.color(100, 100, 100);
                children[i].string = nextWeek.toString();
            }
            else {
                children[i].node.color = cc.color(0, 0, 0);
                children[i].string = "" + (i + 1 - firstWeek);
            }
        }
    }

    setMonthSwitch(key: number) {
        let temp;
        if (key < 0)
            key = 12

        key = key % 12;
        switch (key) {
            case 0:
                temp = 31;
                break;
            case 1:
                temp = 28;
                break;
            case 2:
                temp = 31;
                break;
            case 3:
                temp = 30;
                break;
            case 4:
                temp = 31;
                break;
            case 5:
                temp = 30;
                break;
            case 6:
                temp = 31;
                break;
            case 7:
                temp = 31;
                break;
            case 8:
                temp = 30;
                break;
            case 9:
                temp = 31;
                break;
            case 10:
                temp = 30;
                break;
            case 11:
                temp = 31;
                break;
            default:
                break;
        }

        return temp;
    }

    setMakeUpBeginningMonth(beginning) {
        let temp = 0;
        if (beginning == 30)
            temp = 2;
        else if (beginning == 31)
            temp = 0;
        else if (beginning == 28)
            temp = 4;

        return temp;
    }

    getEndMonth() {
        return -1;
    }

    public NowMonth: number;
    setMonth(index: number) {
        return this.NowMonth += index;
    }

    setMonthString(monthString: string) {
        this.node.getChildByName("Moon").getComponent(cc.Label).string = monthString;
    }
}

export let almanacCtrl = new AlmanacCtrl();
