const {productsModel} = require('../models/index')

const findAll = async (req, res) => {
    const products = await productsModel.findAll();
    return res.status(200).json(products);
}

const findbyId = async (req, res) => {
    const productId = Number(req.params.id)
    const product = await productsModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found'})
    }
    return res.status(200).json(product)
}

module.exports = {
    findAll,
    findbyId,
}