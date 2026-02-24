export interface IStateModel {
    stateID?:number;
    countryID?:number;
    stateName?:string;
}

export interface IStateModelData extends  IStateModel{
    countryName?:string;
}