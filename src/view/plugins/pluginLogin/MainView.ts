/**Created by the LayaAirIDE*/
module view.plugins.pluginLogin{
	export class MainView extends ui.plugins.pluginLogin.MainViewUI{
		constructor(){
			super();
			let length = this.clip.total;
			console.log("length = ",this.clip.total);
			this.clip.sources[length-1] = this.clip.sources[length-2];
			this.clip.autoPlay = true;
		}
	}
}