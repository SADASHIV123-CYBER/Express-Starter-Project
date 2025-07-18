const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    // 1. We should check if an image is coming to create the product, then we should first upload it on 
    // cloudinary

    const imagePath = productDetails.imagePath;

    if(imagePath) {

        try {
            const cloudinaryResponce = cloudinary.uploader.upload(imagePath);
            var productImage = (await cloudinaryResponce).secure_url;
            await fs.unlink(imagePath);
            
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
    }
    

    // 2. Then use the url from cloudinary and other product details to add product in db
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });
    return product
}

async function getProductById(productId) {
    const response = await productRepository.getProductById(productId);
    if(!response) {
        throw new NotFoundError('Product')
    }
    return response
}

async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId);
    if(!response) {
        throw new NotFoundError('product')
    }
    return response
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}