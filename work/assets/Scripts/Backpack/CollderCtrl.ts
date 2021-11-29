import { mouseCtrl } from "./MouseCtrl";
import { propsInit } from "./PropsInit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollderCtrl extends cc.Component {

    private isHelmetLock = false;
    onCollisionEnter(other: cc.BoxCollider, self: cc.Node) {
        if (other.node.name == "Coin" && self.name == "Helmet<BoxCollider>") {
            if (this.isHelmetLock)
                return;

            this.isHelmetLock = true;
            if (!mouseCtrl.IsMouseDown)
                propsInit.node.removeAllChildren();

            let item = cc.instantiate(other.node);
            this.node.addChild(item);
            item.position = cc.v3(0, 0, 0);
            // item.getComponent(cc.Collider).enabled = false;
        }
    }

    onCollisionExit(other: cc.BoxCollider, self: cc.Node) {
        if (other.node.name == "Coin" && self.name == "Helmet<BoxCollider>") {
            if (mouseCtrl.IsMouseDown) {
                // BUG，不能放第二次
                // 待新增其他欄位
                // this.isHelmetLock = false;

                this.node.removeAllChildren();
                let item = cc.instantiate(other.node);
                propsInit.node.addChild(item);
                item.position = cc.v3(propsInit.getRandom(100, 1800), propsInit.getRandom(100, 1000));
            }
        }
    }
}
