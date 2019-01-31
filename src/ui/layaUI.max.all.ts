
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.pluginLogin {
    export class MainViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"common/icon_frame.png","sizeGrid":"14,17,20,14","name":"BACK_GROUND","height":640}},{"type":"Box","props":{"y":-3,"x":-3},"child":[{"type":"Button","props":{"y":298,"x":360,"skin":"common/btn_green.png","name":"CENTER"}},{"type":"Button","props":{"x":2,"skin":"common/btn_green.png","name":"TOP_LEFT"}},{"type":"Button","props":{"y":3,"x":728,"skin":"common/btn_green.png","name":"TOP_RIGHT"}},{"type":"Button","props":{"y":574,"x":726,"skin":"common/btn_green.png","name":"BOTTOM_RIGHT"}},{"type":"Button","props":{"y":574,"skin":"common/btn_green.png","name":"BOTTOM_LEFT"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.pluginLogin.MainViewUI.uiView);

        }

    }
}
