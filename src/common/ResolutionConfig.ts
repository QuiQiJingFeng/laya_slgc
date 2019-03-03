module resolution {
    export class ResolutionConfig {
        static __instance = undefined;
        //左偏移量
        static diffWidth: number = 0;
        //右偏移量
        static diffHight: number = 0;
        //真实的宽度
        static realWidth:number = 0;
        //真实的高度
        static realHeight:number = 0;
        constructor() {
        }

        public static getInstance() {
            if (ResolutionConfig.__instance == undefined) {
                ResolutionConfig.__instance = new ResolutionConfig();
            }
            return ResolutionConfig.__instance;
        }

        public setResoulution() {
            let autoscale = Laya.stage.scaleMode;
            let ratio = 1;
            if (autoscale == "fixedwidth") {
                //适应宽度，此时舞台宽度跟浏览器宽度是等价的
                //1个坐标单位 等价于多少个物理像素
                ratio = Laya.Browser.clientWidth / Laya.stage.designWidth;
                //黑边暂用的物理像素的个数
                var blackRealHeight = Laya.Browser.clientHeight/ratio - Laya.stage.designHeight;
                // Laya.stage.y += blackRealHeight/2/unit;
                ResolutionConfig.diffHight = blackRealHeight / 2;
            }
            else if (autoscale == "fixedheight") {
                //适应宽度，此时舞台宽度跟浏览器宽度是等价的
                //1个坐标单位 等价于多少个物理像素
                ratio = Laya.Browser.clientHeight / Laya.stage.designHeight;
                //黑边暂用的物理像素的个数
                var blackRealWidth = Laya.Browser.clientWidth/ratio - Laya.stage.designWidth;
                // Laya.stage.x += blackRealWidth/2/unit;
                ResolutionConfig.diffWidth = blackRealWidth / 2;
            }    
            //坐标宽高 等于分辨率/缩放系数
            ResolutionConfig.realWidth = Laya.Browser.clientWidth / ratio;
            ResolutionConfig.realHeight = Laya.Browser.clientHeight / ratio;        
        }
    }
}