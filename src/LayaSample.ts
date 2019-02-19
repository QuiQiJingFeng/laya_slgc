import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    private initSuccess:boolean;
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(960,640, WebGL);
 
        Laya.loader.load(["res/atlas/resource/common.atlas"], laya.utils.Handler.create(this, function(){
            AppFacade.getInstance().startUp(Laya.stage);
        }));
        
    }

 
}
new GameMain();