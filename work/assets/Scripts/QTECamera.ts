import { QTEPlayer } from "./QTEPlayerCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    start() {
        this.schedule(() => {
            this.QTEOpen();
        }, 2)
    }

    update() {
        this.node.position = cc.v3(QTEPlayer.player.x - 540, QTEPlayer.player.y - 250);
    }

    QTEOpen() {
        let r = this.getRandom(2, 1);
        this.QTEChangText();
        if (r == 1)
            QTEPlayer.node.getComponent(cc.Animation).play("QTELeft");
        else
            QTEPlayer.node.getComponent(cc.Animation).play("QTERight");
    }

    QTEChangText() {
        let r = this.getRandom(26, 1);
        switch (r) {
            case 1:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "A";
                break;
            case 2:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "B";
                break;
            case 3:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "C";
                break;
            case 4:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "D";
                break;
            case 5:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "E";
                break;
            case 6:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "F";
                break;
            case 7:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "G";
                break;
            case 8:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "H";
                break;
            case 9:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "I";
                break;
            case 10:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "J";
                break;
            case 11:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "K";
                break;
            case 12:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "L";
                break;
            case 13:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "M";
                break;
            case 14:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "N";
                break;
            case 15:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "O";
                break;
            case 16:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "P";
                break;
            case 17:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "Q";
                break;
            case 18:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "R";
                break;
            case 19:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "S";
                break;
            case 20:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "T";
                break;
            case 21:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "U";
                break;
            case 22:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "V";
                break;
            case 23:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "W";
                break;
            case 24:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "X";
                break;
            case 25:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "Y";
                break;
            case 26:
                QTEPlayer.node.getChildByName("Text").getComponent(cc.Label).string = "Z";
                break;
            default:
                console.log("QTEChange_Error");
                break;
        }
    }

    getRandom(max: number, min: number) {
        return Math.floor(Math.random() * max) + min;
    }
}
