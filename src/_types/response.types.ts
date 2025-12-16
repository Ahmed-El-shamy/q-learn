export interface Response<T=object> {
    data: T;
    errors: unknown | null;
    message: string;
    status: boolean;
}