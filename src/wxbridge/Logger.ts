module wxbridge{
	export class Logger{
		public static debug(...args: any[]):void{
			console.debug("DEBUG",...args);
		}

		public static log(...args: any[]):void{
			console.log("LOG",...args);
		}

		public static info(...args: any[]):void{
			console.info("INFO",...args);
		}

		public static warn(...args: any[]):void{
			console.log("WARN",...args);
		}

		public static error(...args: any[]):void{
			console.log("ERROR",...args);
		}
		//在调试面板中创建一个新的分组。随后输出的内容都会被添加一个缩进，表示该内容属于当前分组。
		//调用 console.groupEnd之后分组结束。
		public static groupStart(mark:string):void{
			console.group(mark);
		}

		public static groupend():void{
			console.groupEnd();
		}
		//设置是否打开调试开关。此开关对正式版也能生效。
		public static setEnableDebug(enable:boolean):void{
			Laya.Browser.window.wx.setEnableDebug({
				enableDebug: enable,
				success:function(){Logger.info("setEnableDebug SUCCESS")},
				fail:function(){Logger.error("setEnableDebug FAILED")},
				complete:function(){Logger.debug("setEnableDebug completed")}
			})
		}
	}
}