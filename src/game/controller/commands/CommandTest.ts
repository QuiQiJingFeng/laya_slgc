class CommandTest extends puremvc.SimpleCommand{
    public execute(notification: puremvc.INotification): void{
        console.log("COMMAND TEST")
        /*var proxy:LevelProxy = facade.retrieveProxy(LevelProxy.NAME) as LevelProxy;
			proxy.selectLevel(int(notice.getBody())); */
        let proxy:DataProxy = AppFacade.getInstance().retrieveProxy(DataProxy.NAME) as DataProxy;

        
        proxy.setData(notification.getBody());
    }
}