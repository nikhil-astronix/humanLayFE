declare module 'axios' {
  export interface AxiosRequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
  }
  
  export interface AxiosError {
    config: AxiosRequestConfig;
    code?: string;
    response?: {
      status: number;
      data: any;
    };
  }

  export interface AxiosStatic {
    create(config?: AxiosRequestConfig): any;
    isAxiosError(payload: any): payload is AxiosError;
  }
} 