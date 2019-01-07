module plugin{
    
    export class PluginManager{
        static __instance:PluginManager = undefined;
        private _curPlugin:any;
        private _pluginStack:Array<any>;
        constructor(){
            let self = this;
            self._pluginStack = new Array<plugin.PluginBase>();
            self._curPlugin = null;
        }

        public static getInstance(){
            if(PluginManager.__instance == undefined){
                PluginManager.__instance = new PluginManager();
            }
            return PluginManager.__instance;
        }

        public setBottomPlugin(pluginName,...args:any[]){
            let length = this._pluginStack.length;
            this._pluginStack.splice(0, length);
            this.pushPlugin(pluginName);
        }

        public pushPlugin(pluginName){
            let pluginClass = plugin.PluginConfig[pluginName]
            if(pluginClass == undefined){
                throw new Error("pluginName:not exist=>"+pluginName);
            }
            let lastPlugin = this._pluginStack[this._pluginStack.length-1];
            if(lastPlugin !== undefined){
                lastPlugin.onHide();
            }

            let aPlugin = new pluginClass();
            this._pluginStack.push(aPlugin);
            aPlugin.onLoad();
            aPlugin.onShow();
        }

        public popPlugin(){
            let aPlugin = this._pluginStack.pop();
            aPlugin.onDestroy();
            let lastPlugin = this._pluginStack[this._pluginStack.length-1];
            lastPlugin.onShow();
        }
    }
}