
const { ccclass, property } = cc._decorator;

@ccclass
class Almanac extends cc.Component {

    @property(cc.Prefab)
    private Day: cc.Prefab = null;
    @property(cc.Prefab)
    private Moon: cc.Prefab = null;
    onLoad() {
        this.almanacCtrl();

    }

    private date = new Date();
    update() {
        let time = new Date();
        this.node.getChildByName("Moon").getChildByName("Text").getComponent(cc.Label).string = time.toLocaleDateString();
        this.node.getChildByName("Time").getComponent(cc.Label).string = time.toLocaleTimeString();
    }

    almanacCtrl() {
        let firstWeek = new Date(2021, this.date.getMonth(), 1).getDay();
        let Week = this.date.getDay();
        let nextWeek = 0;
        let layout = this.node.getChildByName("Layout");

        // this.node.on("scrolling", () => {

        // });
        for (let i = 0; i < 42; i++) {
            let day: cc.Node = cc.instantiate(this.Day);
            layout.addChild(day);
            day.getComponent(cc.Toggle).toggleGroup = layout.getComponent(cc.ToggleContainer);
            let children: cc.Label[] = this.node.getChildByName("Layout").getComponentsInChildren(cc.Label);
            if (i < Week || i > 30 + Week) {
                children[i].node.color = cc.color(100, 100, 100);
                children[i].string = "" + Math.abs(31 + i - firstWeek);
                if (i > 30 + Week) {
                    nextWeek++;
                    children[i].string = nextWeek.toString();
                }
            }
            else
                children[i].string = "" + (i + 1 - Week);
        }

        let moonlayout = this.node.getChildByName("MoonLayout");
        for (let i = 0; i < 16; i++) {
            let moon: cc.Node = cc.instantiate(this.Moon);
            moonlayout.addChild(moon);
            let moonchildren: cc.Label[] = this.node.getChildByName("MoonLayout").getComponentsInChildren(cc.Label);
            moonchildren[i].string = (i % 12 + 1).toString() + "月";
            if (i > 11)
                moonchildren[i].node.color = cc.color(100, 100, 100);
            // 當月反藍


            this.node.getChildByName("MoonLayout").children[i].on("click", () => {
                moonlayout.opacity = 0;
                layout.opacity = 255;
                this.node.getChildByName("Week").opacity = 255;
                moonlayout.active = false;
            });
        }
        moonlayout.opacity = 0;
    }
}
