
const { ccclass, property } = cc._decorator;

@ccclass
export default class BackpackBox extends cc.Component {

    @property(cc.Prefab)
    private boxPrefab: cc.Node = null;
    onLoad() {
        for (let i = 0; i < 50; i++) {

            let box = cc.instantiate(this.boxPrefab);
            this.node.addChild(box);
        }
    }
}
