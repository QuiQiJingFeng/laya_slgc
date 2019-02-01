module plugin{
    export class PluginLogin extends plugin.PluginBase {
        constructor(){
            super(new view.plugins.pluginLogin.MainView())
        }

        onShow():void{
            
        }
    }
}