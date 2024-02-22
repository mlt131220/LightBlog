import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {message} from 'antd';

//默认请求超时时间
const timeout = 30000;

//创建axios实例
const service = axios.create({
    timeout,
    baseURL: import.meta.env.VITE_GLOB_API_URL,
    //如需要携带cookie 该值需设为true
    //withCredentials: true
});

//统一请求拦截 可配置自定义headers 例如 language、token等
service.interceptors.request.use(
    (config: any) => {
        //配置自定义请求头
        let customHeaders: { language: string; } = {
            language: 'zh-cn',
        };
        config.headers = customHeaders;
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);


//核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params: object = {},
    config: AxiosRequestConfig = {}
): Promise<T> => {
    let response: Promise<axiosTypes<responseTypes<T>>>;
    switch (method) {
        case 'get':
            response = service.get(url, {params: {...params}, ...config});
            break;
        case 'post':
            response = service.post(url, {...params}, {...config});
            break;
        case 'put':
            response = service.put(url, {...params}, {...config});
            break;
        case 'delete':
            response = service.delete(url, {params: {...params}, ...config});
            break;
    }

    return new Promise<T>((resolve, reject) => {
        response
            .then(res => {
                /* Todo 业务代码 可根据需求自行处理 */
                const data = res.data;
                if (data.code !== 200) {
                    let e = JSON.stringify(data);
                    message.warn(`请求错误：${e}`);
                    //数据请求错误 使用reject将错误返回
                    reject(data);
                } else {
                    //数据请求正确 使用resolve将结果返回
                    resolve(data.result);
                }
            })
            .catch(error => {
                let e = JSON.stringify(error);
                message.warn(`网络错误：${e}`);
                reject(error);
            });
    });
};

// 使用 request 统一调用，包括封装的get、post、put、delete等方法
const request = {
    get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
        requestHandler<T>('get', url, params, config),
    post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
        requestHandler<T>('post', url, params, config),
    put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
        requestHandler<T>('put', url, params, config),
    delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
        requestHandler<T>('delete', url, params, config),
};

// 导出至外层，方便统一使用
export {request};
