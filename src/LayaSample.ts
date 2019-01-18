import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(960,640, WebGL);
        this.setResoulution();
        let resuorces = [
			"./res/atlas/activity.atlas",
			"./res/atlas/common.atlas",
			"./res/atlas/comp.atlas",
		]
		resuorces.forEach(resource => {
            Laya.loader.load(resource,Laya.Handler.create(this, this.onLoaded),Laya.Handler.create(this, this.onLoading));
        });
    }

    private onLoading(number):void{
        console.log("加载进度%d",number);
    }

    private setResoulution():void{
        Laya.stage.screenMode = "horizontal";
        let autoscale = "fixedwidth"
        //如果先达到Width
        if(Laya.Browser.width/Laya.stage.width <= Laya.Browser.height/Laya.stage.height){
            autoscale = "fixedwidth"
        }else{
            autoscale = "fixedheight"
        }

        Laya.stage.scaleMode = autoscale;   
        if (autoscale == "fixedwidth") {
            //适应宽度，此时舞台宽度跟浏览器宽度是等价的
            //1个坐标单位 等价于多少个物理像素
            var unit = Laya.Browser.clientWidth / Laya.stage.desginWidth;
            //舞台实际暂用的物理像素个数
            var realHeight = Laya.stage.desginHeight * unit;
            //黑边暂用的物理像素的个数
            var blackRealHeight = Laya.Browser.clientHeight - realHeight;
            Laya.stage.y += blackRealHeight/2/unit;
        }
        else if (autoscale == "fixedheight") {
            //适应宽度，此时舞台宽度跟浏览器宽度是等价的
            //1个坐标单位 等价于多少个物理像素
            var unit = Laya.Browser.clientHeight / Laya.stage.desginHeight;
            //舞台实际暂用的物理像素个数
            var realWidth = Laya.stage.desginWidth * unit;
            //黑边暂用的物理像素的个数
            var blackRealWidth = Laya.Browser.clientWidth - realWidth;
            Laya.stage.x += blackRealWidth/2/unit;
        }
    }
    private onLoaded():void{
        
        plugin.PluginManager.getInstance().pushPlugin("PLUGIN_LOGIN");
    }
}
new GameMain();