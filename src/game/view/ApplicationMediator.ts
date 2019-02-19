class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator{
    public static NAME = "ApplicationMediator";
    private rootView:laya.display.Stage;
    private testView:Laya.View;
    constructor(rootView:laya.display.Stage){
        super(ApplicationMediator.NAME);
        console.log("FYD===>>>",ApplicationMediator.NAME)
        this.rootView = rootView;
        rootView.bgColor = "#ABCDEF";

        this.initUI();
    }

    public getMediatorName():string{
        return ApplicationMediator.NAME;
    }

    public initUI():void{
        this.testView = new Laya.View();
        var sp = new Laya.Sprite();
		sp.loadImage("resource/common/z_hqyzm_2.png");
        this.testView.addChild(sp);
        this.rootView.addChild(this.testView);
    }

    public onRegister():void{
        AppFacade.getInstance().registerMediator(new testViewMediator(this.testView));
    }
}