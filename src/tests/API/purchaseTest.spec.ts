import { test, expect } from '../../fixtures/fixtures';
import fs from 'fs';



test.describe('Purchase Test', () => {

        test('should add item to cart and validate', async ({ manageApi }) => {
            // Fetch products and get the product ID since the API returns different product IDs each time
            const products = await manageApi.purchaseHelpers.getProducts();
            console.log('Products:', products);

            const productId = products.data[0].id;

            // Create a new cart
            const cartData = await manageApi.purchaseHelpers.createCart();
            const cartId = cartData.id;
            console.log('Created Cart ID:', cartId);

            const itemData = {
                productId: productId,
                quantity: 1,
            };

            const addItemResponse = await manageApi.purchaseHelpers.addItemToCart(cartId, itemData);
            console.log('Add Item Response:', addItemResponse);

            // Validate the cart details
            const cartDetails = await manageApi.purchaseHelpers.getCartDetails(cartId);
            console.log('Cart Details:', cartDetails);
            expect(cartDetails.cart_items.length).toBe(1);
            expect(cartDetails.cart_items[0].product_id).toBe(itemData.productId);
            expect(cartDetails.cart_items[0].quantity).toBe(itemData.quantity);
        });

});