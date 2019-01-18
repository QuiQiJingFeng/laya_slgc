
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.plugins.pluginLogin {
    export class MainViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":960,"height":640},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"common/Img_bd12.png","sizeGrid":"12,12,11,13","height":640},"child":[{"type":"Button","props":{"y":295,"x":357,"skin":"common/btn_number.png"}},{"type":"Button","props":{"y":-3,"x":-1,"skin":"common/btn_number.png"}},{"type":"Button","props":{"y":0,"x":725,"skin":"common/btn_number.png"}},{"type":"Button","props":{"y":571,"x":723,"skin":"common/btn_number.png"}},{"type":"Button","props":{"y":571,"x":-3,"skin":"common/btn_number.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.plugins.pluginLogin.MainViewUI.uiView);

        }

    }
}
