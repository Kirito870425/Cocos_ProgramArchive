

const { ccclass, property } = cc._decorator;

@ccclass
export default class SudokuButton extends cc.Component {

    @property(cc.Prefab)
    private playerButton: cc.Node = null;

    onLoad() {
        this.CreatePrefab(11, this.playerButton, true);
    }

    CreatePrefab(arraylength: number, prefab: cc.Node, isButton: boolean) {
        for (let i = 0; i < arraylength; i++) {
            if (this.node.name == "ButtonLayout" && i == 0)
                continue;

            let prefabTemp = cc.instantiate(prefab);
            if (isButton)
                prefabTemp.getChildByName("Label").getComponent(cc.Label).string = i.toString();
            // else
            //     prefabTemp.getComponent(cc.Label).string = i.toString();

            if (this.node.name == "ButtonLayout" && i == arraylength - 1)
                prefabTemp.getChildByName("Label").getComponent(cc.Label).string = "刪除";

            this.node.addChild(prefabTemp);
        }
    }
}
