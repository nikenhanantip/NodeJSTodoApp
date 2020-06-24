const TodoModel = require('../models/todo.model'); // Schema

/**
 * Retrieve all todo list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const findAll = async(req, res, next) => {
    try {
        // Retrieve todo from database
        const todoList = await TodoModel.find({}, { _id: 0 });

        // Send the response
        res.status(200).send(todoList);
    } catch (error) {
        next(error);
    }
}

/**
 * Create a new todo
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const create = async(req, res, next) => {
    try {
        // Generate object Todo from request body
        let objTodo = generateTodoObject(req);

        // Create new object Todo
        let todo = new TodoModel(objTodo);

        // Insert document to database
        await todo.save();

        // Load the document to see the added todo
        let result = await TodoModel.findOne({ id: todo.id }, { _id: 0 });

        // Send the response to user
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

/**
 * Middleware for find one todo that will be find one document with id as param
 *
 * @param {Request & {params: id}} req
 * @param {Response} res
 * @param {*} next
 * @returns Request.todo or 404 if no match found
 */
const getTodo = async(req, res, next) => {
    let todoId = req.params.id;
    let todo = null;

    try {
        todo = await TodoModel.findOne({ id: todoId }, { _id: 0 });
        if (!todo) {
            return res.status(404).json({
                error: `Can't find todo with id ${todoId}`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    req.todo = todo;
    next();
}

/**
 * Retrieve a single todo with 'id' as a param
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const findById = async(req, res, next) => {
    try {
        res.status(200).send(req.todo);
    } catch (error) {
        next(error);
    }
}

/**
 * Update a todo with 'id' as a param
 *
 * @param {Request & {todo: Todo}} req
 * @param {Response} res
 * @param {*} next
 */
const updateById = async(req, res, next) => {
    try {
        let todo = req.todo;

        // Generate Todo for update
        let objTodo = generateTodoObject(req);

        // Update the document using Document.updateOne()
        await TodoModel.updateOne({ id: todo.id }, objTodo);

        // Load the document to see the updated value
        let updatedDoc = await TodoModel.findOne({ id: todo.id }, { _id: 0 });

        // Send the response
        res.status(200).send(updatedDoc);
    } catch (error) {
        next(error);
    }
}

/**
 * Delete a todo with 'id' as a param
 *
 * @param {Request & {todo: Todo}} req
 * @param {Response} res
 * @param {*} next
 */
const deleteById = async(req, res, next) => {
    try {
        let todo = req.todo;

        // Delete a todo from database
        await TodoModel.deleteOne({ id: todo.id });

        // Load the document to see document have deleted
        let result = await TodoModel.find({}, { _id: 0 });

        // Send the response
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

const generateTodoObject = (req) => {
    let todoObj = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        done: req.body.done
    }
    
    return todoObj;
}

module.exports = {
    findAll,
    create,
    getTodo,
    findById,
    updateById,
    deleteById,
}