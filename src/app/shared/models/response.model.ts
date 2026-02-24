export interface IResponseModel {
    id:number;
    success: boolean;
    message: string;
    roleName:string;
    organizationId:any;
}

export interface IResponseData extends IResponseModel{
    data: any;
}

export interface IResponseDataArray extends IResponseModel{
    data:any[];
}

export interface ILoginResponseModel extends IResponseData{
    isFirstTime:boolean;
}