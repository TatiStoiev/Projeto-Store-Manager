const connection = require('../db/connection')

const findAll = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;    
}

module.exports = {
    findAll,
}