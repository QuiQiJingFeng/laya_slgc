
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gameStart {
    export class GameStartViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":1136,"height":640},"child":[{"type":"Image","props":{"y":259,"x":520,"skin":"texture/cbtnAwards1.png"}},{"type":"Image","props":{"y":400,"x":469,"skin":"texture/cbtnBack1.png"}},{"type":"Image","props":{"y":374,"x":597,"skin":"texture/cbtnCredits1.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameStart.GameStartViewUI.uiView);

        }

    }
}

module ui.update {
    export class UpdateViewUI extends View {
		public root:Laya.Image;
		public progressLoad:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":1136,"renderType":"render","height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1136,"var":"root","skin":"update/bg.png","sizeGrid":"1,1,1,1","height":640},"child":[{"type":"Script","props":{"layoutWidth":true,"layoutHeight":true,"runtime":"resolution.Resolution"}}]},{"type":"Image","props":{"y":222,"x":368,"skin":"update/logo.png"}},{"type":"ProgressBar","props":{"y":575,"x":112,"var":"progressLoad","skin":"update/progress.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("resolution.Resolution",resolution.Resolution);

            super.createChildren();
            this.createView(ui.update.UpdateViewUI.uiView);

        }

    }
}
