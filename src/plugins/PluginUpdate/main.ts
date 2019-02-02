module plugin{
    export class PluginUpdate extends plugin.PluginBase {
        constructor(){
            super()
        }

        loadView():Laya.View{
            return new view.plugins.PluginUpdate.MainView();
        }

        //插件被显示
        onShow(...args: any[]):void{
            this._mainView["onShow"]();
        }

        //依赖的资源
        public dependencyResources():[string]{
			return ["./res/atlas/resource/update.atlas"];
		}
    }
}