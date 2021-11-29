
const { ccclass, property } = cc._decorator;

class Animal extends cc.Component {
    name: string;
    constructor(theName: string) {
        super();
        this.name = theName;
    }

    move(meters: number) {
        console.log((this.name + " moved " + meters + "m."))
    }
}

@ccclass
export default class BaseState extends Animal {

    constructor(name: string) {
        super(name);
    }

    move() {
        super.move(5);
    }

    onLoad() {
        this.move();
    }


}

interface testState {
    status: any;
    OnFunctionEnter: any;
    UpdateFunction: any;
    OnFunctionExit: any;
    FixedUpdateFunction: any;
    LateUpdateFunction: any;
}