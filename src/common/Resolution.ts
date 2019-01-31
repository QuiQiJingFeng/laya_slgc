module plugin {
    export class Resolution {
        static __instance = undefined;
        //左偏移量
        static diffWidth: number = 0;
        //右偏移量
        static diffHight: number = 0;
        constructor() {
        }

        public static getInstance() {
            if (Resolution.__instance == undefined) {
                Resolution.__instance = new Resolution();
            }
            return Resolution.__instance;
        }

        public setResoulution() {
            Laya.stage.screenMode = "horizontal";
            let autoscale = "fixedwidth"
            //如果先达到Width
            if (Laya.Browser.width / Laya.stage.width <= Laya.Browser.height / Laya.stage.height) {
                autoscale = "fixedwidth"
            } else {
                autoscale = "fixedheight"
            }

            Laya.stage.scaleMode = autoscale;
            if (autoscale == "fixedwidth") {
                //适应宽度，此时舞台宽度跟浏览器宽度是等价的
                //1个坐标单位 等价于多少个物理像素
                var unit = Laya.Browser.clientWidth / Laya.stage.designWidth;
                //舞台实际暂用的物理像素个数
                var realHeight = Laya.stage.designHeight * unit;
                //黑边暂用的物理像素的个数
                var blackRealHeight = Laya.Browser.clientHeight - realHeight;
                // Laya.stage.y += blackRealHeight/2/unit;
                Resolution.diffHight = blackRealHeight / 2 / unit;
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
                Resolution.diffWidth = blackRealWidth / 2 / unit;
            }
        }

        public recurate(node: Laya.Component){
            let count = node.numChildren;
            for (var index = 0; index < count; index++) {
                let child = node.getChildAt(index) as Laya.Component;
                if(child.name == "TOP_LEFT"){
                    child.x -= Resolution.diffWidth;
                    child.y -= Resolution.diffHight;
                }else if(child.name == "TOP_RIGHT"){
                    child.x += Resolution.diffWidth;
                    child.y -= Resolution.diffHight;
                }else if(child.name == "BOTTOM_LEFT"){
                    child.x -= Resolution.diffWidth;
                    child.y += Resolution.diffHight;
                }else if(child.name == "BOTTOM_RIGHT"){
                    child.x += Resolution.diffWidth;
                    child.y += Resolution.diffHight;
                }
                child.mouseEnabled = true;
                child.mouseThrough = true;
                this.recurate(child);
                
            }

        }

        public setResolutionNode(node: Laya.Component) {
            let self = this;
            node.x += Resolution.diffWidth;
            node.y += Resolution.diffHight
            let bg = <Laya.Image>node.getChildByName("BACK_GROUND")
            if(bg){
                bg.x -= Resolution.diffWidth;
                bg.y -= Resolution.diffHight;
                bg.width += 2* Resolution.diffWidth;
                bg.height += 2* Resolution.diffHight;
            }

            this.recurate(node);
            Laya.stage.addChild(node);
        }
    }
}