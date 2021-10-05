
const { ccclass, property } = cc._decorator;

@ccclass
export default class BackpackButton extends cc.Component {

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyUp(event) {
        switch (String.fromCharCode(event.keyCode)) {
            case "I":
                this.node.active = true;
                break;
            case "O":

                break;

            default:
                break;
        }
    }

    OnButton(e, data) {
        switch (data) {
            case "BackpackClose":
                this.node.active = false;
                // this.node.getChildByName("TopBar").getChildByName("Back").getChildByName("BG").color = cc.color(255, 0, 0);
                break;

            default:
                break;
        }
    }
}
