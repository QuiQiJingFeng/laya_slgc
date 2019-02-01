
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.pluginLogin {
    export class MainViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"common/icon_frame.png","sizeGrid":"14,17,20,14","name":"BACK_GROUND","height":640}},{"type":"Box","props":{"y":-3,"x":-3},"child":[{"type":"Button","props":{"y":567,"x":0,"skin":"common/btn_green.png","layoutY":"BOTTOM","layoutX":"LEFT"}},{"type":"Button","props":{"y":308,"x":370,"skin":"common/btn_green.png"}},{"type":"Button","props":{"y":567,"x":720,"skin":"common/btn_green.png","layoutY":"BOTTOM","layoutX":"RIGHT"}},{"type":"Button","props":{"y":0,"x":720,"skin":"common/btn_green.png","layoutY":"TOP","layoutX":"RIGHT"}},{"type":"Button","props":{"y":0,"x":0,"skin":"common/btn_green.png","layoutY":"TOP","layoutX":"LEFT"}},{"type":"Button","props":{"y":308,"x":0,"skin":"common/btn_green.png","layoutX":"LEFT"}},{"type":"Button","props":{"y":308,"x":720,"skin":"common/btn_green.png","layoutX":"RIGHT"}},{"type":"Button","props":{"y":567,"x":370,"skin":"common/btn_green.png","layoutY":"BOTTOM"}},{"type":"Button","props":{"y":0,"x":370,"skin":"common/btn_green.png","layoutY":"TOP"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.pluginLogin.MainViewUI.uiView);

        }

    }
}
