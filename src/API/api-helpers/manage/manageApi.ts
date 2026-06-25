
import { APIRequestContext, Page } from '@playwright/test';
import { purchaseHelpers } from '../purchaseApi';
    
export default class ManageApi {
    private _purchase?: purchaseHelpers;
    constructor(private readonly request: APIRequestContext, private readonly token: string) {}

    get purchaseHelpers(): purchaseHelpers {
        return this._purchase ??= new purchaseHelpers(this.request, this.token);
    }
}
