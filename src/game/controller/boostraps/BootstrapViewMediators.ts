class BootstrapViewMediators extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void{
        console.log("FYD==========>>BootstrapViewMediators")
        //游戏主舞台
        let appStage:laya.display.Stage = notification.getBody() as laya.display.Stage;
        AppFacade.getInstance().registerMediator(new ApplicationMediator(appStage));
    }
}