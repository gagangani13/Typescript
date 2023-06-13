import { Router } from "express";
import { Todo } from "./models/todo";
const router=Router()
let todos:Todo[]=[]
// type ReqBody={text:string}
// type ReqId={id:string}
//Alternate
import { ReqBody } from "./models/todo";
import { ReqId } from "./models/todo";
router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})
router.post('/todo',(req,res,next)=>{
    const body=req.body as ReqBody
    const newTodo:Todo={
        id:Math.random().toString(),
        text:body.text
    }
    todos.push(newTodo)
    res.send(todos)
})
router.delete('/:id',(req,res,next)=>{
    const params=req.params as ReqId
    const newArr:Todo[]=todos.filter((item)=>{
        return item.id!==params.id
    })
    if (newArr.length===todos.length) {
        return res.status(404).send(newArr)

    }else{
        todos=newArr
        res.send(newArr)
    }
})
router.post('/edit/:id',(req,res,next)=>{
    const body=req.body as ReqBody
    const params=req.params as ReqId
    let flag:Boolean=false
    const newArr:Todo[]=todos.map((item)=>{
        if (item.id===params.id) {
            flag=true
            return {text:body.text,id:params.id}
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