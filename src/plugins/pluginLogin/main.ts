module plugin{
    export class PluginLogin extends plugin.PluginBase {
        constructor(){
            super(new ui.plugins.pluginLogin.MainViewUI())
        }

        onShow():void{
            
        }
    }
}