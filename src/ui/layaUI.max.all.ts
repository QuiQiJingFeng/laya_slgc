
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.pluginLogin {
    export class MainViewUI extends View {
		public lodingBar:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"resource/common/bg.png","name":"BACK_GROUND"}},{"type":"ProgressBar","props":{"y":551,"x":78,"width":820,"var":"lodingBar","skin":"resource/common/progress.png","sizeGrid":"5,10,11,10"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.pluginLogin.MainViewUI.uiView);

        }

    }
}
