
/**实现此接口来支持UIManager回调 */
interface IUIManagerSupport {
    OnShow?(...args: any[]): void;
    OnHide?(): void;
    /**UI层级，可选 */
    GetUILayer?(): number;

    /**销毁全部界面时,是否销毁自己 */
    IsDestoryWhenDestoryAll?(): boolean;
    /**是否需要黑色遮罩，盖掉后面的UI */
    NeedBlackMask?(): boolean;

    /**如果有遮罩，单击时是否关闭界面 */
    CloseWhenClickMask?(): {
        /**单击时，关闭界面么？ */
        close: boolean,
        /**如果关闭，true为销毁界面，false为隐藏界面 */
        destroy: boolean
    };
}

module UIManagerInternal {

    import View = Laya.View;

    interface IUIView extends laya.ui.View, IUIManagerSupport {
    }

    /**
     * ui管理类，通过名字管理界面
    */
    export class UIManager {
        private static uimanager: UIManager;
        private gameUIs: util.OrderedMap<number, View>;
        private static GLOBAL_UI_ID = 0;

        public static LAYER_START = 0;
        public static LAYER_NORMAL = 0;
        public static LAYER_OVERLAY = 1;
        public static LAYER_OVERLAY_1 = 2;
        public static LAYER_MAX = 2;

        public static LAYER_ORDER = {
            [UIManager.LAYER_NORMAL]: 0,
            [UIManager.LAYER_OVERLAY]: 100,
            [UIManager.LAYER_OVERLAY_1]: 200,
        }

        constructor() {
            this.gameUIs = new util.OrderedMap<number, View>();
        }

        public static getInstance(): UIManager {
            if (UIManager.uimanager == null) {
                UIManager.uimanager = new UIManager();
            }
            return UIManager.uimanager;
        }

        /**
         * 得到已存在的ui
         */
        public GetUI<TClass extends View>(TClass: { new (): TClass }): TClass {
            if (TClass.prototype.___UIManager_CLASS_ID == undefined)
                return null;

            return this.gameUIs.get(TClass.prototype.___UIManager_CLASS_ID) as TClass;
        }

