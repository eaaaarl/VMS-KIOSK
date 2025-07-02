export interface IService {
  id: number;
  type: number;
  name: string;
  strType: string;
}

export interface IServiceResponse {
  results: IService[];
}
