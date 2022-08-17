import Slot_ReelManager from "./Slot_ReelManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Slot_Reel extends cc.Component {

    @property(Slot_ReelManager)
    private reelManager: Slot_ReelManager = null;

    @property({ type: cc.Node, displayName: "輪子預置物" })
    private reelPrefab: cc.Node = null;

    @property(cc.Node)
    private symbolParent: cc.Node = null;

    @property({ type: cc.Node, displayName: "符號預置物" })
    private symbolPrefab: cc.Node = null;


    protected onLoad(): void {

    }

    protected start(): void {
        // 初始化、取得資料、創建 reel & symbol
        this.createSymbol();
    }

    private createSymbol(): void {
        for (let i = 0; i < this.reelManager.symbolCount; i++) {
            let symbol = cc.instantiate(this.symbolPrefab);
            symbol.y += 200;
            symbol.children[0].getComponentInChildren(cc.Label).string = i.toString();
            symbol.setParent(this.symbolParent);
        }

    }
}
