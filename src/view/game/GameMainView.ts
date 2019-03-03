/**Created by the LayaAirIDE*/
module view.game{
	export class GameMainView extends ui.game.GameMainViewUI implements IUIManagerSupport{
		constructor(){
			super();
			this.initPhysicsWord()
 
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
			let realHeight = Laya.Browser.height;
			let realWidth = Laya.Browser.width;
			console.log("aaaaaaaa",realWidth)
			console.log("bbbbbb",realHeight)
			var ground = Bodies.rectangle(realWidth/2,realHeight/2,realWidth/2,realHeight/2, { isStatic: true });

			// add all of the bodies to the world
			World.add(engine.world, [ground]);

			let pos = {x:300,y:600}
			let radius = 30;

			let circle0 = Bodies.circle(pos.x,pos.y - radius,radius)
			let circle1 = Bodies.circle(pos.x - 2*radius,pos.y+radius,radius)
			let circle2 = Bodies.circle(pos.x + 2*radius,pos.y+radius,radius)
			var rotate1 = Constraint.create({
                bodyA: circle1,
                pointA: {x: 0, y: 0},
                bodyB: circle2,
                length: 0,//约束点的长度
                stiffness: 1//刚度值(0,1]，值越大，物体刚度越强，越不容易拉伸
            });

			var rotate2 = Constraint.create({
                bodyA: circle0,
                pointA: {x: 0, y: 0},
                bodyB: circle1,
                length: 0,//约束点的长度
                stiffness: 1//刚度值(0,1]，值越大，物体刚度越强，越不容易拉伸
            });

			var rotate3 = Constraint.create({
                bodyA: circle0,
                pointA: {x: 0, y: 0},
                bodyB: circle2,
                length: 0,//约束点的长度
                stiffness: 1//刚度值(0,1]，值越大，物体刚度越强，越不容易拉伸
            });


			World.add(engine.world, [rotate1,rotate2,rotate3,circle0,circle1,circle2]);

			Matter.Body.setVelocity(circle0,{x:30,y:0});

			Engine.run(engine);
			LayaRender.run(render);
		}

		OnShow():void{

		}
	}
}