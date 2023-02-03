import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from '../controllers/todo.controller.js'

const router = Router()

router.get('/todos', getTodos)
router.post('/todos', createTodo)
router.patch('/todos/:id', updateTodo)
router.delete('/todos/:id', deleteTodo)

export default router
