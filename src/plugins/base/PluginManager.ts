module plugin{
    class PluginManager{
        private _curPlugin:any;
        private _pluginStack:Array<any>;
        constructor(){
            let self = this;
            self._pluginStack = new Array<any>();
            self._curPlugin = null;
        }

        pushPlugin(aClass,...args: any[]){
            
        }
    }
}