class testViewMediator extends puremvc.Mediator implements puremvc.IMediator{
    public static NAME = "testViewMediator";
    constructor(view:Laya.View){
        super(testViewMediator.NAME);

        let sp:Laya.Sprite = view.getChildAt(0) as Laya.Sprite;
        //注册各种事件监听
        sp.on(Laya.Event.MOUSE_DOWN,this,this.mouseHandler)
    }

    private mouseHandler(e: Event): void {
            switch (e.type) {
                case Laya.Event.MOUSE_DOWN:
                    console.log("\n————————\n左键按下");
                    AppFacade.getInstance().sendNotification(AppEvent.COMMAND_TEST, {username:"zhaoqinglong"})
                    break;
            }
        }


}