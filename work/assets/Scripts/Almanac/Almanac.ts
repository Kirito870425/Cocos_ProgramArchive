import { almanacCtrl } from "./AlmanacCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
class Almanac extends cc.Component {

    @property(cc.Prefab)
    private Day: cc.Prefab = null;
    @property(cc.Prefab)
    private Moon: cc.Prefab = null;
    onLoad() {
        almanac = this;
    }

    start() {
        this.almanacCreate();
    }

    public date = new Date();
    update() {
        this.node.getChildByName("Time").getComponent(cc.Label).string = new Date().toLocaleTimeString();
    }

    almanacCreate() {
        this.initCreateAlmanac();
        this.changeMonthCreate();
    }

    initCreateAlmanac() {
        this.node.getChildByName("Moon").getComponent(cc.Label).string = this.date.toLocaleDateString();
        let firstWeek = new Date(this.date.getFullYear(), almanacCtrl.NowMonth, this.date.getDate()).getDay();
        let Week = this.date.getDay();
        let nextWeek = 0;
        let layout = this.node.getChildByName("Layout");
        let getMonthSwitch = almanacCtrl.setMonthSwitch(almanacCtrl.NowMonth);
        let getMakeUpBeginningMonth = almanacCtrl.setMakeUpBeginningMonth(getMonthSwitch);
        for (let i = 0; i < 42; i++) {
            let day: cc.Node = cc.instantiate(this.Day);
            layout.addChild(day);
            day.getComponent(cc.Toggle).toggleGroup = layout.getComponent(cc.ToggleContainer);
            let children: cc.Label[] = this.node.getChildByName("Layout").getComponentsInChildren(cc.Label);
            if (i < Week) {
                children[i].node.color = cc.color(100, 100, 100);
                children[i].string = "" + Math.abs(getMonthSwitch + getMakeUpBeginningMonth + i - firstWeek);
            }
            else if (i > getMonthSwitch + almanacCtrl.getEndMonth() + firstWeek) {
                nextWeek++;
                children[i].node.color = cc.color(100, 100, 100);
                children[i].string = nextWeek.toString();
            }
            else
                children[i].string = "" + (i + 1 - firstWeek);
        }
    }

    changeMonthCreate() {
        let moonlayout = this.node.getChildByName("MoonLayout");
        for (let i = 0; i < 16; i++) {
            let moon: cc.Node = cc.instantiate(this.Moon);
            moonlayout.addChild(moon);
            let moonchildren: cc.Label[] = this.node.getChildByName("MoonLayout").getComponentsInChildren(cc.Label);
            moonchildren[i].string = (i % 12 + 1).toString() + "月";
            if (i > 11)
                moonchildren[i].node.color = cc.color(100, 100, 100);
            // 待優化，當月反藍
            this.node.getChildByName("MoonLayout").children[i].on("click", () => {
                // 待優化，月份連點BUG
                // this.node.getChildByName("MoonLayout").children[i].off("click");
                this.node.getChildByName("MoonLayout").getComponent(cc.Animation).play("BackMonth");
                this.node.getChildByName("MoonLayout").getComponent(cc.Animation).once("finished", () => {
                    almanacCtrl.NowMonth = i;
                    almanacCtrl.changeMonthUpdateDay();
                    this.node.getChildByName("Moon").getComponent(cc.Label).string =
                        new Date(almanac.date.getFullYear(), (almanacCtrl.NowMonth), almanac.date.getDate()).toLocaleDateString();

                    this.node.getChildByName("Layout").opacity = 255;
                    this.node.getChildByName("Week").opacity = 255;
                    this.node.getChildByName("Moon").getComponent(cc.Button).enabled = true;
                });
            });
        }
        moonlayout.opacity = 0;
    }
}

export let almanac = new Almanac();
