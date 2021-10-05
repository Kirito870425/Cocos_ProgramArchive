
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    OnButton(e, data) {
        cc.director.loadScene(data);

    }
}
