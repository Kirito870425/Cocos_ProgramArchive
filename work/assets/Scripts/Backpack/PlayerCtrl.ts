
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerCtrl extends cc.Component {

    onLoad() {
        playerCtrl = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    public PropsArray: Array<cc.Sprite> = [];
    onCollisionEnter(other: cc.BoxCollider, self: cc.Node) {
        if (other.node.group == "Props") {
            this.PropsArray.push(other.getComponent(cc.Sprite));
        }
    }

    onKeyUp(event) {
        let time: number = 0.1;
        let temp: number = 50;
        let w = cc.moveBy(time, 0, temp);
        let s = cc.moveBy(time, 0, -temp);
        let d = cc.moveBy(time, temp, 0);
        let a = cc.moveBy(time, -temp, 0);
        switch (String.fromCharCode(event.keyCode)) {
            case "W":
                this.node.runAction(w);
                break;
            case "S":
                this.node.runAction(s);
                break;
            case "A":
                this.node.runAction(a);
                break;
            case "D":
                this.node.runAction(d);
                break;
            default:
                break;
        }
    }
}

export let playerCtrl = new PlayerCtrl();
