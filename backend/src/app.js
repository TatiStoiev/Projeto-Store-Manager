const express = require('express');
const {ProductsRouter} = require('./routes/index')

const app = express();

app.use(ProductsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
