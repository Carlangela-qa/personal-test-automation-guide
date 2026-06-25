export const endpoints = {
     qs: (obj?: Record<string, unknown>) => {
        if (!obj || Object.keys(obj).length === 0) return '';
        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(obj)) {
            if (v === undefined || v === null) continue;
            params.append(k, String(v));
        }
        return `?${params.toString()}`;
    },

    purchaseE2e: {
        carts: () => 
            `carts`,
        cartItems: (cartId: string) =>
            `carts/${cartId}`,
        products: () =>
            `products`,
    },

}