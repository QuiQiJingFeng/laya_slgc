module resolution {
    /*
    附加脚本对应的逻辑类
    */
    export class Resolution {
        /**X方向适配**/
        public layoutX: string;
        /**Y方向适配**/
        public layoutY: string;
        /**是否拉伸背景**/
        public layoutWidth: boolean = false;
        public layoutHeight: boolean = false;
        /**定义一个变量来接收Box组件实例**/
        private node: Laya.Sprite;
        constructor() {
            let iphoneX = false;
            if (Laya.Browser.clientWidth / Laya.Browser.clientHeight > 2) {
                // iphone x
                iphoneX = true;
            }
            if (this.layoutX) {
                if (this.layoutX == "LEFT") {
                    this.node.x -= ResolutionConfig.diffWidth;
                    if (iphoneX) {
                        this.node.x += 70;
                    }

                } else if (this.layoutX == "RIGHT") {
                    this.node.x += ResolutionConfig.diffWidth;
                }
            }
            if (this.layoutY) {
                if (this.layoutY == "TOP") {
                    this.node.y -= ResolutionConfig.diffHight;
                } else if (this.layoutY == "BOTTOM") {
                    this.node.y += ResolutionConfig.diffHight;
                }
            }
            let unitWidth = ResolutionConfig.diffWidth;
            let unitHeight = ResolutionConfig.diffHight;
            if (this.layoutWidth) {
                this.node.width += 2 * unitWidth;
            }
            if(this.layoutHeight){
                this.node.height += 2 * unitHeight;
            }
        }
    }
}