module plugin{
    export class PluginLogin extends plugin.PluginBase {
        constructor(){
            super()
        }

        loadView():Laya.View{
            return new view.plugins.pluginLogin.MainView();
        }

        //插件被显示
        onShow(...args: any[]):void{
 
        }

        //依赖的资源
        public dependencyResources():[string]{
			return ["./res/atlas/resource/common.atlas"];
		}
    }
}