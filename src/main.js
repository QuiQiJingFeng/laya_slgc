var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        //如果先达到Width
        var autoscale = "";
        if (Laya.Browser.width / Laya.stage.width <= Laya.Browser.height / Laya.stage.height) {
            autoscale = "fixedwidth";
        }
        else {
            autoscale = "fixedheight";
        }
        var DESIGN_RESOLUTION = {
            width: 1136,
            height: 640,
            autoscale: autoscale,
            screenMode: Laya.Stage.SCREEN_HORIZONTAL,
        };
        Laya.init(DESIGN_RESOLUTION.width, DESIGN_RESOLUTION.height, WebGL);
        Laya.stage.scaleMode = DESIGN_RESOLUTION.autoscale;
        Laya.stage.screenMode = DESIGN_RESOLUTION.screenMode;
        //UI适配
        game.ResolutionConfig.getInstance().setResoulution();
        UIManager.getInstance().Show(view.update.UpdateView);
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=main.js.map