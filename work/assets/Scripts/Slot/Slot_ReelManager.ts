

const { ccclass, property } = cc._decorator;

@ccclass
export default class Slot_ReelManager extends cc.Component {

    @property({ type: cc.Float, displayName: "輪子數量" })
    public reelCount: number = 0;

    @property({ type: cc.Float, displayName: "符號數量" })
    public symbolCount: number = 0;
}
