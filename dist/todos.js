"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: Math.random().toString(),
        text: body.text
    };
    todos.push(newTodo);
    res.send(todos);
});
router.delete('/:id', (req, res, next) => {
    const params = req.params;
    const newArr = todos.filter((item) => {
        return item.id !== params.id;
    });
    if (newArr.length === todos.length) {
        return res.status(404).send(newArr);
    }
    else {
        todos = newArr;
        res.send(newArr);
    }
});
router.post('/edit/:id', (req, res, next) => {
    const body = req.body;
    const params = req.params;
    let flag = false;
    const newArr = todos.map((item) => {
        if (item.id === params.id) {
            flag = true;
            return { text: body.text, id: params.id };
        }
        else {
            return item;
        }
    });
    if (!flag) {
        return res.status(404).send(newArr);
    }
    else {
        todos = newArr;
        res.send(newArr);
    }
});
exports.default = router;
