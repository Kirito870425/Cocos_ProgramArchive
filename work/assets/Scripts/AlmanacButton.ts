
const { ccclass, property } = cc._decorator;

@ccclass
export default class AlmanacButton extends cc.Component {

    OnButton(e, data) {
        switch (data) {
            case "MoonLayout":
                this.node.getChildByName("Layout").opacity = 0;
                this.node.getChildByName("Week").opacity = 0;
                this.node.getChildByName("MoonLayout").opacity = 255;
                this.node.getChildByName("MoonLayout").active = true;
                break;
            default:
                break;
        }
    }
}
