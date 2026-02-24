export interface IBlockModel {
    blockID: number;
    districtID?: number | null;
    blockName?: string | null;
}

export interface IBlockModelData extends IBlockModel{
    stateID?: number | null;
    districtName?: string | null;
    stateName?: string | null;
}