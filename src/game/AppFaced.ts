class AppFacade extends puremvc.Facade {
    constructor() {
        super("game.AppFaced");
    }
    public static readonly STARTUP: string = "startup";
    public static readonly MOUSE_CLICK: string = "MOUSE_CLICK";
    public static instance: AppFacade;

    public static getInstance(): AppFacade {
        if (AppFacade.instance == null) AppFacade.instance = new AppFacade();
        return <AppFacade>(AppFacade.instance);
    }

    public initializeController(): void {
        super.initializeController();
        this.registerCommand(AppFacade.STARTUP,StartupCommand);
    }

    /**
     * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
     * @param   rootView    -   PureMVC应用程序的根视图root，包含其它所有的View Componet
     */
    public startUp(rootView: any): void {
        this.sendNotification(AppFacade.STARTUP, rootView);
        this.removeCommand(AppFacade.STARTUP); //PureMVC初始化完成，注销STARUP命令
    }
}