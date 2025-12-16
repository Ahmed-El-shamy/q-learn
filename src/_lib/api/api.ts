import { Response } from "@/_types/response.types";


// Request interceptor type: receives and returns request config
type RequestConfig = Parameters<typeof fetch>["1"] & { url?: string };
// Response interceptor type: receives and returns response
type ResponseData<T> = Response<T> | null;

class Interceptor<T> {
    interceptors: ((value: T) => T | Promise<T>)[];

    constructor() {
        this.interceptors = [];
    }

    use(callback: (value: T) => T | Promise<T>) {
        this.interceptors.push(callback);
    }

    async run(value: T): Promise<T> {
        let result: T = value;
        // Run interceptors sequentially (like axios)
        for (const interceptor of this.interceptors) {
            result = await interceptor(result);
        }
        return result;
    }
}

export class Api {
    baseRoute: string;
    requestInterceptor: Interceptor<RequestConfig>;
    responseInterceptor: Interceptor<ResponseData<any>>;

    constructor() {
        this.baseRoute = "https://q-learn.dev.qutell.net/api";
        this.requestInterceptor = new Interceptor<RequestConfig>();
        this.responseInterceptor = new Interceptor<ResponseData<any>>();
    }

    static routes = {
        site: {
            sliders: "/site/sliders"
        },
        auth: {
            login: "/login"
        }
    }

    async request<T>(route: string, options?: Parameters<typeof fetch>["1"]): Promise<ResponseData<T> | undefined> {
        try {
            const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
            const url = this.baseRoute.concat(normalizedRoute);
            
            // Build initial request config
            let requestConfig: RequestConfig = {
                ...options,
                url
            };

            // Run request interceptors
            requestConfig = await this.requestInterceptor.run(requestConfig);

            // Extract url from config (interceptors might have modified it)
            const { url: finalUrl, ...fetchOptions } = requestConfig;
            const finalFetchUrl = finalUrl || url;

            // Make the actual request
            const response = await fetch(finalFetchUrl, fetchOptions);

            // Parse response
            let responseData: ResponseData<T>;
            if (response.ok) {
                const jsonData = await response.json() as Response<T>;
                responseData = jsonData;
            } else {
                // Handle error responses
                let errorData: Response<T>;
                try {
                    errorData = await response.json() as Response<T>;
                } catch {
                    // If response is not JSON, create a default error response
                    errorData = {
                        data: {} as T,
                        errors: { message: response.statusText },
                        message: `Request failed with status ${response.status}`,
                        status: false
                    };
                }
                responseData = errorData;
            }

            // Run response interceptors
            responseData = await this.responseInterceptor.run(responseData);

            // If response was not ok, throw or return based on your error handling strategy
            if (!response.ok && responseData && !responseData.status) {
                return responseData;
            }

            return responseData;
        } catch (error) {
            // Handle network errors or interceptor errors
            const errorResponse: ResponseData<T> = {
                data: {} as T,
                errors: error,
                message: error instanceof Error ? error.message : 'Network error occurred',
                status: false
            };
            
            // Run response interceptors even for errors
            return await this.responseInterceptor.run(errorResponse);
        }
    }

    async get<T>(route: string, options?: Parameters<typeof fetch>["1"]) {
        return this.request<T>(route, {...options, method: "GET"})
    }

    async post<T>(route: string, body: object = {}, options?: Parameters<typeof fetch>["1"]) {
        const headers = new Headers(options?.headers);

        if(headers.get("Content-Type") === "application/json") {
            return this.request<T>(route, {
                ...options, 
                method: "POST", 
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    ...(options?.headers || {})
                }
            });
        } else {
            const formData = new FormData();
            Object.keys(body).forEach(key => {
                formData.append(key, body[key as keyof typeof body]);
            });

            return this.request<T>(route, {
                ...options,
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...(options?.headers || {})
                }
            })
        }
    }
}

const api = new Api();

export default api;