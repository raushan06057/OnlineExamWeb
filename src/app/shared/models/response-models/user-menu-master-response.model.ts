export interface IUserMenuMasterResponseModel {
    rollNumber: number;
    moduleId: number;
    moduleName: string;
    menuName: string;
    menuCaption: string;
    menuLevel: string;
    menuLinkPage: string;
    menuParentId: number;
    menuParentName:string;
    status: number;
    isParent: string | null;
}