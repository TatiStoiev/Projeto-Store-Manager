const express = require('express');
const { ProductsRouter, SalesRouter } = require('./routes/index');

const app = express();
app.use(express.json());
app.use(express.text());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(ProductsRouter);
app.use(SalesRouter);

module.exports = app;