        public RecurateBox(node: Laya.Sprite): void {
            for (let i = 0; i < node.numChildren; i++) {
                let child = node.getChildAt(i);
                if (child instanceof laya.ui.Box) {
                    child.mouseEnabled = true;
                    child.mouseThrough = true;

                    // console.log(`set box: name=${child.name}`);
                    this.RecurateBox(child);
                }
            }
        }
        /**
         * 显示指定UI，如果不存在，将被创建。
         *
         * args 仅对实现了接口IUIManagerSupport的界面有效，每次Show，会调用 ui.OnShow(args)
         */
        public Show(TClass: any, ...args: any[]): any {
            if (TClass.prototype.___UIManager_CLASS_ID == undefined) {
                TClass.prototype.___UIManager_CLASS_ID = UIManager.GLOBAL_UI_ID++;
            }

            if (TClass.prototype.GetUILayer == undefined) {
                TClass.prototype.GetUILayer = () => { return UIManager.LAYER_NORMAL; }
            }

            if (TClass.prototype.NeedBlackMask == undefined) {
                TClass.prototype.NeedBlackMask = () => { return false; }
            }

            if (TClass.prototype.CloseWhenClickMask == undefined) {
                TClass.prototype.CloseWhenClickMask = () => { return { close: true, destroy: true }; }
            }

            if (TClass.prototype.IsDestoryWhenDestoryAll == undefined) {
                TClass.prototype.IsDestoryWhenDestoryAll = () => { return true; }
            }

            let key = TClass.prototype.___UIManager_CLASS_ID;
            // let ctor: { new (): any } = TClass;
            let ui = this.gameUIs.get(key);

            if (ui == null) {
                ui = new TClass();
                if (!(ui instanceof Laya.View))
                    throw new Error("!(ui instanceof Laya.View):" + (<any>ui).constructor.name);

                Laya.stage.addChild(ui);
                this.RecurateBox(ui);

                // 自动添加蒙版
                // TODO:是否能够复用蒙版？但是得考虑到多个界面叠加显示时，蒙版得有多个。
                let internalView: IUIView = ui as IUIView;
                if (internalView.NeedBlackMask()) {
                    const Mask_Name: string = "dlg_mask";
                    let maskUI = internalView.getChildByName(Mask_Name);
                    if (maskUI != null) {
                        console.log("自动创建Mask出错, UI不能有名字为dlg_mask的控件")
                    } else {
                        let img = new Laya.Image("update/blackMask.png");
                        img.name = Mask_Name;
                        img.alpha = 0.7;
                        img.anchorX = 0;
                        img.anchorY = 0;
                        img.x = -ui.width;
                        img.y = -ui.height;
                        img.size(ui.width * 3, ui.height * 3);
                        img.mouseEnabled = true;
                        img.mouseThrough = false

                        internalView.addChild(img);
                        internalView.setChildIndex(internalView.getChildAt(internalView.numChildren - 1), 0);

                        maskUI = img;
                    }

                    let config = internalView.CloseWhenClickMask();
                    if (config.close) {
                        // 单击关闭这个界面
                        maskUI.on(Laya.Event.CLICK, maskUI, () => { UIManager.getInstance().Hide(TClass, config.destroy); })
                    }
                }
            }
            else if (!ui.visible) {
                if (!(ui instanceof Laya.View))
                    throw new Error("!(ui instanceof Laya.View):" + (<any>ui).prototype.constructor.name);

                Laya.stage.addChild(ui);
                ui.visible = true;
            }

            // show的界面在最上边
            this.gameUIs.delete(key);
            this.gameUIs.put(key, ui);

            // 根据Layer设置zOrder
            for (let layer = UIManager.LAYER_START; layer <= UIManager.LAYER_MAX; layer++) {
                let layer_UIs = this.gameUIs.values().dataArray().filter(n => (n as IUIView).GetUILayer() == layer);

                if (layer_UIs.length >= 100)
                    console.error("============================================UIManager Layer OverFlow============================================");

                let startOrder = UIManager.LAYER_ORDER[layer];
                for (let i = 0; i < layer_UIs.length; i++) {
                    layer_UIs[i].zOrder = i + startOrder;
                }
            }


            // 若实现了内置的一些回调
            let internalView: IUIView = ui as IUIView;
            if ("OnShow" in internalView) {
                internalView.OnShow(...args);
            }

            Laya.stage.updateZOrder();

            return ui;
        }

        /**
         * 指定UI是否可见
         */
        public GetIsShowing(TClass: any): boolean {
            let view = this.GetUI(TClass);
            return view != null && view.visible;
        }

        /**
         * 隐藏UI
         * @param destroy: 是否销毁
         */
        public Hide(TClass: any, destroy: boolean = false) {
            let view = this.GetUI(TClass) as IUIView;
            if (view == null) {
                console.error("HideUI Failed: " + TClass.prototype.constructor.name);
                return;
            }
            else {
                if (destroy)
                    this.Destroy(TClass);
                else {
                    if (view.OnHide != undefined) {
                        view.OnHide();
                    }
                    view.visible = false;
                    view.removeSelf();
                }
            }
        }

        /**
         * 彻底销毁UI，ui尽量不要销毁
         */
        public Destroy(TClass: any) {
            let key = TClass.prototype.___UIManager_CLASS_ID;
            if (key == undefined) {
                // console.error("DestroyUI UnKnownKey " + TClass.prototype.constructor.name);
                return;
            }

            let ui = this.gameUIs.get(key) as IUIView;
            this.gameUIs.delete(key);

            if (ui != null) {
                if (ui.OnHide != undefined) {
                    ui.OnHide();
                }
                ui.visible = false;
                ui.removeSelf();
                ui.destroy();
            }
        }

        public DestroyAll() {
            let temps = this.gameUIs.values().dataArray();
            let uis = new Array<View>();
            uis.push(...temps);

            for (let temp of uis) {
                let ui = temp as IUIView;
                if (ui != null) {
                    if (!ui.IsDestoryWhenDestoryAll())
                        continue;

                    this.Destroy((<any>ui).constructor);
                }
            }
        }
    }
}

class UIManager extends UIManagerInternal.UIManager { }