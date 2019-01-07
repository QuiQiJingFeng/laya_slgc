import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(600,400, WebGL);

        plugin.PluginManager.getInstance().pushPlugin("PLUGIN_LOGIN");
    }
}
new GameMain();