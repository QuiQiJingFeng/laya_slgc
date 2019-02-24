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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var update;
    (function (update) {
        var UpdateView = /** @class */ (function (_super) {
            __extends(UpdateView, _super);
            function UpdateView() {
                return _super.call(this) || this;
            }
            UpdateView.prototype.OnShow = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
            return UpdateView;
        }(ui.update.UpdateViewUI));
        update.UpdateView = UpdateView;
    })(update = view.update || (view.update = {}));
})(view || (view = {}));
//# sourceMappingURL=UpdateView.js.map