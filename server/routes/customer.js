// server/routes/customer.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')
//Custom Routes

// Home
router.get('/', customerController.homepage );
//rota do formulario para adicionar 
router.get('/add', customerController.addCustomer)
//rota post pra abstrair do formulario as informações necessesarias
router.post('/add', customerController.postCustomer)
//rota para ver o usuario e suas informações
router.get('/view/:id', customerController.view)
//rota para edição 
router.get('/edit/:id', customerController.edit)
//rota para edição/delete                  editPost
router.put('/edit/:id', customerController.editPost)
// rota de exclucao
router.delete('/edit/:id', customerController.deleteCustomer)


module.exports = router;