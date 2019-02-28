module wxbridge{
	export class RewardVideoAd{
		public static _video = null;
		//激励视频广告组件默认是隐藏的，因此可以提前创建，以提前初始化组件。
		public static initRewardedVideoAd(adUnitId:string){
			this._video = Laya.Browser.window.wx.createRewardedVideoAd({adUnitId: adUnitId})

			/*
				小于 2.1.0 的基础库版本，关闭按钮 是在激励式视频播放结束后才出现，
				所以触发 onClose 时已经播放结束，onClose 触发时可以认为用户已经看完了广告。

				大于等于 2.1.0 的基础库版本，关闭按钮 将会常驻 
				开发者需要根据 res.isEnded 判断是否视频是否播放结束、可以向用户下发奖励
			 */
			this._video.onClose(res => {
				if(wxbridge.VersionUtil.greaterVersion("2.1.0")){
					// 用户点击了【关闭广告】按钮
					// 小于 2.1.0 的基础库版本，res 是一个 undefined
					if (res && res.isEnded || res === undefined) {
						// 正常播放结束，可以下发游戏奖励
					} else {
						// 播放中途退出，不下发游戏奖励
					}
				}else{
					//直接发放奖励
				}
				
			})

		}
		//只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。
		//开发者不可控制激励视频广告组件的隐藏
		public static show():void{
			let obj = this._video.show()
			obj.then(() => console.log('激励视频 广告显示'))
			obj.catch(err =>{
				console.log(err)
				//如果组件的某次自动拉取失败，那么之后调用的 show() 将会被 reject。
				//此时可以调用 RewardedVideoAd.load() 手动重新拉取广告。
				this._video.load()
				.then(() => this._video.show())	
			})

		}
	}
}