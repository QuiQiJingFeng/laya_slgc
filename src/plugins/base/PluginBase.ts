module plugin{
    export class PluginBase {
        private _pluginName:string;
        private _mainView:Laya.View;
        constructor(mainView:Laya.View){
            game.Resolution.getInstance().setResolutionNode(mainView);
            this._mainView = mainView;
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
        onShow(...args: any[]):void{
            
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