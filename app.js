const express = require('express');
const app = express();
const port = 3000;

const routerPosts = require('./routers/routerPosts.js');
const errorsHandler = require('./middlewares/errorsHandler.js');
const notFound = require('./middlewares/notFound.js');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server del mio blog');
})

app.use('/posts', routerPosts);

app.use(errorsHandler);

app.use(notFound);

app.listen((port), () => {
  console.log(`Server in ascolto sulla porta ${port}`);
})