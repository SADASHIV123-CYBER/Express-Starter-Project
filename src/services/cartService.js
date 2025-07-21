const { getCartByUserId, createCart } = require("../repositories/cartRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");
const { getProductById } = require("./productService");

async function getCart(userId) {
    let cart = await getCartByUserId(userId);
    if (!cart) {
        cart = await createCart(userId);
    }
    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true) {
    const quantityValue = shouldAdd ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);

    if (!product) {
        throw new NotFoundError("Product not found");
    }

    if (!product.inStock || product.quantity <= 0) {
        throw new BadRequestError(["Product not available in stock"]);
    }

    let foundProduct = false;

    cart.items.forEach((item) => {
        if (item.product.equals(productId)) {
            foundProduct = true;

            if (shouldAdd) {
                if (product.quantity >= item.quantity + 1) {
                    item.quantity += quantityValue;
                } else {
                    throw new AppError("The quantity of the item requested is not available", 400);
                }
            } else {
                if (item.quantity > 0) {
                    item.quantity += quantityValue;
                    if (item.quantity === 0) {
                        cart.items = cart.items.filter(item => !item.product.equals(productId));
                        return;
                    }
                } else {
                    throw new AppError("The quantity of the item requested is not available", 400);
                }
            }
        }
    });

    if (!foundProduct && shouldAdd) {
        cart.items.push({ product: productId, quantity: 1 });
    }

    if (!foundProduct && !shouldAdd) {
        throw new NotFoundError("Product not found in the cart to remove");
    }

    await cart.save();


    const updatedCart = await getCartByUserId(userId);
    return updatedCart;
}

module.exports = {
    getCart,
    modifyCart,
};
