module plugin{
    export class PluginLogin extends plugin.PluginBase {
        constructor(){
            super()
        }

        onLoad():void{
            
        }

        onShow():void{
            Laya.stage.bgColor = "#d11d1a"
            console.log("FYD======")
            
        }
    }
}