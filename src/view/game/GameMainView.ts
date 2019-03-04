/**Created by the LayaAirIDE*/
module view.game{
	export class GameMainView extends ui.game.GameMainViewUI implements IUIManagerSupport{
		constructor(){
			super();


			this.initPhysicsWord()
 
		}

		createGround(){
			let Matter = Laya.Browser.window.Matter;
			let LayaRender = Laya.Browser.window.LayaRender;
			let Engine = Matter.Engine,
				World = Matter.World,
				Bodies = Matter.Bodies,
				Constraint = Matter.Constraint;	
			let border = 20;
			let realHeight = resolution.ResolutionConfig.realHeight;
			let realWidth = resolution.ResolutionConfig.realWidth;
			let bottomGround = {x:realWidth/2,y:realHeight-border/2,width:realWidth,height:border};
			let topGround = {x:realWidth/2,y:border/2,width:realWidth,height:border};
			let leftGround = {x:border/2,y:realHeight/2,width:border,height:realHeight};
			let rightGround = {x:realWidth-border/2,y:realHeight/2,width:border,height:realHeight};
			var ground1 = Bodies.rectangle(bottomGround.x,bottomGround.y,bottomGround.width,bottomGround.height, { isStatic: true });
			var ground2 = Bodies.rectangle(topGround.x,topGround.y,topGround.width,topGround.height, { isStatic: true });
			var ground3 = Bodies.rectangle(leftGround.x,leftGround.y,leftGround.width,leftGround.height, { isStatic: true });
			var ground4 = Bodies.rectangle(rightGround.x,rightGround.y,rightGround.width,rightGround.height, { isStatic: true });
			return [ground1,ground2,ground3,ground4]
		}

		initPhysicsWord():void{
			let Matter = Laya.Browser.window.Matter;
			let LayaRender = Laya.Browser.window.LayaRender;
			let Engine = Matter.Engine,
				World = Matter.World,
				Bodies = Matter.Bodies,
				Constraint = Matter.Constraint;
			var engine = Engine.create();
			//render(渲染器)将要渲染的物理引擎是之前所创建的engine，而渲染的对象是html网页的body
			var render = LayaRender.create({
				element: document.body,
				engine: engine,
				options: {
                    wireframes: true,//是否显示边线框(显示边线方便调试)
					showAxes: true, // 刚体轴线
                }
			});
			// add all of the bodies to the world
			World.add(engine.world, this.createGround());

			let pos = {x:100,y:300}
			let radius = 30;

			let circle0 = Bodies.circle(pos.x,pos.y - radius,radius)
			World.add(engine.world, [circle0]);

			// Matter.Body.setVelocity(circle0,{x:30,y:0});

			Engine.run(engine);
			LayaRender.run(render);
		}

		OnShow():void{

		}
	}
}