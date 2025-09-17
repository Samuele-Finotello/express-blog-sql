//creo posts che contiene tutti i post dell'array dentro posts.js
const connection = require('../data/db.js');

//creo la funzione index che contiene la lista di tutti i post
const index = (req, res) => {
  const sql = 'SELECT * FROM posts';

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore: ' + err });
    res.json(results);
  })
}

//creo la funzione show che contiene tutti i dettagli del post preso in oggetto
const show = (req, res) => {
  const id = req['params']['id'];

  const postId = posts.find((item) => item['id'] === parseInt(id))

  if (postId != undefined) {
    res.json(postId);
  }
  else {
    res.status(404);
    res.json({ error: 'Not Found', message: 'Post non trovato' });
  }
}

//creo la funzione store per creare un nuovo post
const store = (req, res) => {
  const newPostId = posts[posts.length - 1]['id'] + 1;

  const newPost = {
    id: newPostId,
    title: req['body']['title'],
    content: req['body']['content'],
    image: req['body']['image'],
    tags: req['body']['tags']
  }

  posts.push(newPost);

  res.status(201).json(newPost);
  console.log(posts)
}

//creo la funzione update per aggiornare completamente un post
const update = (req, res) => {
  const update = req['params']['id'];

  const postUpdate = posts.find((item) => item['id'] === parseInt(update))

  //bonus
  if (postUpdate != undefined) {
    if (!req['body']['title'] || !req['body']['content'] || !req['body']['image'] || !req['body']['tags']) {
      res.status(400).json({ error: "1 o più campi non compilati", message: "Compilare tutti i campi" })
    }
    else {
      postUpdate['title'] = req['body']['title'];
      postUpdate['content'] = req['body']['content'];
      postUpdate['image'] = req['body']['image'];
      postUpdate['tags'] = req['body']['tags'];
    }
  }
  else {
    res.status(404).json({ error: "Not Found", message: "Post non trovato" });
  }
  res.json(postUpdate);
  console.log(posts);
}

//creo la funzione modify per aggiornare solo una parte del post
const modify = (req, res) => {
  const modified = req['params']['id'];

  const postModified = posts.find((item) => item['id'] === parseInt(modified))

  if (postModified != undefined) {
    if (req['body']['title']) {
      postModified['title'] = req['body']['title'];
    }
    if (req['body']['content']) {
      postModified['content'] = req['body']['content'];
    }
    if (req['body']['image']) {
      postModified['image'] = req['body']['image'];
    }
    if (req['body']['tags']) {
      postModified['tags'] = req['body']['tags'];
    }
  }
  else {
    res.status(404).json({ error: "Not Found", message: "Post non trovato" });
  }
  res.json(postModified);
  console.log(posts);
}

//creo la funzione destroy per eliminare un post
const destroy = (req, res) => {
  const eliminato = req['params']['id'];

  const postEliminato = posts.find((item) => item['id'] === parseInt(eliminato))

  posts.splice(posts.indexOf(postEliminato), 1);

  if (postEliminato != undefined) {
    res.status(204);
    res.json('');
    console.log('Lista aggiornata:');
    console.log(posts);
  }
  else {
    res.status(404);
    res.json({ error: 'Not Found', message: 'Post non trovato' });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}