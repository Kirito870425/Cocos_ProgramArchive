import { playerCtrl } from "./PlayerCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackpackInit extends cc.Component {

    @property(cc.Prefab)
    private boxPrefab: cc.Node = null;
    onLoad() {
        backpackInit = this;
        for (let i = 0; i < 50; i++) {
            let box = cc.instantiate(this.boxPrefab);
            this.node.addChild(box);
            this.getItem();
        }
    }

    getItem() {
        for (let i = 0; i < playerCtrl.PropsArray.length; i++) {
            this.node.children[i].getChildByName("Item").getComponent(cc.Sprite).spriteFrame = playerCtrl.PropsArray[i].spriteFrame;
        }
    }
}

export let backpackInit = new BackpackInit();
