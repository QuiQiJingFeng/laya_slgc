/**Created by the LayaAirIDE*/
module view.update{
	export class UpdateView extends ui.update.UpdateViewUI implements IUIManagerSupport{
		constructor(){
			super();
			
		}

		private onLoadRes():void{
			let resources = [
				{ url: "res/atlas/texture.atlas"},
			]
			Laya.loader.load(resources,Laya.Handler.create(this,this.onLoaded),Laya.Handler.create(this,this.onLoading,null,false));
		}

		onLoaded():void{
			// UIManager.getInstance().Hide(view.update.UpdateView)
			// UIManager.getInstance().Show(view.game.GameStartView);
			let texture = util.Qrcode.createQrcode("赵庆龙",300,300)
			Laya.stage.addChild(texture)
			 

		}

		onLoading(value:number):void{
			this.progressLoad.value = value;
		}

		OnShow?(...args: any[]):void{
			this.onLoadRes();
		}
	}
}