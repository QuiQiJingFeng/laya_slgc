module plugin{
    
    export class PluginManager{
        static __instance:PluginManager = undefined;
        private _curPlugin:plugin.PluginBase;
        private _pluginCache:{};
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
            let aPlugin = this._pluginCache[pluginName]
            if (aPlugin == undefined){
                aPlugin = new pluginClass();
                aPlugin.setName(pluginName);
                this._pluginCache[pluginName] = aPlugin;
            }
            
            this._curPlugin = aPlugin;
            this._pluginStack.push(pluginName);
            
            
            aPlugin.onLoad();
            aPlugin.onStart();
            aPlugin.onShow(...args);
        }

        //弹出一个插件
        public popPlugin(){
            let pluginName = this._pluginStack.pop();
            let aPlugin = this._pluginCache[pluginName];
            aPlugin.onHide();
            aPlugin.onStop();
            let preName = this._pluginStack[this._pluginStack.length - 1];
            let prePlugin = this._pluginCache[pluginName];
            if (prePlugin != undefined){
                prePlugin.onStart();
            }
        }

        //销毁某个插件
        public destroyPlugin(pluginName){
            let aPlugin = this._pluginCache[pluginName];
            this._pluginStack

            aPlugin.onDestroy();
        }
    }
}