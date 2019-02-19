class BootstrapModels extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void{
        console.log("FYD==========>>.BootstrapModels")
        AppFacade.getInstance().registerProxy(new DataProxy());
    }
}