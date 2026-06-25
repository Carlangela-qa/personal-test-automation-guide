// BaseApi provides reusable API validation helpers for extending classes.
import { APIRequestContext, APIResponse, expect, request } from "@playwright/test";
import { getValidToken } from '../../../utils/auth';

export abstract class BaseApi {
    constructor(protected readonly token: string) { }

    protected baseApiGetApiMessage<T>(data: { payload: T[]; message?: string[] },) {
        console.log({
            message: data.message ?? ['No API message provided'],
        });
    }

    async baseApiCreateApiContext(
        link: string,
        method: 'get' | 'post' | 'put' | 'delete',
        options?: {
            data?: any;
            headers?: Record<string, string>;
            multipart?: Record<string, any>;
        }
    ): Promise<APIResponse> {
        const isMultipart = !!options?.multipart;

        // Base headers (no Brand_id in new project)
        const baseHeaders: Record<string, string> = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
        };

        if (!isMultipart) {
            baseHeaders['Content-Type'] = 'application/json';
        }

        const headers = {
            ...baseHeaders,
            ...(options?.headers || {}),
        };

        const api = await request.newContext({
            baseURL: process.env.API_BASE_URL,
            extraHTTPHeaders: headers,
        });

        let response: APIResponse;

        if (method === 'get') {
            response = await api.get(link);
        } else if (method === 'delete') {
            response = await api.delete(link);
        } else {
            if (isMultipart) {
                response = await api[method](link, { multipart: options!.multipart });
            } else if (options?.data) {
                response = await api[method](link, { data: options.data });
            } else {
                response = await api[method](link);
            }
        }

        if (!response.ok()) {
            console.warn(`API request returned status: ${response.status()} ${response.statusText()}`);
        } else {
            console.log(`API request successful: ${response.status()} ${response.statusText()}`);
        }

        return response;
    }
}