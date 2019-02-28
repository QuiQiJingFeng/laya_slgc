module wxbridge {
	export class VersionUtil {
		private static compareVersion(v1, v2) {
			v1 = v1.split('.')
			v2 = v2.split('.')
			const len = Math.max(v1.length, v2.length)

			while (v1.length < len) {
				v1.push('0')
			}
			while (v2.length < len) {
				v2.push('0')
			}

			for (let i = 0; i < len; i++) {
				const num1 = parseInt(v1[i])
				const num2 = parseInt(v2[i])

				if (num1 > num2) {
					return 1
				} else if (num1 < num2) {
					return -1
				}
			}

			return 0
		}
		//tarVersion 2.3.0
		public static greaterVersion(tarVersion:string):boolean{
			let version = Laya.Browser.window.wx.getSystemInfoSync().SDKVersion;
			if( this.compareVersion(version,tarVersion) < 0 ){
				Laya.Browser.window.wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
				return false;
			}
			return true;
		}



	}
}