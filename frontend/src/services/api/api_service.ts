import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export class ApiService {
  public static async get(endpoint: string): Promise<any> {
    return instance.get(endpoint);
  }

  public static async post(endpoint: string, body: any = {}): Promise<any> {
    return instance.get(endpoint, body);
  }
}
