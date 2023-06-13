"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: Math.random().toString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.send(todos);
});
router.delete('/:Id', (req, res, next) => {
    const Id = String(req.params.Id);
    const newArr = todos.filter((item) => {
        return item.id !== Id;
    });
    if (newArr.length === todos.length) {
        return res.status(404).send(newArr);
    }
    else {
        todos = newArr;
        res.send(newArr);
    }
});
router.post('/edit/:Id', (req, res, next) => {
    const Id = String(req.params.Id);
    let flag = false;
    const newArr = todos.map((item) => {
        if (item.id === Id) {
            flag = true;
            return item.text = req.body.text;
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
