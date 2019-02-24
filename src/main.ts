import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        let DESIGN_RESOLUTION = {
            width:1136,
            height:640,
            autoscale:"",
            screenMode:Laya.Stage.SCREEN_HORIZONTAL,
        }
        Laya.MiniAdpter.init();
        Laya.init(DESIGN_RESOLUTION.width,DESIGN_RESOLUTION.height, WebGL);
        
        Laya.stage.bgColor = "#ABCDEF"

        //如果先达到Width
        if (Laya.Browser.width / Laya.stage.width <= Laya.Browser.height / Laya.stage.height) {
            DESIGN_RESOLUTION.autoscale = "fixedwidth"
        } else {
            DESIGN_RESOLUTION.autoscale = "fixedheight"
        }

        Laya.stage.scaleMode = DESIGN_RESOLUTION.autoscale;
        Laya.stage.screenMode = DESIGN_RESOLUTION.screenMode;
        //UI适配
        resolution.ResolutionConfig.getInstance().setResoulution()
        //本地文件
        Laya.MiniAdpter.nativefiles = [
            "res/atlas/update.atlas",
            "audio/main.mp3",
        ]

        Laya.loader.load(["res/atlas/update.atlas"], laya.utils.Handler.create(this, function(){
            UIManager.getInstance().Show(view.update.UpdateView);
            if(Laya.Browser.onMiniGame){
                Laya.SoundManager.playMusic("audio/main.mp3",0);
            } 
        }));

        
    }
}
new GameMain();