var game;
(function (game) {
    /*
    附加脚本对应的逻辑类
    */
    var Resolution = /** @class */ (function () {
        function Resolution() {
            /**是否拉伸背景**/
            this.layoutBg = false;
            var iphoneX = false;
            if (Laya.Browser.clientWidth / Laya.Browser.clientHeight > 2) {
                // iphone x
                iphoneX = true;
            }
            if (this.layoutX) {
                if (this.layoutX == "LEFT") {
                    this.node.x -= game.ResolutionConfig.diffWidth;
                    if (iphoneX) {
                        this.node.x += 70;
                    }
                }
                else if (this.layoutX == "RIGHT") {
                    this.node.x += game.ResolutionConfig.diffWidth;
                }
            }
            if (this.layoutY) {
                if (this.layoutY == "TOP") {
                    this.node.y -= game.ResolutionConfig.diffHight;
                }
                else if (this.layoutY == "BOTTOM") {
                    this.node.y += game.ResolutionConfig.diffHight;
                }
            }
            if (this.layoutBg) {
                var parent_1 = this.node.parent;
                var unitWidth = game.ResolutionConfig.diffWidth;
                var unitHeight = game.ResolutionConfig.diffHight;
                parent_1.x -= unitWidth;
                parent_1.y -= unitHeight;
                parent_1.width += 2 * unitWidth;
                parent_1.height += 2 * unitHeight;
                var count = parent_1.numChildren;
                for (var index = 0; index < count; index++) {
                    var child = parent_1.getChildAt(index);
                    child.x += unitWidth;
                    child.y += unitHeight;
                }
                this.node.x -= unitWidth;
                this.node.y -= unitHeight;
                this.node.width += 2 * unitWidth;
                this.node.height += 2 * unitHeight;
            }
        }
        return Resolution;
    }());
    game.Resolution = Resolution;
})(game || (game = {}));
//# sourceMappingURL=Resolution.js.map