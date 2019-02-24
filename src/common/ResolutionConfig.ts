module resolution {
    export class ResolutionConfig {
        static __instance = undefined;
        //左偏移量
        static diffWidth: number = 0;
        //右偏移量
        static diffHight: number = 0;
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
            if (autoscale == "fixedwidth") {
                //适应宽度，此时舞台宽度跟浏览器宽度是等价的
                //1个坐标单位 等价于多少个物理像素
                var unit = Laya.Browser.clientWidth / Laya.stage.designWidth;
                //舞台实际暂用的物理像素个数
                var realHeight = Laya.stage.designHeight * unit;
                //黑边暂用的物理像素的个数
                var blackRealHeight = Laya.Browser.clientHeight - realHeight;
                // Laya.stage.y += blackRealHeight/2/unit;
                ResolutionConfig.diffHight = blackRealHeight / 2 / unit;
            }
            else if (autoscale == "fixedheight") {
                //适应宽度，此时舞台宽度跟浏览器宽度是等价的
                //1个坐标单位 等价于多少个物理像素
                var unit = Laya.Browser.clientHeight / Laya.stage.designHeight;
                //舞台实际暂用的物理像素个数
                var realWidth = Laya.stage.designWidth * unit;
                //黑边暂用的物理像素的个数
                var blackRealWidth = Laya.Browser.clientWidth - realWidth;
                // Laya.stage.x += blackRealWidth/2/unit;
                ResolutionConfig.diffWidth = blackRealWidth / 2 / unit;
            }            
        }
    }
}