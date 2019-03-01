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
        public layoutWidth: boolean;
        public layoutHeight: boolean;
        /*是否居中 */
        public center:boolean;
        /**定义一个变量来接收Box组件实例**/
        private node: Laya.Sprite;
        constructor() {

        }

        public set owner(value: any) {
            this.node = value;
            let self = this;
            setTimeout(function() {
                self.onLoaded()
            }, 0);
        }


        private onLoaded(): void {
            let iphoneX = false;
            let diffX = 0;
            let diffY = 0;
            if (Laya.Browser.clientWidth / Laya.Browser.clientHeight > 2) {
                // iphone x
                diffX = 70;
            }else if(Laya.Browser.clientHeight / Laya.Browser.clientWidth > 2){
            	diffY = 70;
            }
            if (this.layoutX) {
                if (this.layoutX == "LEFT") {
                    this.node.x -= ResolutionConfig.diffWidth;
                    this.node.x += diffX;
                } else if (this.layoutX == "RIGHT") {
                    this.node.x += ResolutionConfig.diffWidth;
                }
            }
            if (this.layoutY) {
                if (this.layoutY == "TOP") {
                    this.node.y -= ResolutionConfig.diffHight;
                    this.node.y += diffY;
                } else if (this.layoutY == "BOTTOM") {
                    this.node.y += ResolutionConfig.diffHight;
                }
            }
            let unitWidth = ResolutionConfig.diffWidth;
            let unitHeight = ResolutionConfig.diffHight;

            if (this.layoutWidth) {
                this.node.width += 2 * unitWidth;
            }
            if (this.layoutHeight) {
                this.node.height += 2 * unitHeight;
            }

            if(this.center){
                this.node.x += unitWidth;
                this.node.y += unitHeight;
            }
        }
    }
}