import { backpackBox } from "./BackpackBox";
import { playerCtrl } from "./PlayerCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackpackButton extends cc.Component {

    private backpack: cc.Node;
    private equipment: cc.Node;
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.backpack = cc.find("Backpack");
        this.equipment = cc.find("Equipment");
    }

    private isBackpack: boolean = false;
    private isEquipment: boolean = false;
    onKeyUp(event) {
        switch (String.fromCharCode(event.keyCode)) {
            case "I":
                this.isBackpack = !this.isBackpack;
                this.backpack.active = this.isBackpack;
                backpackBox.getItem();
                break;
            case "O":
                this.isEquipment = !this.isEquipment;
                this.equipment.active = this.isEquipment;
                break;


            default:
                break;
        }
    }

    OnButton(e, data) {
        switch (data) {
            case "BackpackClose":
                this.isBackpack = !this.isBackpack;
                this.backpack.active = this.isBackpack;
                break;
            case "EquipmentClose":
                this.isEquipment = !this.isEquipment;
                this.equipment.active = this.isEquipment;

            default:
                break;
        }
    }
}
