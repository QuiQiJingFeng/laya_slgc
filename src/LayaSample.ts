import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    private initSuccess:boolean;
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(960,640, WebGL);
 
        Laya.stage.bgColor = "#ABCDEF";
        game.Resolution.getInstance().setResoulution();
		plugin.PluginManager.getInstance().pushPlugin("PLUGIN_UPDATE");
    }

 
}
new GameMain();