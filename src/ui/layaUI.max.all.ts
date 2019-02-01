
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.pluginLogin {
    export class MainViewUI extends View {
		public clip:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"resource/common/bg.png","name":"BACK_GROUND"}},{"type":"Clip","props":{"y":238,"x":386,"var":"clip","skin":"resource/common/sprite-136-0.png","interval":10,"clipY":6,"clipX":7,"autoPlay":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.pluginLogin.MainViewUI.uiView);

        }

    }
}
