
const { ccclass, property } = cc._decorator;

@ccclass
export default class MouseCtrl extends cc.Component {

    onLoad() {
        mouseCtrl = this;
        this.mouseCtrl();
    }

    public IsMouseDown: boolean;
    mouseCtrl() {
        // 點擊滑鼠
        this.node.on(cc.Node.EventType.MOUSE_DOWN, (event) => {
            this.IsMouseDown = true;
        });

        // 移動滑鼠
        this.node.on(cc.Node.EventType.MOUSE_MOVE, (event) => {
            if (!this.IsMouseDown)
                return;

            let delta: cc.Vec2 = event.getDelta();
            // 不好用，變成推擠
            // let canvas = cc.find("Canvas");
            // let minX = -canvas.width / 2 + this.node.width / 2;
            // let maxX = canvas.width / 2 - this.node.width / 2;
            // let minY = -canvas.height / 2 + this.node.height / 2;
            // let maxY = canvas.height / 2 - this.node.height / 2;
            // let moveX = this.node.x + delta.x;
            // let moveY = this.node.y + delta.y;
            // //控制移動範圍
            // if (moveX < minX) {
            //     moveX = minX;
            // } else if (moveX > maxX) {
            //     moveX = maxX;
            // }

            // if (moveY < minY) {
            //     moveY = minY;
            // } else if (moveY > maxY) {
            //     moveY = maxY;
            // }

            this.node.x += delta.x;
            this.node.y += delta.y;
        });

        // 放開滑鼠
        this.node.on(cc.Node.EventType.MOUSE_UP, (event) => {
            this.IsMouseDown = false;
        });
    }
}

export let mouseCtrl = new MouseCtrl()
