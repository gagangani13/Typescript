import { Router } from "express";
import { Todo } from "./models/todo";
const router=Router()
let todos:Todo[]=[]
router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})
router.post('/todo',(req,res,next)=>{
    const newTodo:Todo={
        id:Math.random().toString(),
        text:req.body.text
    }
    todos.push(newTodo)
    res.send(todos)
})
router.delete('/:Id',(req,res,next)=>{
    const Id=String(req.params.Id)
    const newArr:Todo[]=todos.filter((item)=>{
        return item.id!==Id
    })
    if (newArr.length===todos.length) {
        return res.status(404).send(newArr)

    }else{
        todos=newArr
        res.send(newArr)
    }
})
router.post('/edit/:Id',(req,res,next)=>{
    const Id=String(req.params.Id)
    let flag:Boolean=false
    const newArr:Todo[]=todos.map((item)=>{
        if (item.id===Id) {
            flag=true
            return {text:req.body.text,id:Id}
        }else{
            return item
        }
    })
    if (!flag) {
        return res.status(404).send(newArr)

    }else{
        todos=newArr
        res.send(newArr)
    }
})
export default router