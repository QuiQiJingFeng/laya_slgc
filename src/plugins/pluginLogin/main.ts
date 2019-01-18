module plugin{
    export class PluginLogin extends plugin.PluginBase {
        private _mainView:Laya.Node;
        constructor(){
            super()
            this._mainView = new ui.plugins.pluginLogin.MainViewUI();
            Laya.stage.addChild(this._mainView);
        }

        onShow():void{
            
        }
    }
}