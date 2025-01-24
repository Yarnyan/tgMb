export enum MediaType {
    Video = 0,
    Call = 1
}

export interface ICall {
    id: number,
    name: string,
    date: string, 
    src: string,
    type: MediaType
}