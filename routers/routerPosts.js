//invoco express per poter utilizzare i metodi HTTP
const express = require('express');

//creo router che contiene la funzione router di express
const router = express.Router();

//creo controller che contiene la logica dei metodi HTTP
const controller = require('../controllers/controllerPosts');

//con router indico il percorso associato ai metodi HTTP:
//percorso index
router.get('/', controller.index);

//percorso show
router.get('/:id', controller.show);

//percorso store
router.post('/', controller.store);

//percorso update
router.put('/:id', controller.update);

//percorso modify
router.patch('/:id', controller.modify);

//percorso destroy
router.delete('/:id', controller.destroy);

module.exports = router;