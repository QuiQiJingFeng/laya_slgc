module plugin{
    
    export class PluginManager{
        static __instance:PluginManager = undefined;
        private _curPlugin:plugin.PluginBase;
        private _pluginCache:{[key:string] : plugin.PluginBase} = {};
        private _pluginStack:Array<string>;
        constructor(){
            this._pluginStack = new Array<string>();
        }

        public static getInstance(){
            if(PluginManager.__instance == undefined){
                PluginManager.__instance = new PluginManager();
            }
            return PluginManager.__instance;
        }
        //压入一个插件
        public pushPlugin(pluginName,...args: any[]){
            let pluginClass = plugin.PluginConfig[pluginName]
            if(pluginClass == undefined){
                throw new Error("pluginName:not exist=>"+pluginName);
            }

            let aPlugin = undefined
            if(this._pluginCache.hasOwnProperty(pluginName)){
                aPlugin = this._pluginCache[pluginName]
            }
            let firstLoad = false;
            if (aPlugin == undefined){
                aPlugin = new pluginClass();
                aPlugin.setName(pluginName);
                this._pluginCache[pluginName] = aPlugin;
                firstLoad = true;
            }
            if(this._curPlugin){
                this._curPlugin.onStop();
            }
            this._curPlugin = aPlugin;
            this._pluginStack.push(pluginName);
            if (firstLoad){
                let resources = this._curPlugin.dependencyResources();
                console.log("加载资源...")
                console.log(resources)
                Laya.loader.load(resources,Laya.Handler.create(this, function(){
                    console.log("资源加载完毕")
                    let view = aPlugin.loadView();
                    aPlugin.setView(view);
                    aPlugin.onShow(...args);
                }),null,Laya.Loader.ATLAS,1,true);
            }else{
                aPlugin.onShow(...args);
            }
        }
 

        //弹出一个插件
        public popPlugin():void{
            let pluginName = this._pluginStack.pop();
            let aPlugin = this._pluginCache[pluginName];
            aPlugin.onHide();
        }

        //销毁某个插件
        public destroyPlugin(pluginName):void{
            let aPlugin = this._pluginCache[pluginName];
            aPlugin.onDestroy();
            this._pluginCache[pluginName] = undefined;
        }

        //销毁所有的插件
        public destroyAllPlugins():void{
            for (const key in this._pluginCache) {
                let aPlugin = this._pluginCache[key];
                aPlugin.onDestroy();
            }
            this._pluginCache = {};
        }

        //清空堆栈记录
        public clearStack():void{
            this._pluginStack = new Array<string>();
        }
    }
}