import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export class ApiService {
  public static async delete(endpoint: string): Promise<void> {
    try {
      await instance.delete(endpoint);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async get(endpoint: string): Promise<any> {
    try {
      const response = await instance.get(endpoint);
      return Promise.resolve(response.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async post(endpoint: string, body: any = {}): Promise<any> {
    try {
      const response = await instance.post(endpoint, body);
      return Promise.resolve(response.data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
