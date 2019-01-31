module plugin{
    export class PluginLogin extends plugin.PluginBase {
        private _mainView:Laya.Node;
        constructor(){
            super()
            this._mainView = new ui.plugins.pluginLogin.MainViewUI();
 


            plugin.Resolution.getInstance().setResolutionNode(this._mainView)
            
        }

        onShow():void{
            
        }
    }
}