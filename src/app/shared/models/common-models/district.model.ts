export interface IDistrictModel {
  districtID: number
  districtName?: string
  stateID?: number
}

export interface IDistrictModelData extends IDistrictModel{
  stateName?: string;
}