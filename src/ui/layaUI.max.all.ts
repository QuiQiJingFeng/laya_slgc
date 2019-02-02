
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.PluginUpdate {
    export class MainViewUI extends View {
		public lodingTip:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"resource/update/bg.png","name":"BACK_GROUND"}},{"type":"Label","props":{"y":554,"x":480,"var":"lodingTip","text":"资源加载中","strokeColor":"#13e591","stroke":2,"fontSize":28,"color":"#f8f4f4","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.PluginUpdate.MainViewUI.uiView);

        }

    }
}
