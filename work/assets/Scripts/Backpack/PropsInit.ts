
const { ccclass, property } = cc._decorator;

@ccclass
export default class PropsInit extends cc.Component {

    @property(cc.Prefab)
    private propsPrefab: cc.Node = null;
    async onLoad() {
        propsInit = this;
        await this.loadProps();
        this.createPorps();
    }

    public ItemArray: cc.Node[] = [];
    createPorps() {
        for (let i = 0; i < this.PropsArray.length; i++) {
            let props = cc.instantiate(this.propsPrefab);
            let random = this.getRandom(0, i + 1);
            props.getComponent(cc.Sprite).spriteFrame = this.PropsArray[random];
            props.position = cc.v3(this.getRandom(100, 1800), this.getRandom(100, 1000));
            props.name = props.getComponent(cc.Sprite).spriteFrame.name;
            // this.ItemArray.push(props);
            this.node.addChild(props);
        }
    }

    private PropsArray: cc.SpriteFrame[] = [];
    loadProps(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            cc.assetManager.loadBundle("Props", (err, bundle) => {
                bundle.loadDir("", cc.SpriteFrame, (err, rawAssets: any) => {
                    rawAssets.forEach(spriteFrame => {
                        if (err)
                            console.log("loadProps_Error");
                        else {
                            this.PropsArray.push(spriteFrame);
                        }
                    });
                    return resolve("loadProps_Over");
                })
            })
        })
    }

    getRandom(min: number, max: number) {
        return Math.floor(Math.random() * max) + min;
    }
}

export let propsInit = new PropsInit();
