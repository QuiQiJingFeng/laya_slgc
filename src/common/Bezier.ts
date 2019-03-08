module util {
    export class Bezier{
        public static Convert(posArray:Array<{x:number,y:number}>,num:number):Array<{x:number,y:number}>{
            let size = posArray.length;
            if (size < 2) return;

            let xarray = {}
            let yarray = {}
            let startIdx = 1
            
            let bezierPositions = new Array<{x:number,y:number}>();
            if(num == null || num == undefined){
                num = 100;//默认取曲线上的100个样本点
            }
            

            for(let t = 0; t <= 1; t += 1/num) {
                //当i = 2 的时候就已经把三阶bezier曲线计算出来了,所以N阶的话i最大为size-1
                for(let i = startIdx; i <= size-1;i++){
                    //因为计算公式中有j+1,,所以j的最大取值为size-1
                    for( let j = startIdx; j <= size - i; j++){
                            if(i == startIdx){ //i==startIdx+1时,第一次迭代,由已知控制点计算
                                xarray[j] = posArray[j].x * (1 - t) + posArray[j + 1].x * t;
                                yarray[j] = posArray[j].y * (1 - t) + posArray[j + 1].y * t;
                                continue;
                            }
                            // i != 2时,通过上一次迭代的结果计算
                            xarray[j] = xarray[j] * (1 - t) + xarray[j + 1] * t;
                            yarray[j] = yarray[j] * (1 - t) + yarray[j + 1] * t;
                    }
                }
                //经过多轮合并之后最后叠加的结果被放在第一个元素中
                //这么多轮的合并只是为了计算出一个再bezier曲线上的点...
                bezierPositions.push({x:xarray[1],y:yarray[1]})
            }
            return bezierPositions;
        }

        public static BezierTo(source:{x:number,y:number},target:{x:number,y:number},num:number):Array<{x:number,y:number}>{
            
            let controlNum = Math.random() * 5 + 3
            let dx = target.x - source.x
            let dy = target.y - source.y
            let array = new Array<{x:number,y:number}>();
            array.push(source)
            for(let i = 1; i<= controlNum;i++){
                let zf;
                Math.random() > 0.5 && (zf = 1) || (zf = -1);
                let x = source.x + dx/controlNum * i
                let y = source.y + dy/controlNum * i + zf * Math.random() * 100 + 50
                let pos = {x:x,y:y}
                array.push(pos);
            }
            array.push(target);
        
            let bezierPositions = Bezier.Convert(array,num);
            Bezier.Filter(bezierPositions)
            return bezierPositions
        }
        // 将所有的坐标改成整数的,并剔除重复的坐标
        public static Filter(bezierPositions:Array<any>):Array<{x:number,y:number}>{
            let filters = {}
            bezierPositions.forEach(pos => {
                pos.x = Math.floor(pos.x)
                pos.y = Math.floor(pos.y)
                
                if(filters[`${pos.x}${pos.y}`]){
                    pos.remove = true
                }
                else{
                    filters[`${pos.x}${pos.y}`] = true
                }
            });
 
        
            for(let i = bezierPositions.length;i >= 1;i--){
                let pos = bezierPositions[i]
                if(pos.remove){
                    bezierPositions.splice(i, 1);
                }
            }
            return bezierPositions
        }
    }
}