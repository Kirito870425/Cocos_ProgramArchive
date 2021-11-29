
const { ccclass, property } = cc._decorator;

@ccclass
export default class QTEPlayerCtrl extends cc.Component {

    @property(cc.Node)
    public player: cc.Node = null;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    }
    start() {
        QTEPlayer = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.generateSteps();
    }

    @property(cc.Prefab)
    private steps: cc.Prefab = null;
    private index = 0;
    generateSteps() {
        for (let i = 0; i < 5; i++) {
            cc.find("BG").addChild(cc.instantiate(this.steps));
        }
    }

    onKeyDown(event) {
        if (cc.find("Win").active)
            return;

        let PlayerText = this.node.getChildByName("Text").getComponent(cc.Label).string;
        let valueString = String.fromCharCode(event.keyCode); // 65A 90Z 97a 122z

        if (PlayerText === valueString) {
            this.index++;
            this.node.getComponent(cc.Animation).play("Jump");
            this.checkingWin();
        }
        // else {
        // for (let i = 0; i < this.index; i++) {

        //     cc.find("BG").getComponentInChildren(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
        // }
        // }
    }

    checkingWin() {
        let text = cc.find("Text");
        if (this.index >= 5) {
            text.active = true;
            text.getComponent(cc.Label).string = this.index - 4 + "/3"
            if (this.index - 4 == 3) {
                cc.find("Win").active = true;
            }
        }
    }

    protected async sleep(time: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            setTimeout(res, time);
        });
    }
}

export let QTEPlayer = new QTEPlayerCtrl();
