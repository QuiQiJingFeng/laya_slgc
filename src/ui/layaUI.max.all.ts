
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class GameMainViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameMainViewUI.uiView);

        }

    }
}

module ui.update {
    export class UpdateViewUI extends View {
		public progressLoad:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":640,"renderType":"render","height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"update/bg.png","sizeGrid":"1,1,1,1","height":1136},"child":[{"type":"Script","props":{"layoutWidth":true,"layoutHeight":true,"runtime":"resolution.Resolution"}}]},{"type":"Box","props":{"y":0,"x":0,"width":640,"height":1136},"child":[{"type":"Script","props":{"y":0,"x":0,"center":true,"runtime":"resolution.Resolution"}},{"type":"Image","props":{"y":474,"x":134,"skin":"update/logo.png"}},{"type":"ProgressBar","props":{"y":1076,"x":32,"width":598,"var":"progressLoad","skin":"update/progress.png","height":25}},{"type":"Button","props":{"y":0,"x":0,"width":100,"stateNum":1,"skin":"update/blackMask.png","label":"label","height":100},"child":[{"type":"Script","props":{"layoutY":"TOP","layoutX":"LEFT","runtime":"resolution.Resolution"}}]},{"type":"Button","props":{"y":1038,"x":544,"width":100,"stateNum":1,"skin":"update/blackMask.png","label":"label","height":100},"child":[{"type":"Script","props":{"layoutY":"BOTTOM","layoutX":"RIGHT","runtime":"resolution.Resolution"}}]},{"type":"Button","props":{"y":1042,"x":0,"width":100,"stateNum":1,"skin":"update/blackMask.png","label":"label","height":100},"child":[{"type":"Script","props":{"layoutY":"BOTTOM","layoutX":"LEFT","runtime":"resolution.Resolution"}}]},{"type":"Button","props":{"y":-5,"x":549,"width":100,"stateNum":1,"skin":"update/blackMask.png","label":"label","height":100},"child":[{"type":"Script","props":{"layoutY":"TOP","layoutX":"RIGHT","runtime":"resolution.Resolution"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("resolution.Resolution",resolution.Resolution);

            super.createChildren();
            this.createView(ui.update.UpdateViewUI.uiView);

        }

    }
}
