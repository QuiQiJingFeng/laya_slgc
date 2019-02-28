module wxbridge{
	export class BannerAd{
		/*
			Banner 广告组件的尺寸会根据开发者设置的宽度，
			即 style.width 进行等比缩放，缩放的范围是 300 到 屏幕宽度。
			屏幕宽度是以逻辑像素为单位的宽度，通过 wx.getSystemInfoSync() 可以获取到。
			const {screenWidth} = wx.getSystemInfoSync()
		 */
		private static _bannerAd = null;
		public static createBannerAd(adUnitId:string,x:number,y:number,width:number){
			if(this._bannerAd != null){
				this._bannerAd.destroy();
				this._bannerAd = null;
			}
			this._bannerAd = Laya.Browser.window.wx.createBannerAd({
				adUnitId: 'xxxx',
				style: {
					left: x,
					top: y,
					width: width
				}
			});

			this._bannerAd.onError(err => {
				Logger.error("BannerAd=>",err);
			});
			let obj = this._bannerAd.show()
			obj.catch(err => {
				Logger.error("BannerAd=>",err);
			});

			this._bannerAd.onLoad(() => {
				console.log('banner 广告加载成功')
			})

			obj.then(() => {
					console.log('banner 广告显示')
			})

			this._bannerAd.onResize(res => {
				console.log(res.width, res.height)
				console.log(this._bannerAd.style.realWidth, this._bannerAd.style.realHeight)
			})
				
			}

		public static hideBanner():void{
			if(this._bannerAd != null){
				this._bannerAd.hide()
			}
		}
	}
}