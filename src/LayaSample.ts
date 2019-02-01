import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    private initSuccess:boolean;
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(960,640, WebGL);
        this.initSuccess = false;
        let resuorces = [
			"./res/atlas/resource/common.atlas",
		]
        Laya.stage.bgColor = "#ABCDEF";
        game.Resolution.getInstance().setResoulution();
		Laya.loader.load(resuorces,Laya.Handler.create(this, this.onLoaded),Laya.Handler.create(this, this.onLoading));
 
    }

    private onLoading(number):void{
        console.log("加载进度%d",number);
        //不能放到onLoaded中,比如在浏览器中点击了下刷新
    }

    private onLoaded():void{
        plugin.PluginManager.getInstance().pushPlugin("PLUGIN_LOGIN");
    }
}
new GameMain();