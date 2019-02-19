class BootstrapCommands extends puremvc.SimpleCommand {
    public execute(notification: puremvc.INotification): void{
        console.log("FYD==========>>.BootstrapCommands")
        AppFacade.getInstance().registerCommand(AppEvent.COMMAND_TEST,CommandTest)
    }
}