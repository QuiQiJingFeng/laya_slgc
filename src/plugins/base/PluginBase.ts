module plugin{
    export class PluginBase {
        private _pluginName:string;
        constructor(){
            
        }

        setName(pluginName):void{
            this._pluginName = pluginName;
        }

        getName():string{
            return this._pluginName;
        }

        onLoad():void{
            
        }
        //插件被销毁
        onDestroy():void{

        }

        //插件被显示
        onShow(...args: any[]):void{
            
        }
        //插件被隐藏
        onHide():void{
            
        }
        //插件停止 当前插件不是活跃插件了
        onStop():void{

        }
        //当前插件重新处于活跃状态
        onStart():void{

        }
    }
}