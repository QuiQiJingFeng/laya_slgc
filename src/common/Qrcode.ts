module util{
    export class Qrcode{
        public static createQrcode(message,codeWidth,codeHeight){
            let texture = new Laya.Sprite();
            let QRCodeAlg = Laya.Browser.window.QRCodeAlg;
            let qrcode = new QRCodeAlg("赵庆龙", 2)
            let datas = qrcode.getData()
            
            let unit = 10
            let pixels = datas[0].length * unit;
            texture.width = pixels;
            texture.height = pixels;
            for (let rowIdx =0;rowIdx < datas.length; rowIdx++) {
                let rows = datas[rowIdx];
                for(let colIdx = 0;colIdx < rows.length;colIdx++){
                    let x = colIdx * unit;
                    let y = rowIdx * unit;
                    if(datas[rowIdx][colIdx]){
                        texture.graphics.drawRect(x,y,unit,unit,"#000000")
                    }
                }
            }
            Laya.stage.addChild(texture)
            let htmlC = Laya.stage.drawToCanvas(texture.width,texture.height,0,0);  
    		 
			//获取截屏区域的texture
			let newTexture = new laya.resource.Texture(htmlC);  
 
			let targetSprite:Laya.Sprite = new Laya.Sprite();
            targetSprite.graphics.drawTexture(newTexture,0,0,codeWidth,codeHeight);
            Laya.stage.addChild(targetSprite);
			texture.removeSelf();
            return targetSprite;
        }
    }
}