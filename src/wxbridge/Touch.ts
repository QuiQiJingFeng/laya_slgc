module wxbridge{
	export class Touch{
		//监听开始触摸事件
		public static onTouchStart(callBack):void{
			/*
				touches	Array.<Touch>	当前所有触摸点的列表
				changedTouches	Array.<Touch>	触发此次事件的触摸点列表
				timeStamp	number	事件触发时的时间戳
			 */
			// Laya.Browser.window.wx.onTouchStart(function(touches:Array<Touch>,changedTouches:Array<Touch>,timeStamp:number){
			// 	callBack(touches,changedTouches,timeStamp)
			// })

			Laya.Browser.window.wx.onTouchStart(callBack)
		}
		//监听触点移动事件
		/*
			touches	Array.<Touch>	当前所有触摸点的列表
			changedTouches	Array.<Touch>	触发此次事件的触摸点列表
			timeStamp	number	事件触发时的时间戳
		 */
		public static onTouchMove(callBack):void{
			// Laya.Browser.window.wx.onTouchMove(function(touches:Array<Touch>,changedTouches:Array<Touch>,timeStamp:number){
			// 	callBack(touches,changedTouches,timeStamp)
			// })
			Laya.Browser.window.wx.onTouchMove(callBack)
		}

		//监听触摸结束事件
		/*
			touches	Array.<Touch>	当前所有触摸点的列表
			changedTouches	Array.<Touch>	触发此次事件的触摸点列表
			timeStamp	number	事件触发时的时间戳
		 */
		public static onTouchEnd(callBack):void{
			// Laya.Browser.window.wx.onTouchEnd(function(touches:Array<Touch>,changedTouches:Array<Touch>,timeStamp:number){
			// 	callBack(touches,changedTouches,timeStamp)
			// })
			Laya.Browser.window.wx.onTouchEnd(callBack)
		}

		//监听触点失效事件
		/*
			touches	Array.<Touch>	当前所有触摸点的列表
			changedTouches	Array.<Touch>	触发此次事件的触摸点列表
			timeStamp	number	事件触发时的时间戳
		 */
		public static onTouchCancel(callBack):void{
			// Laya.Browser.window.wx.onTouchCancel(function(touches:Array<Touch>,changedTouches:Array<Touch>,timeStamp:number){
			// 	callBack(touches,changedTouches,timeStamp)
			// })
			Laya.Browser.window.wx.onTouchCancel(callBack)
		}

		public static offTouchStart(callBack):void{
			Laya.Browser.window.wx.offTouchStart(callBack)
		}

		public static offTouchMove(callBack):void{
			Laya.Browser.window.wx.offTouchMove(callBack)
		}

		public static offTouchEnd(callBack):void{
			Laya.Browser.window.wx.offTouchEnd(callBack)
		}

		public static offTouchCancel(callBack):void{
			Laya.Browser.window.wx.offTouchCancel(callBack)
		}

		/*
			Touch
			在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。

			属性
			number identifier
			Touch 对象的唯一标识符，只读属性。一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程。

			number screenX
			触点相对于屏幕左边沿的 X 坐标。

			number screenY
			触点相对于屏幕上边沿的 Y 坐标。
		 */

	}
}