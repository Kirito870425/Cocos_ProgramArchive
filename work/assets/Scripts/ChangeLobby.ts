
const { ccclass, property } = cc._decorator;

@ccclass
export default class ChangeLobby extends cc.Component {

    onButton(e, data) {
        cc.director.loadScene(data);
    }
}
