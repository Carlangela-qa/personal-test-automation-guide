export const endpoints = {

    purchaseE2e: {
        carts: () => 
            `carts`,
        cartItems: (cartId: string) =>
            `carts/${cartId}`,
        products: () =>
            `products`,
    },

}