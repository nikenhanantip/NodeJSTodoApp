const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.route('/')
    .get(todoController.findAll)
    .post(todoController.create);

router.param('id', todoController.getTodo)
router.route('/:id')
    .get(todoController.findById)
    .put(todoController.updateById)
    .delete(todoController.deleteById);

module.exports = router;