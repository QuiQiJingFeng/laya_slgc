var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UIManagerInternal;
(function (UIManagerInternal) {
    var _a;
    /**
     * ui管理类，通过名字管理界面
    */
    var UIManager = /** @class */ (function () {
        function UIManager() {
            this.gameUIs = new util.OrderedMap();
        }
        UIManager.getInstance = function () {
            if (UIManager.uimanager == null) {
                UIManager.uimanager = new UIManager();
            }
            return UIManager.uimanager;
        };
        /**
         * 得到已存在的ui
         */
        UIManager.prototype.GetUI = function (TClass) {
            if (TClass.prototype.___UIManager_CLASS_ID == undefined)
                return null;
            return this.gameUIs.get(TClass.prototype.___UIManager_CLASS_ID);
        };
        /**
         * 显示指定UI，如果不存在，将被创建。
         *
         * args 仅对实现了接口IUIManagerSupport的界面有效，每次Show，会调用 ui.OnShow(args)
         */
        UIManager.prototype.Show = function (TClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (TClass.prototype.___UIManager_CLASS_ID == undefined) {
                TClass.prototype.___UIManager_CLASS_ID = UIManager.GLOBAL_UI_ID++;
            }
            if (TClass.prototype.GetUILayer == undefined) {
                TClass.prototype.GetUILayer = function () { return UIManager.LAYER_NORMAL; };
            }
            if (TClass.prototype.NeedBlackMask == undefined) {
                TClass.prototype.NeedBlackMask = function () { return false; };
            }
            if (TClass.prototype.CloseWhenClickMask == undefined) {
                TClass.prototype.CloseWhenClickMask = function () { return { close: true, destroy: true }; };
            }
            if (TClass.prototype.IsDestoryWhenDestoryAll == undefined) {
                TClass.prototype.IsDestoryWhenDestoryAll = function () { return true; };
            }
            var key = TClass.prototype.___UIManager_CLASS_ID;
            // let ctor: { new (): any } = TClass;
            var ui = this.gameUIs.get(key);
            if (ui == null) {
                ui = new TClass();
                if (!(ui instanceof Laya.View))
                    throw new Error("!(ui instanceof Laya.View):" + ui.constructor.name);
                Laya.stage.addChild(ui);
                // 自动添加蒙版
                // TODO:是否能够复用蒙版？但是得考虑到多个界面叠加显示时，蒙版得有多个。
                var internalView_1 = ui;
                if (internalView_1.NeedBlackMask()) {
                    var Mask_Name = "dlg_mask";
                    var maskUI = internalView_1.getChildByName(Mask_Name);
                    if (maskUI != null) {
                        console.log("自动创建Mask出错, UI不能有名字为dlg_mask的控件");
                    }
                    else {
                        var img = new Laya.Image("update/blackMask.png");
                        img.name = Mask_Name;
                        img.alpha = 0.7;
                        img.anchorX = 0;
                        img.anchorY = 0;
                        img.x = -ui.width;
                        img.y = -ui.height;
                        img.size(ui.width * 3, ui.height * 3);
                        img.mouseEnabled = true;
                        img.mouseThrough = false;
                        internalView_1.addChild(img);
                        internalView_1.setChildIndex(internalView_1.getChildAt(internalView_1.numChildren - 1), 0);
                        maskUI = img;
                    }
                    var config_1 = internalView_1.CloseWhenClickMask();
                    if (config_1.close) {
                        // 单击关闭这个界面
                        maskUI.on(Laya.Event.CLICK, maskUI, function () { UIManager.getInstance().Hide(TClass, config_1.destroy); });
                    }
                }
            }
            else if (!ui.visible) {
                if (!(ui instanceof Laya.View))
                    throw new Error("!(ui instanceof Laya.View):" + ui.prototype.constructor.name);
                Laya.stage.addChild(ui);
                ui.visible = true;
            }
            // show的界面在最上边
            this.gameUIs.delete(key);
            this.gameUIs.put(key, ui);
            var _loop_1 = function (layer) {
                var layer_UIs = this_1.gameUIs.values().dataArray().filter(function (n) { return n.GetUILayer() == layer; });
                if (layer_UIs.length >= 100)
                    console.error("============================================UIManager Layer OverFlow============================================");
                var startOrder = UIManager.LAYER_ORDER[layer];
                for (var i = 0; i < layer_UIs.length; i++) {
                    layer_UIs[i].zOrder = i + startOrder;
                }
            };
            var this_1 = this;
            // 根据Layer设置zOrder
            for (var layer = UIManager.LAYER_START; layer <= UIManager.LAYER_MAX; layer++) {
                _loop_1(layer);
            }
            // 若实现了内置的一些回调
            var internalView = ui;
            if ("OnShow" in internalView) {
                internalView.OnShow.apply(internalView, args);
            }
            Laya.stage.updateZOrder();
            return ui;
        };
        /**
         * 指定UI是否可见
         */
        UIManager.prototype.GetIsShowing = function (TClass) {
            var view = this.GetUI(TClass);
            return view != null && view.visible;
        };
        /**
         * 隐藏UI
         * @param destroy: 是否销毁
         */
        UIManager.prototype.Hide = function (TClass, destroy) {
            if (destroy === void 0) { destroy = false; }
            var view = this.GetUI(TClass);
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
        };
        /**
         * 彻底销毁UI，ui尽量不要销毁
         */
        UIManager.prototype.Destroy = function (TClass) {
            var key = TClass.prototype.___UIManager_CLASS_ID;
            if (key == undefined) {
                // console.error("DestroyUI UnKnownKey " + TClass.prototype.constructor.name);
                return;
            }
            var ui = this.gameUIs.get(key);
            this.gameUIs.delete(key);
            if (ui != null) {
                if (ui.OnHide != undefined) {
                    ui.OnHide();
                }
                ui.visible = false;
                ui.removeSelf();
                ui.destroy();
            }
        };
        UIManager.prototype.DestroyAll = function () {
            var temps = this.gameUIs.values().dataArray();
            var uis = new Array();
            uis.push.apply(uis, temps);
            for (var _i = 0, uis_1 = uis; _i < uis_1.length; _i++) {
                var temp = uis_1[_i];
                var ui_1 = temp;
                if (ui_1 != null) {
                    if (!ui_1.IsDestoryWhenDestoryAll())
                        continue;
                    this.Destroy(ui_1.constructor);
                }
            }
        };
        UIManager.GLOBAL_UI_ID = 0;
        UIManager.LAYER_START = 0;
        UIManager.LAYER_NORMAL = 0;
        UIManager.LAYER_OVERLAY = 1;
        UIManager.LAYER_OVERLAY_1 = 2;
        UIManager.LAYER_MAX = 2;
        UIManager.LAYER_ORDER = (_a = {},
            _a[UIManager.LAYER_NORMAL] = 0,
            _a[UIManager.LAYER_OVERLAY] = 100,
            _a[UIManager.LAYER_OVERLAY_1] = 200,
            _a);
        return UIManager;
    }());
    UIManagerInternal.UIManager = UIManager;
})(UIManagerInternal || (UIManagerInternal = {}));
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIManager;
}(UIManagerInternal.UIManager));
//# sourceMappingURL=UIManager.js.map