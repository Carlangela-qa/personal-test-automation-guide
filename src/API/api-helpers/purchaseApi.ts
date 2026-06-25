import { APIRequestContext, expect } from "@playwright/test";
import { endpoints } from "../api-helpers/manage/endpoints";
import { BaseApi } from "./manage/baseApi";
import { CartSchema, CartResponse } from "../schema-validators/getCartItemDetails";
import * as path from "path";
import fs from "fs";
import { z } from "zod";

export class purchaseHelpers extends BaseApi {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext, token: string) {
        super(token);
        this.request = request;
    }

    async getResponse(
        link: string,
        method: 'get' | 'post' | 'put' | 'delete',
        options?: { data?: any; headers?: Record<string, string> }
    ) {
        const response = await this.baseApiCreateApiContext(link, method, options);
        const data = await response.json();
        return data;
    }

    async getProducts() {
        const url = endpoints.purchaseE2e.products();
        const data = await this.getResponse(url, "get");
        return data;
    }

    async createCart() {
        const url = endpoints.purchaseE2e.carts();
        const data = await this.getResponse(url, "post", { data: {} });
        return data;
    }

    async addItemToCart(cartId: string, itemData: { productId: string; quantity: number }) {
        const url = endpoints.purchaseE2e.cartItems(cartId); // should be /carts/{cartId}
        const payload = {
            "product_id": itemData.productId,
            "quantity": itemData.quantity,
        };
        console.log('Payload:', payload);

        return this.getResponse(url, "post", { data: payload });
    }


    async getCartDetails(cartId: string): Promise<CartResponse> {
        const url = endpoints.purchaseE2e.cartItems(cartId);
        const data = await this.getResponse(url, "get");

        const result = CartSchema.safeParse(data);
        if (!result.success) {
            throw new Error(`Cart validation failed: ${result.error}`);
        }

        return result.data;
    }

}
