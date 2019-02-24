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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var update;
    (function (update) {
        var UpdateViewUI = /** @class */ (function (_super) {
            __extends(UpdateViewUI, _super);
            function UpdateViewUI() {
                return _super.call(this) || this;
            }
            UpdateViewUI.prototype.createChildren = function () {
                View.regComponent("game.Resolution", game.Resolution);
                _super.prototype.createChildren.call(this);
                this.createView(ui.update.UpdateViewUI.uiView);
            };
            UpdateViewUI.uiView = { "type": "View", "props": { "width": 1136, "renderType": "render", "height": 640 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1136, "var": "root", "skin": "update/bg.png", "height": 640 }, "child": [{ "type": "Image", "props": { "y": 222, "x": 368, "skin": "update/logo.png" } }, { "type": "Script", "props": { "layoutBg": true, "runtime": "game.Resolution" } }] }] };
            return UpdateViewUI;
        }(View));
        update.UpdateViewUI = UpdateViewUI;
    })(update = ui.update || (ui.update = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map