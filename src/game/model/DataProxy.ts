class DataProxy extends puremvc.Proxy implements puremvc.IProxy{
    public static NAME = "DataProxy";
    constructor(){
        super(DataProxy.NAME);
    }

    getProxyName():string{
        return DataProxy.NAME;
    }
    setData( data:any ):void{
        console.log("接收到数据:=>",data);
    }
    getData():any{

    }
    onRegister( ):void{

    }
    onRemove( ):void{

    }
    
}