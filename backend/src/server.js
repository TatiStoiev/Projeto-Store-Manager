const app = require('./app');
const connection = require('./db/connection')

const PORT = process.env.PORT || 3001;

const port = process.env.MYSQL_PORT;

app.listen(port, async () => {
  console.log(`API StoreManager sendo executada na porta ${port} `)
})

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
