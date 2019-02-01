module plugin{
    export class PluginBase {
        private _pluginName:string;
        private _mainView:Laya.View;
        constructor(){
        }
        //必须实现这个方法
        loadView?(): Laya.View;

        dependencyResources?():[string];

        getView():Laya.View{
            return this._mainView;
        }

        setView(mainView:Laya.View){
            this._mainView = mainView;
            game.Resolution.getInstance().setResolutionNode(mainView);
        }

        setName(pluginName):void{
            this._pluginName = pluginName;
        }

        getName():string{
            return this._pluginName;
        }
        //插件被销毁
        onDestroy():void{
            this._mainView.destroy(true);
        }

        //插件被显示
        onShow():void{
            
        }
        //插件被隐藏
        onHide():void{
            
        }
        //插件停止 当前插件不是活跃插件了
        onStop():void{
            this._mainView.visible = false;
        }
        //插件被激活
        onActive():void{
            this._mainView.visible = true;
        }
    }
}