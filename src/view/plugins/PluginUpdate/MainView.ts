/**Created by the LayaAirIDE*/
module view.plugins.PluginUpdate{
	export class MainView extends ui.plugins.PluginUpdate.MainViewUI{
		constructor(){
			super();
		}

		onShow(){
			let resources = ["./res/atlas/resource/common.atlas"]
			//将一些公共的资源加载一下
			Laya.loader.load(resources,Laya.Handler.create(this, this.onLoded),null,Laya.Loader.ATLAS,1,true);
		}

		onLoded(){
			Laya.Tween.to(this.lodingTip,{y:200},3000,Laya.Ease.elasticOut,null,1000)
		}
	}
}